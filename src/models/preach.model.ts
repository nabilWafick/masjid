import { validate as isUuid } from "uuid";
import MultiLanguageText, {
  MultiLanguageTextJson,
} from "./multi-language-text.model";
import User, { UserJson } from "./user.model";

export interface PreachJson {
  id: string;
  topic: MultiLanguageTextJson;
  description: MultiLanguageTextJson;
  video: string;
  preachedBy: UserJson;
  publishedBy: UserJson;
  publishedAt: string;
}

class Preach {
  id: string;
  topic: MultiLanguageText;
  description: MultiLanguageText;
  video: string;
  preachedBy: User;
  publishedBy: User;
  publishedAt: Date;

  constructor(
    id: string,
    topic: MultiLanguageText,
    description: MultiLanguageText,
    video: string,
    preachedBy: User,
    publishedBy: User,

    publishedAt: Date
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
  }

  static fromJson(data: PreachJson): Preach {
    return new Preach(
      data.id,
      MultiLanguageText.fromJson(data.topic),
      MultiLanguageText.fromJson(data.description),
      data.video,
      User.fromJson(data.preachedBy),
      User.fromJson(data.publishedBy),
      new Date(data.publishedAt)
    );
  }

  toJson(): PreachJson {
    return {
      id: this.id,
      topic: this.topic.toJson(),
      description: this.description.toJson(),
      video: this.video,
      preachedBy: this.preachedBy.toJson(),
      publishedBy: this.publishedBy.toJson(),
      publishedAt: this.publishedAt.toUTCString(),
    };
  }
}

export default Preach;
