import { validate as isUuid, v4 as uuidv4 } from "uuid";

export interface UsersJson {
  id?: string;
  name: string;
  firstnames: string;
  email: string;
  phoneNumber: string;
  isAdmin: boolean;
  password?: string;
  createdAt: string;
  updatedAt: string;
}

class Users {
  id?: string;
  name: string;
  firstnames: string;
  email: string;
  phoneNumber: string;
  isAdmin: boolean;
  password?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    name: string,
    firstnames: string,
    email: string,
    phoneNumber: string,
    isAdmin: boolean,
    createdAt: Date,
    updatedAt: Date,
    password?: string,
    id?: string
  ) {
    this.id = id;
    this.name = name;
    this.firstnames = firstnames;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.isAdmin = isAdmin;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(data: UsersJson): Users {
    return new Users(
      data.name,
      data.firstnames,
      data.email,
      data.phoneNumber,
      data.isAdmin,
      new Date(data.createdAt),
      new Date(data.updatedAt),
      data.password,
      data.id
    );
  }

  toJson(): UsersJson {
    return {
      id: this.id,
      name: this.name,
      firstnames: this.firstnames,
      email: this.email,
      phoneNumber: this.phoneNumber,
      isAdmin: this.isAdmin,
      password: this.password,
      createdAt: this.createdAt.toUTCString(),
      updatedAt: this.updatedAt.toUTCString(),
    };
  }
}

export default Users;
