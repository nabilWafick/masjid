import { validate as isUuid } from "uuid";
import MultiLanguageText, {
  MultiLanguageTextJson,
} from "./multi-language-text.model";
import User, { UserJson } from "./user.model";

export interface ProjectJson {
  id: string;
  name: MultiLanguageTextJson;
  budget: number;
  description: MultiLanguageTextJson;
  image: string;
  createdBy: UserJson;
  createdAt: string;
}

class Project {
  id: string;
  name: MultiLanguageText;
  budget: number;
  description: MultiLanguageText;
  image: string;
  createdBy: User;
  createdAt: Date;

  constructor(
    id: string,
    name: MultiLanguageText,
    budget: number,
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
    this.budget = budget;
    this.description = description;
    this.image = image;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
  }

  static fromJson(data: ProjectJson): Project {
    return new Project(
      data.id,
      MultiLanguageText.fromJson(data.name),
      data.budget,
      MultiLanguageText.fromJson(data.description),
      data.image,
      User.fromJson(data.createdBy),
      new Date(data.createdAt)
    );
  }

  toJson(): ProjectJson {
    return {
      id: this.id,
      name: this.name.toJson(),
      budget: this.budget,
      description: this.description.toJson(),
      image: this.image,
      createdBy: this.createdBy,
      createdAt: this.createdAt.toUTCString(),
    };
  }
}

export default Project;
