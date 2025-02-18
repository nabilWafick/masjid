import { count } from "console";
import Users, { UsersJson } from "./user.model";

export interface PaginatedUsersJson {
  count: number;
  next: string | undefined;
  previous: string | undefined;
  results: UsersJson[];
}

class PaginatedUsers {
  count: number;
  next: string | undefined;
  previous: string | undefined;
  results: Users[];
  constructor(
    count: number,
    next: string | undefined,
    previous: string | undefined,
    results: Users[]
  ) {
    this.count = count;
    this.next = next;
    this.previous = previous;
    this.results = results;
  }

  static fromJson(data: PaginatedUsersJson): PaginatedUsers {
    return new PaginatedUsers(
      data.count,
      data.next,
      data.previous,
      data.results.map((user) => Users.fromJson(user))
    );
  }
}

export default PaginatedUsers;
