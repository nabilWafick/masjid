import { useState, useCallback, useEffect } from "react";
import UsersService from "@/services/users.service";
import Users from "@/models/user.model";
import PaginatedUsers from "@/models/paginated_users.model";

export function usePaginatedUsers(locale: string) {
  const [paginatedData, setPaginatedData] = useState<PaginatedUsers | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);

  const usersService = UsersService.init(locale);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await usersService.findMany(search, currentPage, pageSize);
      setPaginatedData(data || null);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setLoading(false);
    }
  }, [locale, currentPage, search, pageSize, usersService]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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

  return {
    paginatedData,
    loading,
    currentPage,
    pageSize,
    search,
    handlePageChange,
    handleSearchChange,
    handlePageSizeChange,
    refreshData: fetchUsers,
  };
}
