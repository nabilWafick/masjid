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
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    try {
      // Find the user by email
      const user = await prisma.users.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      // Verify password
      const validPassword = await argon2.verify(user.password, password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );

      res.status(200).json({ message: "Login successful.", token });
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
