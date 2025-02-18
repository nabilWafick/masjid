"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Pencil, Plus, Trash2, X } from "lucide-react";
import { z } from "zod";

const userSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(3, { message: "Name must contain at least 3 characters " }),
  firstnames: z
    .string()
    .min(3, { message: "Firstnames must contain at least 3 characters " }),
  email: z.string().email({ message: "Invalid email format" }),
  isAdmin: z.boolean(),
  phoneNumber: z.string().regex(/^(?:\+22901|0022901)?[0-9]{8}$/, {
    message:
      "Invalid Benin phone number. Must be 8 digits with optional +229 prefix",
  }),
  password: z.string().optional(),
});

type UserFormData = z.infer<typeof userSchema>;

// Custom hook for form handling
function useUserForm(
  initialData?: UserFormData,
  onSubmit?: (data: UserFormData) => Promise<void>
) {
  const [formData, setFormData] = React.useState<UserFormData>({
    name: initialData?.name || "",
    firstnames: initialData?.firstnames || "",
    email: initialData?.email || "",
    isAdmin: initialData?.isAdmin || false,
    phoneNumber: initialData?.phoneNumber || "",
    password: initialData?.password ?? undefined,
  });
  const [errors, setErrors] = React.useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validateForm = () => {
    try {
      userSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string[]> = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          if (!newErrors[path]) {
            newErrors[path] = [];
          }
          newErrors[path].push(err.message);
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleChange = (field: keyof UserFormData, value: string | boolean) => {
    setFormData((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });

    // Clear related errors
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: [],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !onSubmit) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      if (!initialData) {
        setFormData({
          name: "",
          firstnames: "",
          email: "",
          phoneNumber: "",
          isAdmin: false,
          password: undefined,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm: () => {
      setFormData({
        name: "",
        firstnames: "",
        email: "",
        phoneNumber: "",
        isAdmin: false,
        password: undefined,
      });
      setErrors({});
    },
  };
}

type UserFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: UserFormData;
  onSubmit: (data: UserFormData) => Promise<void>;
  onSuccess?: () => void;
};

const UserForm = ({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  onSuccess,
}: UserFormProps) => {
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit: submit,
    resetForm,
  } = useUserForm(initialData, async (data) => {
    await onSubmit(data);
    onOpenChange(false);
    onSuccess?.();
  });

  const isUpdateMode = Boolean(initialData);

  // Reset form when dialog closes
  React.useEffect(() => {
    if (!open && !initialData) {
      resetForm();
    }
  }, [open, initialData, resetForm]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={submit}>
          <DialogHeader>
            <DialogTitle>
              {isUpdateMode ? "Edit User" : "Add New User"}
            </DialogTitle>
            <DialogDescription>
              {isUpdateMode
                ? "Edit the user information below."
                : "Fill in the information to add a new user."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Namr</label>
              <input
                type="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
              />
              {errors.name?.map((error, index) => (
                <span key={index} className="text-sm text-red-500">
                  {error}
                </span>
              ))}
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
              />
              {errors.email?.map((error, index) => (
                <span key={index} className="text-sm text-red-500">
                  {error}
                </span>
              ))}
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Phone</label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                placeholder="+1234567890"
              />
              {errors.phone?.map((error, index) => (
                <span key={index} className="text-sm text-red-500">
                  {error}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="active"
                checked={formData.isAdmin}
                onChange={(e) => handleChange("isAdmin", e.target.checked)}
                className="h-4 w-4"
              />
              <label htmlFor="active" className="text-sm font-medium">
                Admin
              </label>
              {errors.active?.map((error, index) => (
                <span key={index} className="text-sm text-red-500">
                  {error}
                </span>
              ))}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? isUpdateMode
                  ? "Saving..."
                  : "Creating..."
                : isUpdateMode
                ? "Save Changes"
                : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Custom hook for managing users
function useUserManagement() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<
    UserFormData | undefined
  >();
  const [users, setUsers] = React.useState<
    Array<UserFormData & { id: string }>
  >([]);
  const [loading, setLoading] = React.useState(true);

  const fetchUsers = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAdd = async (data: UserFormData) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create user");
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  const handleUpdate = async (data: UserFormData) => {
    try {
      const response = await fetch(`/api/users/${selectedUser?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update user");
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete user");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (user: UserFormData & { id: string }) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedUser(undefined);
    }
  };

  return {
    dialogOpen,
    selectedUser,
    users,
    loading,
    handleAdd,
    handleUpdate,
    handleDelete,
    handleEdit,
    handleOpenChange,
  };
}

const AdminUserPage = () => {
  const {
    dialogOpen,
    selectedUser,
    users,
    loading,
    handleAdd,
    handleUpdate,
    handleDelete,
    handleEdit,
    handleOpenChange,
  } = useUserManagement();

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button onClick={() => handleOpenChange(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </div>

      <div className="border rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Firstnames</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-center">Admin</th>
              <th className="px-4 py-2 text-left">Phone Number</th>

              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.firstnames}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 text-center">
                  {user.isAdmin ? (
                    <Check className="text-green-500" />
                  ) : (
                    <X className="txt-red-500" />
                  )}
                </td>
                <td className="px-4 py-2">{user.phoneNumber}</td>

                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(user)}
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 border-red-200 hover:bg-red-50"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserForm
        open={dialogOpen}
        onOpenChange={handleOpenChange}
        initialData={selectedUser}
        onSubmit={selectedUser ? handleUpdate : handleAdd}
        onSuccess={() => {
          console.log("Operation successful");
        }}
      />
    </div>
  );
};

export default AdminUserPage;
