import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, firstnames, email, phoneNumber, password } = req.body;

    if (!name || !firstnames || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    try {
      // Check if the user already exists
      const existingUser = await prisma.users.findUnique({ where: { email } });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "This email is already in use." });
      }

      // Hash the password with Argon2
      const hashedPassword = await argon2.hash(password);

      // Create the user
      const user = await prisma.users.create({
        data: {
          name,
          firstnames,
          email,
          phoneNumber,
          password: hashedPassword,
        },
      });

      // Generate a JWT token
      const token = jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );

      res.status(201).json({ message: "User created successfully.", token });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Internal server error.", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
