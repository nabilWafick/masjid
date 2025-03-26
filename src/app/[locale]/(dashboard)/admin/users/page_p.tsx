"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import PageCounter from "@/components/ui/page-counter";
import { useState } from "react";
import { usePaginatedUsers } from "@/hooks/usePaginatedUsers";
import UsersService from "@/services/users.service";
import Users from "@/models/user.model";
import { toast } from "@/hooks/useToast";
import { UserFormData } from "@/validations/userFormSchema";
import { UsersTable } from "@/components/admin/Tables/UsersTable";
import { UserForm } from "@/components/admin/Forms/UserForm";

const AdminUserPage = () => {
  const params = useParams<{ locale: string }>();
  const locale = params.locale;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(undefined);

  const {
    paginatedData,
    loading,
    currentPage,
    pageSize,
    search,
    handlePageChange,
    handleSearchChange,
    handlePageSizeChange,
    refreshData,
  } = usePaginatedUsers(locale);

  const usersService = UsersService.init(locale);

  const handleAdd = async (data: UserFormData) => {
    try {
      const user = new Users(
        data.name,
        data.firstnames,
        data.email,
        data.phoneNumber,
        data.isAdmin,
        new Date(),
        new Date(),
        data.password
      );

      await usersService.add(user);
      toast({ title: "Success", description: "User created successfully" });
      refreshData();
      setDialogOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to create user" });
    }
  };

  const handleUpdate = async (data: UserFormData) => {
    try {
      if (data.id) {
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

        await usersService.update(data.id, user);
        toast({ title: "Success", description: "User updated successfully" });
        refreshData();
        setDialogOpen(false);
        setSelectedUser(undefined);
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update user" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await usersService.remove(id);
      toast({ title: "Success", description: "User deleted successfully" });
      refreshData();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete user" });
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

  if (loading && !paginatedData) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4  bg-primary">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button onClick={() => handleOpenChange(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <select
          className="p-2 border rounded"
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
        >
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </select>
      </div>

      <UsersTable
        users={paginatedData?.items || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PageCounter
        paginatedData={paginatedData}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />

      <UserForm
        locale={locale}
        open={dialogOpen}
        onOpenChange={handleOpenChange}
        initialData={selectedUser}
        onSubmit={selectedUser ? handleUpdate : handleAdd}
      />
    </div>
  );
};

export default AdminUserPage;
