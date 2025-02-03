import { validate as isUuid } from "uuid";
import MultiLanguageText, {
  MultiLanguageTextJson,
} from "./multi-language-text.model";
import User, { UserJson } from "./user.model";

export interface ActivityJson {
  id: string;
  name: MultiLanguageTextJson;
  period: MultiLanguageTextJson;
  description: MultiLanguageTextJson;
  image: string;
  createdBy: UserJson;
  createdAt: string;
}

class Activity {
  id: string;
  name: MultiLanguageText;
  period: MultiLanguageText;
  description: MultiLanguageText;
  image: string;
  createdBy: User;
  createdAt: Date;

  constructor(
    id: string,
    name: MultiLanguageText,
    period: MultiLanguageText,
    description: MultiLanguageText,
    image: string,
    createdBy: User,
    createdAt: Date
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
  }

  static fromJson(data: ActivityJson): Activity {
    return new Activity(
      data.id,
      MultiLanguageText.fromJson(data.name),
      MultiLanguageText.fromJson(data.period),
      MultiLanguageText.fromJson(data.description),
      data.image,
      User.fromJson(data.createdBy),
      new Date(data.createdAt)
    );
  }

  toJson(): ActivityJson {
    return {
      id: this.id,
      name: this.name.toJson(),
      period: this.period.toJson(),
      description: this.description.toJson(),
      image: this.image,
      createdBy: this.createdBy,
      createdAt: this.createdAt.toUTCString(),
    };
  }
}

export default Activity;
