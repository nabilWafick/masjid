import Users, { UsersJson } from "./user.model";

export interface PaginatedUsersJson {
  total: number;
  next: string | undefined;
  previous: string | undefined;
  items: UsersJson[];
}

class PaginatedUsers {
  total: number;
  next: string | undefined;
  previous: string | undefined;
  items: Users[];
  constructor(
    total: number,
    next: string | undefined,
    previous: string | undefined,
    items: Users[]
  ) {
    this.total = total;
    this.next = next;
    this.previous = previous;
    this.items = items;
  }

  static fromJson(data: PaginatedUsersJson): PaginatedUsers {
    return new PaginatedUsers(
      data.total,
      data.next,
      data.previous,
      data.items.map((user) => Users.fromJson(user))
    );
  }
}

export default PaginatedUsers;
