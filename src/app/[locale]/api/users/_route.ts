// api/users/route.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { validateUserInput } from "@/lib/utils";
import argon from "argon2";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("=====================> USERS ROUTE");
  try {
    if (req.method === "POST") {
      console.log("Req body", req.body);

      const { name, firstnames, email, phoneNumber, password, isAdmin } =
        req.body;

      /*
    
      const token = req.headers.authorization?.split(" ")[1];

      if (!token)
        return res.status(401).json({ message: "Authorization required" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
        isAdmin: boolean;
      };

      // check if it is an admin
      if (!decoded.isAdmin)
        return res.status(403).json({ message: "Admin privileges required" });

      */

      const validationErrors = validateUserInput(req.body);
      if (validationErrors.length > 0) {
        return res
          .status(400)
          .json({ message: "Validation failed", errors: validationErrors });
      }

      const hashedPassword = password ? await argon.hash(password) : undefined;

      const user = await prisma.users.create({
        data: {
          name: name.trim(),
          firstnames: firstnames.trim(),
          email: email.trim().toLowerCase(),
          phoneNumber: phoneNumber.trim(),
          isAdmin: isAdmin || false,
          password: hashedPassword,
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

      return res.status(201).json(user);
    } else if (req.method === "GET") {
      /*
      const token = req.headers.authorization?.split(" ")[1];
      if (!token)
        return res.status(401).json({ message: "Authorization required" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
        isAdmin: boolean;
      };

      if (!decoded.isAdmin) {
        // Return only the requesting user's data
        const user = await prisma.users.findUnique({
          where: { id: decoded.userId },
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
      }

      */

      // Admin view with pagination
      const { page = "1", pageSize = "20", search = "" } = req.query;
      const pageNumber = Math.max(Number(page), 1);
      const pageSizeNumber = Math.min(Number(pageSize), 100);

      const whereClause: Prisma.UsersWhereInput = {
        OR: [
          { name: { contains: String(search), mode: "insensitive" } },
          { firstnames: { contains: String(search), mode: "insensitive" } },
          { email: { contains: String(search), mode: "insensitive" } },
          { phoneNumber: { contains: String(search) } },
        ],
      };

      const [total, items] = await Promise.all([
        prisma.users.count({ where: whereClause }),
        prisma.users.findMany({
          where: whereClause,
          skip: (pageNumber - 1) * pageSizeNumber,
          take: pageSizeNumber,
          select: {
            id: true,
            name: true,
            firstnames: true,
            email: true,
            phoneNumber: true,
            isAdmin: true,
          },
          orderBy: { id: "asc" },
        }),
      ]);

      return res.status(200).json({
        meta: { total, page: pageNumber, pageSize: pageSizeNumber },
        items,
      });
    } else {
      res.setHeader("Allow", ["POST", "GET"]);
      return res
        .status(405)
        .json({ message: `Method ${req.method} Not Allowed at all` });
    }
  } catch (error: any) {
    console.error("Users API Error:", error);

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
