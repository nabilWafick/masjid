export interface MultiLanguageTextJson {
  ar: string;
  en: string;
  fr: string;
}

class MultiLanguageText {
  ar: string;
  en: string;
  fr: string;

  constructor(ar: string, en: string, fr: string) {
    this.ar = ar;
    this.en = en;
    this.fr = fr;
  }

  // Method to get the text in a specific language
  getText(language: "ar" | "en" | "fr"): string {
    switch (language) {
      case "ar":
        return this.ar;
      case "en":
        return this.en;
      case "fr":
        return this.fr;
      default:
        throw new Error("Language not supported");
    }
  }

  // Method to convert from JSON to MultiLanguageText
  static fromJson(data: MultiLanguageTextJson): MultiLanguageText {
    return new MultiLanguageText(data.ar, data.en, data.fr);
  }

  // Optional: to return all translations as an object
  toJson() {
    return {
      ar: this.ar,
      en: this.en,
      fr: this.fr,
    };
  }
}

export default MultiLanguageText;
