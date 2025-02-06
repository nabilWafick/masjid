import { validate as isUuid } from "uuid";
import MultiLanguageText, {
  MultiLanguageTextJson,
} from "./multi-language-text.model";
import Users, { UsersJson } from "./user.model";

export interface SermonJson {
  id: string;
  topic: MultiLanguageTextJson;
  description: MultiLanguageTextJson;
  video: string;
  preachedBy: UsersJson;
  publishedBy: UsersJson;
  publishedAt: string;
  updatedBy: UsersJson;
  updatedAt: string;
}

class Sermon {
  id: string;
  topic: MultiLanguageText;
  description: MultiLanguageText;
  video: string;
  preachedBy: Users;
  publishedBy: Users;
  publishedAt: Date;
  updatedBy: UsersJson;
  updatedAt: Date;

  constructor(
    id: string,
    topic: MultiLanguageText,
    description: MultiLanguageText,
    video: string,
    preachedBy: Users,
    publishedBy: Users,
    publishedAt: Date,
    updatedBy: UsersJson,
    updatedAt: Date
  ) {
    if (!isUuid(id)) {
      throw new Error("Invalid UUID");
    }
    this.id = id;
    this.topic = topic;
    this.description = description;
    this.video = video;
    this.preachedBy = preachedBy;
    this.publishedBy = publishedBy;
    this.publishedAt = publishedAt;
    this.updatedBy = updatedBy;
    this.updatedAt = updatedAt;
  }

  static fromJson(data: SermonJson): Sermon {
    return new Sermon(
      data.id,
      MultiLanguageText.fromJson(data.topic),
      MultiLanguageText.fromJson(data.description),
      data.video,
      Users.fromJson(data.preachedBy),
      Users.fromJson(data.publishedBy),
      new Date(data.publishedAt),
      Users.fromJson(data.updatedBy),
      new Date(data.updatedAt)
    );
  }

  toJson(): SermonJson {
    return {
      id: this.id,
      topic: this.topic.toJson(),
      description: this.description.toJson(),
      video: this.video,
      preachedBy: this.preachedBy.toJson(),
      publishedBy: this.publishedBy.toJson(),
      publishedAt: this.publishedAt.toUTCString(),
      updatedBy: this.updatedBy,
      updatedAt: this.updatedAt.toUTCString(),
    };
  }
}

export default Sermon;
