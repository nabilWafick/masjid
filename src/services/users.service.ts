import apiService from "@/lib/api";

import PaginatedUsers, {
  PaginatedUsersJson,
} from "@/models/paginated_users.model";
import Users, { UsersJson } from "@/models/user.model";
import { cookies } from "next/headers";

class UsersService {
  baseUrl: string;

  private constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Static async method to create an instance
  static init(locale: string): UsersService {
    const baseUrl = `/${locale}/api/users/`;
    return new UsersService(baseUrl);
  }

  async add(user: Users): Promise<Users | undefined> {
    try {
      const response = await apiService.post<UsersJson>(
        this.baseUrl,
        user.toJson()
      );

      return Users.fromJson(response);
    } catch (error) {
      console.error("Error while adding user", error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Users | undefined> {
    try {
      const response = await apiService.get<UsersJson>(`${this.baseUrl}/${id}`);
      return Users.fromJson(response);
    } catch (error) {
      console.error("Error while updating user", error);
      throw error;
    }
  }

  async findMany(
    search?: string,
    page?: number,
    pageSize?: number
  ): Promise<PaginatedUsers | undefined> {
    try {
      const response = await apiService.get<PaginatedUsersJson>(
        `${this.baseUrl}?search=${search ?? ""}&page=${page ?? ""}&pageSize=${
          pageSize ?? ""
        }`
      );
      console.log("Response", response);
      return PaginatedUsers.fromJson(response);
    } catch (error) {
      console.error("Error while updating user", error);
      throw error;
    }
  }

  async update(id: string, user: Users): Promise<Users | undefined> {
    try {
      const response = await apiService.patch<UsersJson>(
        `${this.baseUrl}/${id}`,
        user.toJson()
      );
      return Users.fromJson(response);
    } catch (error) {
      console.error("Error while updating user", error);
      throw error;
    }
  }

  async remove(id: string): Promise<Users | undefined> {
    try {
      const response = await apiService.delete<UsersJson>(
        `${this.baseUrl}/${id}`
      );
      return Users.fromJson(response);
    } catch (error) {
      console.error("Error while removing user", error);
      throw error;
    }
  }
}

export default UsersService;
