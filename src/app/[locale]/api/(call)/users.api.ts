import apiService from "@/lib/api";
import { baseUrl } from "@/lib/utils";
import PaginatedUsers, {
  PaginatedUsersJson,
} from "@/models/paginated_users.model";
import Users, { UsersJson } from "@/models/user.model";

class UsersAPI {
  static async add(user: Users): Promise<Users | undefined> {
    try {
      const response = await apiService.post<UsersJson>(baseUrl, user.toJson());

      return Users.fromJson(response);
    } catch (error) {
      console.error("Error while adding user", error);
      throw error;
    }
  }

  static async findOne(id: string): Promise<Users | undefined> {
    try {
      const response = await apiService.get<UsersJson>(`${baseUrl}/${id}`);
      return Users.fromJson(response);
    } catch (error) {
      console.error("Error while updating user", error);
      throw error;
    }
  }

  static async findMany(
    searchField: string,
    page: number,
    pageSize: number
  ): Promise<PaginatedUsers | undefined> {
    try {
      const response = await apiService.get<PaginatedUsersJson>(`${baseUrl}`);
      return PaginatedUsers.fromJson(response);
    } catch (error) {
      console.error("Error while updating user", error);
      throw error;
    }
  }

  static async update(id: string, user: Users): Promise<Users | undefined> {
    try {
      const response = await apiService.patch<UsersJson>(
        `${baseUrl}/${id}`,
        user.toJson()
      );
      return Users.fromJson(response);
    } catch (error) {
      console.error("Error while updating user", error);
      throw error;
    }
  }

  static async remove(id: string): Promise<Users | undefined> {
    try {
      const response = await apiService.delete<UsersJson>(`${baseUrl}/${id}`);
      return Users.fromJson(response);
    } catch (error) {
      console.error("Error while removing user", error);
      throw error;
    }
  }
}

export default UsersAPI;
