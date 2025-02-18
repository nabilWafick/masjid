"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";

const userFormSchema = z.object({
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

type UserFormData = z.infer<typeof userFormSchema>;

export const useUserForm = (initialData?: UserFormData) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      id: initialData?.id,
      name: initialData?.name || "",
      firstnames: initialData?.firstnames || "",
      email: initialData?.email || "",
      isAdmin: initialData?.isAdmin || false,
      phoneNumber: initialData?.phoneNumber || "",
      password: initialData?.password ?? undefined,
    },
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      console.log("Form submitted:", data);

      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    register: form.register,
    setValue: form.setValue,
    watch: form.watch,
  };
};

type UserFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: UserFormData;
  onSubmit: (data: UserFormData) => Promise<void>;
  onSuccess?: () => void;
};

export function UserForm({
  open,
  onOpenChange,
  initialData,
}: // onSubmit,
//  onSuccess,
UserFormProps) {
  const { form, onSubmit, errors, isSubmitting, register, setValue } =
    useUserForm();

  const isUpdateMode = Boolean(initialData);

  useEffect(() => {
    if (!open && !initialData) {
      form.reset();
    }
  }, [open, initialData, form.reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-muted z-99999 max-h-[700px] overflow-scroll">
        <form onSubmit={onSubmit}>
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
            <div className="space-y-4">
              <div>
                <Label htmlFor="firstnames">Firstnames</Label>
                <Input id="firstName" {...register("firstnames")} />
                {errors.firstnames && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>
                      {errors.firstnames.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>{errors.name.message}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>{errors.email.message}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div>
                <Label htmlFor="phoneNumber">Phone</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>
                      {errors.phoneNumber.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>
                      {errors.password.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
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
}

// Custom hook for managing users
function useUserManagement() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserFormData | undefined>();
  const [users, setUsers] = useState<Array<UserFormData & { id: string }>>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
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

  useEffect(() => {
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
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button onClick={() => handleOpenChange(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </div>

      <div className=" rounded-lg">
        <table className="w-full">
          <thead className="bg-muted">
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
