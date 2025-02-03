import { validate as isUuid, v4 as uuidv4 } from "uuid";

export interface UserJson {
  id: string;
  name: string;
  firstnames: string;
  email: string;
  phoneNumber: string;
}

class User {
  id: string;
  name: string;
  firstnames: string;
  email: string;
  phoneNumber: string;

  constructor(
    id: string = uuidv4(),
    name: string,
    firstnames: string,
    email: string,
    phoneNumber: string
  ) {
    if (!isUuid(id)) {
      throw new Error("Invalid UUID");
    }
    this.id = id;
    this.name = name;
    this.firstnames = firstnames;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }

  static fromJson(data: UserJson): User {
    return new User(
      data.id,
      data.name,
      data.firstnames,
      data.email,
      data.phoneNumber
    );
  }

  toJson(): UserJson {
    return {
      id: this.id,
      name: this.name,
      firstnames: this.firstnames,
      email: this.email,
      phoneNumber: this.phoneNumber,
    };
  }
}

export default User;
