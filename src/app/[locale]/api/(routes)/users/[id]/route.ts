// api/users/[id]/route.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import argon from "argon2";
import { validateUserInput } from "@/lib/utils";

const prisma = new PrismaClient();
const SALT_ROUNDS = 12;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    const userId = String(id);

    if (req.method === "GET") {
      // Get user by ID
      const token = req.headers.authorization?.split(" ")[1];
      if (!token)
        return res.status(401).json({ message: "Authorization required" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
        isAdmin: boolean;
      };

      // Users can only access their own data unless they're admin
      if (decoded.userId !== userId && !decoded.isAdmin) {
        return res.status(403).json({ message: "Access denied" });
      }

      const user = await prisma.users.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          firstnames: true,
          email: true,
          phoneNumber: true,
          isAdmin: true,
        },
      });

      return user
        ? res.status(200).json(user)
        : res.status(404).json({ message: "User not found" });
    } else if (req.method === "PUT") {
      // Update user
      const token = req.headers.authorization?.split(" ")[1];
      if (!token)
        return res.status(401).json({ message: "Authorization required" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
        isAdmin: boolean;
      };
      const isAdminRequest = decoded.isAdmin;

      // Check permissions
      if (decoded.userId !== userId && !isAdminRequest) {
        return res.status(403).json({ message: "Access denied" });
      }

      const existingUser = await prisma.users.findUnique({
        where: { id: userId },
      });
      if (!existingUser)
        return res.status(404).json({ message: "User not found" });

      const updateData = { ...req.body };
      const validationErrors = validateUserInput(updateData, true);

      if (validationErrors.length > 0) {
        return res
          .status(400)
          .json({ message: "Validation failed", errors: validationErrors });
      }

      // Non-admins can't change admin status
      if ("isAdmin" in updateData && !isAdminRequest) {
        return res.status(403).json({ message: "Cannot modify admin status" });
      }

      // Handle password update
      if (updateData.password) {
        updateData.password = await argon.hash(updateData.password);
      }

      const updatedUser = await prisma.users.update({
        where: { id: userId },
        data: {
          name: updateData.name?.trim(),
          firstnames: updateData.firstnames?.trim(),
          email: updateData.email?.trim().toLowerCase(),
          phoneNumber: updateData.phoneNumber?.trim(),
          isAdmin: isAdminRequest ? updateData.isAdmin : undefined,
          password: updateData.password,
        },
        select: {
          id: true,
          name: true,
          firstnames: true,
          email: true,
          phoneNumber: true,
          isAdmin: true,
        },
      });

      return res.status(200).json(updatedUser);
    } else if (req.method === "DELETE") {
      // Delete user (Admin only)
      const token = req.headers.authorization?.split(" ")[1];
      if (!token)
        return res.status(401).json({ message: "Authorization required" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        isAdmin: boolean;
      };
      if (!decoded.isAdmin)
        return res.status(403).json({ message: "Admin privileges required" });

      const user = await prisma.users.delete({
        where: { id: userId },
        select: { id: true },
      });

      return res.status(204).end();
    } else {
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
    }
  } catch (error: any) {
    console.error("User API Error:", error);

    if (error.code === "P2002") {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    const statusCode = error.name === "JsonWebTokenError" ? 401 : 500;
    return res.status(statusCode).json({
      message: error.message || "Internal server error",
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
  }
}
