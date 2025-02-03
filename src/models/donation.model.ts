import { validate as isUuid } from "uuid";
import User, { UserJson } from "./user.model";
import Project, { ProjectJson } from "./project.model";

interface DonationJson {
  id: string;
  amount: number;
  project?: ProjectJson;
  donatedBy: UserJson;
  donatedAt: string;
}

class Donation {
  id: string;
  amount: number;
  project?: Project;
  donatedBy: User;
  donatedAt: Date;

  constructor(
    id: string,
    amount: number,
    donatedBy: User,
    donatedAt: Date,
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

  static fromJson(data: DonationJson): Donation {
    return new Donation(
      data.id,
      data.amount,
      User.fromJson(data.donatedBy),
      new Date(data.donatedAt),
      data.project ? Project.fromJson(data.project) : undefined
    );
  }

  toJson(): DonationJson {
    return {
      id: this.id,

      amount: this.amount,

      donatedBy: this.donatedBy,
      donatedAt: this.donatedAt.toUTCString(),
    };
  }
}

export default Donation;
