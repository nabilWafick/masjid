import { validate as isUuid, v4 as uuidv4 } from "uuid";

export interface SubscribersJson {
  id: string;
  email: string;
}

class Subscribers {
  id: string;
  email: string;

  constructor(id: string = uuidv4(), email: string) {
    if (!isUuid(id)) {
      throw new Error("Invalid UUID");
    }
    this.id = id;
    this.email = email;
  }

  static fromJson(data: SubscribersJson): Subscribers {
    return new Subscribers(data.id, data.email);
  }

  toJson(): SubscribersJson {
    return {
      id: this.id,
      email: this.email,
    };
  }
}

export default Subscribers;
