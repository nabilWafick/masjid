import { validate as isUuid } from "uuid";
import MultiLanguageText, {
  MultiLanguageTextJson,
} from "./multi-language-text.model";
import Users, { UsersJson } from "./user.model";

export interface NewsJson {
  id: string;
  title: MultiLanguageTextJson;
  description: MultiLanguageTextJson;
  image: string;
  publishedBy: UsersJson;
  publishedAt: string;
  updatedBy: UsersJson;
  updatedAt: string;
}

class News {
  id: string;
  title: MultiLanguageText;
  description: MultiLanguageText;
  image: string;
  publishedBy: Users;
  publishedAt: Date;
  updatedBy: Users;
  updatedAt: Date;

  constructor(
    id: string,
    title: MultiLanguageText,
    description: MultiLanguageText,
    image: string,
    publishedBy: Users,
    publishedAt: Date,
    updatedBy: Users,
    updatedAt: Date
  ) {
    if (!isUuid(id)) {
      throw new Error("Invalid UUID");
    }
    this.id = id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.publishedBy = publishedBy;
    this.publishedAt = publishedAt;
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt;
  }

  static fromJson(data: NewsJson): News {
    return new News(
      data.id,
      MultiLanguageText.fromJson(data.title),
      MultiLanguageText.fromJson(data.description),
      data.image,
      Users.fromJson(data.publishedBy),
      new Date(data.publishedAt),
      Users.fromJson(data.updatedBy),
      new Date(data.updatedAt)
    );
  }

  toJson(): NewsJson {
    return {
      id: this.id,
      title: this.title.toJson(),
      description: this.description.toJson(),
      image: this.image,
      publishedBy: this.publishedBy,
      publishedAt: this.publishedAt.toUTCString(),
      updatedBy: this.updatedBy,
      updatedAt: this.updatedAt.toUTCString(),
    };
  }
}

export default News;
