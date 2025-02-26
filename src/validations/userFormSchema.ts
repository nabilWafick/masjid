import * as z from "zod";

export const userFormSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(3, { message: "Name must contain at least 3 characters " }),
  firstnames: z
    .string()
    .min(3, { message: "Firstnames must contain at least 3 characters " }),
  email: z.string().email({ message: "Invalid email format" }),
  isAdmin: z.boolean(),
  phoneNumber: z.string().regex(/^(?:\+22901|0022901)?[0-9]{8}$/, {
    message:
      "Invalid Benin phone number. Must be 8 digits with optional +229|00229 prefix",
  }),
  password: z.string().optional(),
});

export type UserFormData = z.infer<typeof userFormSchema>;
