import { validate as isUuid, v4 as uuidv4 } from "uuid";

export interface UsersJson {
  id: string;
  name: string;
  firstnames: string;
  email: string;
  phoneNumber: string;
  isAdmin: string;
  password: string;
}

class Users {
  id: string;
  name: string;
  firstnames: string;
  email: string;
  phoneNumber: string;
  isAdmin: string;
  password: string;

  constructor(
    id: string = uuidv4(),
    name: string,
    firstnames: string,
    email: string,
    phoneNumber: string,
    isAdmin: string,
    password: string
  ) {
    if (!isUuid(id)) {
      throw new Error("Invalid UUID");
    }
    this.id = id;
    this.name = name;
    this.firstnames = firstnames;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.isAdmin = isAdmin;
    this.password = password;
  }

  static fromJson(data: UsersJson): Users {
    return new Users(
      data.id,
      data.name,
      data.firstnames,
      data.email,
      data.phoneNumber,
      data.isAdmin,
      data.password
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
    };
  }
}

export default Users;
