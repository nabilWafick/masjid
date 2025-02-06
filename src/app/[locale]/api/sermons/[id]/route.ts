// api/sermons/[id]/route.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    // Get a specific sermon by ID
    try {
      const sermon = await prisma.sermons.findUnique({
        where: { id: String(id) },
      });
      if (!sermon) return res.status(404).json({ message: "Sermon not found" });
      res.status(200).json(sermon);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  } else if (req.method === "PUT") {
    // Update a sermon (Admin only)
    const { topic, description, video, preachedById, publishedById } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Unauthorized" });

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      if (!decoded.isAdmin)
        return res.status(403).json({ message: "Forbidden: Admins only" });

      const updatedSermon = await prisma.sermons.update({
        where: { id: String(id) },
        data: {
          topic,
          description,
          video,
          preachedById,
          publishedById,
          updatedById: publishedById,
        },
      });
      res.status(200).json(updatedSermon);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  } else if (req.method === "DELETE") {
    // Delete a sermon (Admin only)
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Unauthorized" });

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      if (!decoded.isAdmin)
        return res.status(403).json({ message: "Forbidden: Admins only" });

      await prisma.sermons.delete({ where: { id: String(id) } });
      res.status(204).end();
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
