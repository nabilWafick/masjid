// api/sermons/route.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Create a new sermon (Admin only)
    const { topic, description, video, preachedById, publishedById } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Unauthorized" });

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      if (!decoded.isAdmin)
        return res.status(403).json({ message: "Forbidden: Admins only" });

      const sermon = await prisma.sermons.create({
        data: {
          topic: {
            create: topic,
          },
          description: {
            create: description,
          },
          video,
          preachedById,
          publishedById,
          updatedById: publishedById,
        },
        include: {
          topic: true,
          description: true,
          preachedBy: true,
          publishedBy: true,
          updatedBy: true,
        },
      });
      res.status(201).json(sermon);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  } else if (req.method === "GET") {
    // Retrieve paginated sermons
    try {
      const { searchField, pageSize = 10, page = 1 } = req.query;
      const pageSizeNumber = Number(pageSize);
      const pageNumber = Number(page);

      const whereClause = searchField
        ? {
            OR: [
              {
                topic: {
                  ar: { contains: String(searchField), mode: "insensitive" },
                },
              },
              {
                topic: {
                  en: { contains: String(searchField), mode: "insensitive" },
                },
              },
              {
                topic: {
                  fr: { contains: String(searchField), mode: "insensitive" },
                },
              },
              {
                description: {
                  ar: { contains: String(searchField), mode: "insensitive" },
                },
              },
              {
                description: {
                  en: { contains: String(searchField), mode: "insensitive" },
                },
              },
              {
                description: {
                  fr: { contains: String(searchField), mode: "insensitive" },
                },
              },
            ],
          }
        : {};

      const totalSermons = await prisma.sermons.count({ where: whereClause });
      const sermons = await prisma.sermons.findMany({
        where: whereClause,
        skip: (pageNumber - 1) * pageSizeNumber,
        take: pageSizeNumber,
        include: {
          topic: true,
          description: true,
          preachedBy: true,
          publishedBy: true,
          updatedBy: true,
        },
      });

      const baseUrl = `${req.headers.host}/api/sermons`;
      const previous =
        pageNumber > 1
          ? `${baseUrl}?page=${pageNumber - 1}&pageSize=${pageSizeNumber}${
              searchField ? `&searchField=${searchField}` : ""
            }`
          : null;
      const next =
        pageNumber * pageSizeNumber < totalSermons
          ? `${baseUrl}?page=${pageNumber + 1}&pageSize=${pageSizeNumber}${
              searchField ? `&searchField=${searchField}` : ""
            }`
          : null;

      res.status(200).json({ previous, next, items: sermons });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
