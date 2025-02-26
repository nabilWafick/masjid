import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
  }).format(amount);
}

export const validateMultiLanguageField = (
  field: any,
  fieldName: string
): string[] => {
  const errors: string[] = [];
  if (!field || typeof field !== "object") {
    errors.push(`${fieldName} is required`);
    return errors;
  }

  const requiredLanguages = ["ar", "en", "fr"];
  for (const lang of requiredLanguages) {
    if (!(lang in field)) {
      errors.push(`${fieldName} is missing ${lang} translation`);
    } else if (typeof field[lang] !== "string" || field[lang].trim() === "") {
      errors.push(`${fieldName}.${lang} must be a non-empty string`);
    }
  }

  return errors;
};

// Validation utilities
export const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePhoneNumber = (phone: string) =>
  /^(?:\+22901|0022901)?[0-9]{8}$/.test(phone);

export const validatePassword = (password: string) => password.length >= 8;

export const validateUserId = (userId: any, fieldName: string): string[] => {
  const errors: string[] = [];
  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    errors.push(`${fieldName} is required`);
  }
  return errors;
};

export const validateUserInput = (userData: any, isUpdate = false) => {
  const errors: string[] = [];

  if (!isUpdate || "name" in userData) {
    if (!userData.name?.trim()) errors.push("Name is required");
  }

  if (!isUpdate || "firstnames" in userData) {
    if (!userData.firstnames?.trim()) errors.push("Firstnames are required");
  }

  if (!isUpdate || "email" in userData) {
    if (!userData.email?.trim()) {
      errors.push("Email is required");
    } else if (!validateEmail(userData.email)) {
      errors.push("Invalid email format");
    }
  }

  if (!isUpdate || "phoneNumber" in userData) {
    if (!userData.phoneNumber?.trim()) {
      errors.push("Phone number is required");
    } else if (!validatePhoneNumber(userData.phoneNumber)) {
      errors.push("Invalid phone number format");
    }
  }

  if (!isUpdate && !userData.password) {
    errors.push("Password is required");
  } else if (userData.password && !validatePassword(userData.password)) {
    errors.push("Password must be at least 8 characters");
  }

  return errors;
};
