"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Plus, Search, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useUserManagement } from "@/hooks/useUserManagement";
import { UsersTable } from "@/components/admin/Tables/UsersTable";
import { UserForm } from "@/components/admin/Forms/UserForm";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteConfirmationDialog } from "@/components/admin/Dialogs/DeleteConfirmationDialog";

const AdminUserPage = () => {
  const params = useParams<{ locale: string }>();
  const locale = params.locale;

  const {
    users,
    total,
    loading,
    currentPage,
    pageSize,
    search,
    dialogOpen,
    selectedUser,
    deleteDialogOpen,
    deleteConfig,
    handleAdd,
    handleUpdate,
    handleDeleteIntent,
    handleEdit,
    handleOpenChange,
    handlePageChange,
    handleSearchChange,
    handlePageSizeChange,
    handleConfirmDelete,
    handleDeleteDialogOpenChange,
  } = useUserManagement(locale);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="container mx-auto px-4 py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-2xl font-bold">User Management</CardTitle>
          <Button onClick={() => handleOpenChange(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New User
          </Button>
        </CardHeader>

        <CardContent>
          {/* Search and Filter Section */}
          <div className="mb-4 flex items-center space-x-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 pr-10"
              />
              {search && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={() => handleSearchChange("")}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
              )}
            </div>

            <Select
              value={pageSize.toString()}
              onValueChange={(value) => handlePageSizeChange(Number(value))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Page Size" />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size} items per page
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* Users Table */}
              <UsersTable
                users={users}
                onEdit={handleEdit}
                onDelete={(id) => {
                  const user = users.find((user) => user.id === id);
                  return handleDeleteIntent(id, {
                    title: "Delete User",
                    description: `Are you sure you want to delete ${
                      user ? `${user.firstnames} ${user.name}` : "that user"
                    } ? \n This action cannot be undone.`,
                    confirmText: "Delete User",
                    cancelText: "Cancel",
                  });
                }}
              />

              {/* Pagination */}
              <div className="flex justify-between items-center mt-4 ">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        aria-disabled={currentPage === 1}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>

                    {[...Array(totalPages)].map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          onClick={() => handlePageChange(index + 1)}
                          isActive={currentPage === index + 1}
                          className={"cursor-pointer"}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        aria-disabled={currentPage === totalPages}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>

                <div className=" whitespace-nowrap text-sm ">
                  Total Users : {total}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* User Form Dialog */}
      <UserForm
        locale={locale}
        open={dialogOpen}
        onOpenChange={handleOpenChange}
        initialData={selectedUser}
        onSubmit={selectedUser ? handleUpdate : handleAdd}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={handleDeleteDialogOpenChange}
        onConfirm={handleConfirmDelete}
        title={deleteConfig.title}
        description={deleteConfig.description}
        confirmText={deleteConfig.confirmText}
        cancelText={deleteConfig.cancelText}
      />
    </div>
  );
};

export default AdminUserPage;
