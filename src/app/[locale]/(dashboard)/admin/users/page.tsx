"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import PageCounter from "@/components/ui/page-counter";
import { useState } from "react";
import { useUserManagement } from "@/hooks/useUserManagement";
import { UsersTable } from "@/components/admin/Tables/UsersTable";
import { UserForm } from "@/components/admin/Forms/UserForm";

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

      <UsersTable users={users} onEdit={handleEdit} onDelete={handleDelete} />

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
