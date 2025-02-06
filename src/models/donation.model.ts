import { validate as isUuid } from "uuid";
import Users, { UsersJson } from "./user.model";
import Project, { ProjectJson } from "./project.model";

interface DonationsJson {
  id: string;
  amount: number;
  project?: ProjectJson;
  donatedBy?: UsersJson;
  donatedAt: string;
}

class Donations {
  id: string;
  amount: number;
  project?: Project;
  donatedBy?: Users;
  donatedAt: Date;

  constructor(
    id: string,
    amount: number,
    donatedAt: Date,
    donatedBy?: Users,
    project?: Project
  ) {
    if (!isUuid(id)) {
      throw new Error("Invalid UUID");
    }
    this.id = id;
    this.amount = amount;
    this.project = project;
    this.donatedBy = donatedBy;
    this.donatedAt = donatedAt;
  }

  static fromJson(data: DonationsJson): Donations {
    return new Donations(
      data.id,
      data.amount,
      new Date(data.donatedAt),
      data.donatedBy ? Users.fromJson(data.donatedBy) : undefined,
      data.project ? Project.fromJson(data.project) : undefined
    );
  }

  toJson(): DonationsJson {
    return {
      id: this.id,
      amount: this.amount,
      donatedBy: this.donatedBy,
      donatedAt: this.donatedAt.toUTCString(),
    };
  }
}

export default Donations;
