import { useState, useCallback, useEffect, useMemo } from "react";
import UsersService from "@/services/users.service";
import Users from "@/models/user.model";
import PaginatedUsers from "@/models/paginated_users.model";
import { UserFormData } from "@/validations/userFormSchema";
import { toast } from "@/hooks/useToast";
import { debounce } from "lodash";

export function useUserManagement(locale: string) {
  // Pagination and data state
  const [paginatedData, setPaginatedData] = useState<PaginatedUsers | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);

  // User management state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Users | undefined>();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteConfig, setDeleteConfig] = useState<{
    id: string | null;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
  }>({
    id: null,
  });

  // Initialize users service
  const usersService = useMemo(() => UsersService.init(locale), [locale]);

  // Debounced fetch users function to prevent multiple rapid calls
  const fetchUsers = useCallback(
    debounce(async (searchQuery: string, page: number, size: number) => {
      setLoading(true);
      try {
        const data = await usersService.findMany(searchQuery, page, size);
        setPaginatedData(data || null);
      } catch (error) {
        console.error("Failed to load users:", error);
        toast({
          title: "Error",
          description: "Failed to load users",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }, 300), // 300ms debounce delay
    [usersService]
  );

  // Trigger fetch when relevant parameters change
  useEffect(() => {
    fetchUsers(search, currentPage, pageSize);
  }, [search, currentPage, pageSize, fetchUsers]);

  // User management operations
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
      // Reset to first page after adding
      setCurrentPage(1);
      fetchUsers(search, currentPage, pageSize);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create the user",
        variant: "destructive",
      });
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
        fetchUsers(search, currentPage, pageSize);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update the user",
        variant: "destructive",
      });
    }
  };

  const handleDeleteIntent = (
    id: string,
    customConfig?: {
      title?: string;
      description?: string;
      confirmText?: string;
      cancelText?: string;
    }
  ) => {
    setDeleteConfig({
      id,

      ...customConfig,
    });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfig.id) return;

    try {
      await usersService.remove(deleteConfig.id);
      toast({
        title: "Success",
        description: "User deleted successfully",
      });

      // Reset delete state
      setDeleteConfig({ id: null });
      setDeleteDialogOpen(false);

      // Adjust page if needed after deletion
      fetchUsers(search, currentPage, pageSize);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the user",
        variant: "destructive",
      });
    }
  };

  const handleDeleteDialogOpenChange = (open: boolean) => {
    setDeleteDialogOpen(open);
    if (!open) {
      setDeleteConfig({ id: null });
    }
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (query: string) => {
    setSearch(query);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  // User form handlers
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
    // Pagination data
    users: paginatedData?.items || [],
    total: paginatedData?.total || 0,
    currentPage,
    pageSize,
    search,
    loading,

    // User management state
    dialogOpen,
    selectedUser,
    deleteDialogOpen,
    deleteConfig,

    // Handlers
    handleAdd,
    handleUpdate,
    handleDeleteIntent,
    handleConfirmDelete,
    handleEdit,
    handleDeleteDialogOpenChange,
    handleOpenChange,
    handlePageChange,
    handleSearchChange,
    handlePageSizeChange,

    // Refresh method
    refreshUsers: fetchUsers,
  };
}
