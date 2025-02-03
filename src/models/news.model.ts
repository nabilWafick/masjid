import { validate as isUuid } from "uuid";
import MultiLanguageText, {
  MultiLanguageTextJson,
} from "./multi-language-text.model";
import User, { UserJson } from "./user.model";

export interface NewsJson {
  id: string;
  title: MultiLanguageTextJson;
  description: MultiLanguageTextJson;
  image: string;
  publishedBy: UserJson;
  publishedAt: string;
}

class News {
  id: string;
  title: MultiLanguageText;
  description: MultiLanguageText;
  image: string;
  publishedBy: User;
  publishedAt: Date;

  constructor(
    id: string,
    title: MultiLanguageText,
    description: MultiLanguageText,
    image: string,
    publishedBy: User,
    publishedAt: Date
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
  }

  static fromJson(data: NewsJson): News {
    return new News(
      data.id,
      MultiLanguageText.fromJson(data.title),
      MultiLanguageText.fromJson(data.description),
      data.image,
      User.fromJson(data.publishedBy),
      new Date(data.publishedAt)
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
    };
  }
}

export default News;
