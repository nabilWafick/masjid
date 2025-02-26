import { useState, useCallback, useEffect } from "react";
import UsersService from "@/services/users.service";
import Users from "@/models/user.model";
import { UserFormData } from "@/validations/userFormSchema";
import { toast } from "@/hooks/useToast";

export function useUserManagement(locale: string) {
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
  }, [locale, usersService]);

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
      if (data.id) {
        await usersService.update(
          data.id,
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
      }
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
