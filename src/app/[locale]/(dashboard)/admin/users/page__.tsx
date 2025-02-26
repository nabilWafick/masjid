"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Checkbox } from "@/components/ui/checkbox";
import { validateUserId } from "@/lib/utils";
import UsersService from "@/services/users.service";
import Users, { UsersJson } from "@/models/user.model";
import { toast, useToast } from "@/hooks/useToast";
import { useParams } from "next/navigation";

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
      "Invalid Benin phone number. Must be 8 digits with optional +229|00229 prefix",
  }),
  password: z.string().optional(),
});

type UserFormData = z.infer<typeof userFormSchema>;

export const useUserForm = (
  locale: string,
  initialData?: UserFormData,
  onClose?: () => void
) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      id: initialData?.id,
      name: initialData?.name ?? "",
      firstnames: initialData?.firstnames ?? "",
      email: initialData?.email ?? "",
      isAdmin: initialData?.isAdmin ?? false,
      phoneNumber: initialData?.phoneNumber ?? "",
      password: initialData?.password ?? undefined,
    },
  });

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        form.setValue(
          key as keyof UserFormData,
          initialData[key as keyof UserFormData]
        );
      });
    }
  }, [initialData, form.setValue]);

  const { toast } = useToast();

  const onSubmit = async (data: UserFormData) => {
    try {
      console.log("Form submitted:", data);

      const user = new Users(
        data.name,
        data.firstnames,
        data.email,
        data.phoneNumber,
        data.isAdmin,
        new Date(),
        new Date(),
        data.password,
        data.id
      );
      const usersService = UsersService.init(locale);

      if (user.id) {
        await usersService.update(user.id, user);

        toast({
          title: "Success",
          description: "User updated successfully",
        });
      } else {
        await usersService.add(user);

        toast({
          title: "Success",
          description: "User added successfully",
        });
      }

      // form.reset();

      if (onClose) onClose();
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
  locale: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: UserFormData;
  onSubmit: (data: UserFormData) => Promise<void>;
  onSuccess?: () => void;
};

export function UserForm({
  locale,
  open,
  onOpenChange,
  initialData,
}: // onSubmit,
//  onSuccess,
UserFormProps) {
  const { form, onSubmit, errors, isSubmitting, register, setValue } =
    useUserForm(locale, initialData, () => onOpenChange(false));

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
              <div className="flex justify-start items-center space-x-4">
                <Checkbox
                  id="isAdmin"
                  checked={form.watch("isAdmin")}
                  onCheckedChange={(checked) =>
                    setValue("isAdmin", checked === true)
                  }
                  {...register("isAdmin")}
                />

                <Label htmlFor="isAdmin">Admin</Label>
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

function useUserManagement(locale: string) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Users | undefined>();
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);
  const usersService = UsersService.init(locale);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const paginatedUsers = await usersService.findMany();
      setUsers(paginatedUsers != null ? paginatedUsers.items : []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAdd = async (data: UserFormData | Users) => {
    try {
      await usersService.add(
        new Users(
          data.name,
          data.firstnames,
          data.email,
          data.phoneNumber,
          data.isAdmin,
          new Date(),
          new Date(),
          data.password,
          data.id
        )
      );
      toast({ title: "Success", description: "User created successfully" });
      fetchUsers();
    } catch (error) {
      toast({ title: "Error", description: "Failed to create the user" });
    }
  };

  const handleUpdate = async (data: UserFormData | Users) => {
    try {
      await usersService.add(
        new Users(
          data.name,
          data.firstnames,
          data.email,
          data.phoneNumber,
          data.isAdmin,
          new Date(),
          new Date(),
          data.password,
          data.id
        )
      );
      toast({ title: "Success", description: "User updated successfully" });
      fetchUsers();
    } catch (error) {
      toast({ title: "Error", description: "Failed to update the user" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await usersService.remove(id);
      toast({ title: "Success", description: "User deleted successfully" });
      fetchUsers();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete the user" });
    }
  };

  const handleEdit = (user: Users) => {
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
  const params = useParams<{ locale: string }>();
  const locale = params.locale;
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
  } = useUserManagement(locale);

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
        <h1 className="text-2xl font-bold">Users</h1>
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
                <td className="px-4 py-2 flex justify-center w-full text-center">
                  {user.isAdmin ? (
                    <Check className="text-green-500" />
                  ) : (
                    <X className="text-red-500" />
                  )}
                </td>
                <td className="px-4 py-2">{user.phoneNumber}</td>

                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary/50 hover:bg-primary/10 text-primary"
                      onClick={() => handleEdit(user)}
                    >
                      <Pencil className="w-4 h-4 mr-2 text-primary" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 border-red-200 hover:bg-red-50"
                      onClick={() => handleDelete(user.id!)}
                    >
                      <Trash2 className="w-4 h-4 mr-2 text-red-500" />
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
        locale={locale}
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
