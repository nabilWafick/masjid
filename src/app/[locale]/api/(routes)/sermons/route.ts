// api/sermons/route.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { validateMultiLanguageField, validateUserId } from "@/lib/utils";

const prisma = new PrismaClient();

// Validation utilities

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { topic, description, video, preachedById, publishedById } =
        req.body;
      const token = req.headers.authorization?.split(" ")[1];

      // Authentication checks
      if (!token) {
        return res
          .status(401)
          .json({ message: "Authorization token required" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        isAdmin: boolean;
      };
      if (!decoded.isAdmin) {
        return res.status(403).json({ message: "Admin privileges required" });
      }

      // Data validation
      const validationErrors = [
        ...validateMultiLanguageField(topic, "topic"),
        ...validateMultiLanguageField(description, "description"),
        ...validateUserId(preachedById, "preachedById"),
        ...validateUserId(publishedById, "publishedById"),
        (!video || typeof video !== "string" || video.trim() === "") &&
          "Video URL is required",
      ].filter(Boolean) as string[];

      if (validationErrors.length > 0) {
        return res.status(400).json({
          message: "Validation failed",
          errors: validationErrors,
        });
      }

      // Create transaction for data consistency
      const [topicML, descriptionML] = await prisma.$transaction([
        prisma.multiLanguageFields.create({ data: topic }),
        prisma.multiLanguageFields.create({ data: description }),
      ]);

      const sermon = await prisma.sermons.create({
        data: {
          topicId: topicML.id,
          descriptionId: descriptionML.id,
          video: video.trim(),
          preachedById: preachedById.trim(),
          publishedById: publishedById.trim(),
          updatedById: publishedById.trim(),
        },
        include: {
          topic: true,
          description: true,
          preachedBy: true,
          publishedBy: true,
          updatedBy: true,
        },
      });

      return res.status(201).json(sermon);
    } else if (req.method === "GET") {
      const { searchField, pageSize = "10", page = "1" } = req.query;
      const pageSizeNumber = Math.min(Number(pageSize), 100);
      const pageNumber = Math.max(Number(page), 1);

      const whereClause: Prisma.SermonsWhereInput = searchField
        ? {
            AND: [
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

      const [total, items] = await Promise.all([
        prisma.sermons.count({
          where: whereClause,
        }),
        prisma.sermons.findMany({
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
          orderBy: { publishedAt: "desc" },
        }),
      ]);

      const baseUrl = `${req.headers.host}/api/sermons`;
      const queryParams = [];
      if (searchField)
        queryParams.push(
          `searchField=${encodeURIComponent(String(searchField))}`
        );
      queryParams.push(`pageSize=${pageSizeNumber}`);

      const previous =
        pageNumber > 1
          ? `${baseUrl}?${queryParams.join("&")}&page=${pageNumber - 1}`
          : null;

      const next =
        pageNumber * pageSizeNumber < total
          ? `${baseUrl}?${queryParams.join("&")}&page=${pageNumber + 1}`
          : null;

      return res.status(200).json({
        meta: { total, page: pageNumber, pageSize: pageSizeNumber },
        links: { previous, next },
        items,
      });
    } else {
      res.setHeader("Allow", ["POST", "GET"]);
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
    }
  } catch (error: any) {
    console.error("API Error:", error);
    const statusCode = error.name === "JsonWebTokenError" ? 401 : 500;
    return res.status(statusCode).json({
      message: error.message || "Internal server error",
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
  }
}
