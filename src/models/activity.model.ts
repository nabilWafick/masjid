import { validate as isUuid } from "uuid";
import MultiLanguageText, {
  MultiLanguageTextJson,
} from "./multi-language-text.model";
import Users, { UsersJson } from "./user.model";

export interface ActivitiesJson {
  id: string;
  name: MultiLanguageTextJson;
  period: MultiLanguageTextJson;
  description: MultiLanguageTextJson;
  image: string;
  createdBy: UsersJson;
  createdAt: string;
  updatedBy: UsersJson;
  updatedAt: string;
}

class Activities {
  id: string;
  name: MultiLanguageText;
  period: MultiLanguageText;
  description: MultiLanguageText;
  image: string;
  createdBy: Users;
  createdAt: Date;
  updatedBy: Users;
  updatedAt: Date;

  constructor(
    id: string,
    name: MultiLanguageText,
    period: MultiLanguageText,
    description: MultiLanguageText,
    image: string,
    createdBy: Users,
    createdAt: Date,
    updatedBy: Users,
    updatedAt: Date
  ) {
    if (!isUuid(id)) {
      throw new Error("Invalid UUID");
    }
    this.id = id;
    this.name = name;
    this.period = period;
    this.description = description;
    this.image = image;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt;
  }

  static fromJson(data: ActivitiesJson): Activities {
    return new Activities(
      data.id,
      MultiLanguageText.fromJson(data.name),
      MultiLanguageText.fromJson(data.period),
      MultiLanguageText.fromJson(data.description),
      data.image,
      Users.fromJson(data.createdBy),
      new Date(data.createdAt),
      Users.fromJson(data.updatedBy),
      new Date(data.updatedAt)
    );
  }

  toJson(): ActivitiesJson {
    return {
      id: this.id,
      name: this.name.toJson(),
      period: this.period.toJson(),
      description: this.description.toJson(),
      image: this.image,
      createdBy: this.createdBy,
      createdAt: this.createdAt.toUTCString(),
      updatedBy: this.updatedBy,
      updatedAt: this.updatedAt.toUTCString(),
    };
  }
}

export default Activities;
