// api/sermons/[id]/route.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { validateMultiLanguageField, validateUserId } from "@/lib/utils";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    const sermonId = String(id);

    if (req.method === "GET") {
      const sermon = await prisma.sermons.findUnique({
        where: { id: sermonId },
        include: {
          topic: true,
          description: true,
          preachedBy: true,
          publishedBy: true,
          updatedBy: true,
        },
      });

      return sermon
        ? res.status(200).json(sermon)
        : res.status(404).json({ message: "Sermon not found" });
    } else if (req.method === "PUT") {
      const { topic, description, video, preachedById, publishedById } =
        req.body;
      const token = req.headers.authorization?.split(" ")[1];

      // Authentication checks
      if (!token)
        return res
          .status(401)
          .json({ message: "Authorization token required" });

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

      const existingSermon = await prisma.sermons.findUnique({
        where: { id: sermonId },
      });

      if (!existingSermon) {
        return res.status(404).json({ message: "Sermon not found" });
      }

      // Update multi-language fields and sermon in transaction
      await prisma.$transaction([
        prisma.multiLanguageFields.update({
          where: { id: existingSermon.topicId },
          data: topic,
        }),
        prisma.multiLanguageFields.update({
          where: { id: existingSermon.descriptionId },
          data: description,
        }),
      ]);

      const updatedSermon = await prisma.sermons.update({
        where: { id: sermonId },
        data: {
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

      return res.status(200).json(updatedSermon);
    } else if (req.method === "DELETE") {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token)
        return res
          .status(401)
          .json({ message: "Authorization token required" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        isAdmin: boolean;
      };
      if (!decoded.isAdmin) {
        return res.status(403).json({ message: "Admin privileges required" });
      }

      const existingSermon = await prisma.sermons.findUnique({
        where: { id: sermonId },
        include: { topic: true, description: true },
      });

      if (!existingSermon) {
        return res.status(404).json({ message: "Sermon not found" });
      }

      await prisma.$transaction([
        prisma.sermons.delete({ where: { id: sermonId } }),
        prisma.multiLanguageFields.delete({
          where: { id: existingSermon.topicId },
        }),
        prisma.multiLanguageFields.delete({
          where: { id: existingSermon.descriptionId },
        }),
      ]);

      return res.status(204).end();
    } else {
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
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
