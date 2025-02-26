import { PrismaClient, Prisma } from "@prisma/client";
import { validateUserInput } from "@/lib/utils";
import argon from "argon2";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, firstnames, email, phoneNumber, password, isAdmin } = body;

    // JWT validation commented out as in original
    /*
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return new Response(JSON.stringify({ message: "Authorization required" }), {
        status: 401,
      });
    }
    */

    const validationErrors = validateUserInput(body);
    if (validationErrors.length > 0) {
      return new Response(
        JSON.stringify({
          message: "Validation failed",
          errors: validationErrors,
        }),
        { status: 400 }
      );
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

    return new Response(JSON.stringify(user), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Users API Error:", error);

    if (error.code === "P2002") {
      return new Response(
        JSON.stringify({ message: "User with this email already exists" }),
        { status: 409 }
      );
    }

    const statusCode = error.name === "JsonWebTokenError" ? 401 : 500;
    return new Response(
      JSON.stringify({
        message: error.message || "Internal server error",
        ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
      }),
      { status: statusCode }
    );
  }
}

export async function GET(request: Request) {
  try {
    // JWT validation commented out as in original
    /*
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return new Response(JSON.stringify({ message: "Authorization required" }), {
        status: 401,
      });
    }
    */

    console.log(" ===========> Req.Query");

    const { searchParams } = new URL(request.url);
    const page = Math.max(Number(searchParams.get("page") || "1"), 1);
    const pageSize = Math.min(
      Number(searchParams.get("pageSize") || "20"),
      100
    );
    const search = searchParams.get("search") || "";

    const whereClause: Prisma.UsersWhereInput = {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { firstnames: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phoneNumber: { contains: search } },
      ],
    };

    const [total, items] = await Promise.all([
      prisma.users.count({ where: whereClause }),
      prisma.users.findMany({
        where: whereClause,
        skip: (page - 1) * pageSize,
        take: pageSize,
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

    return new Response(
      JSON.stringify({
        meta: { total, page, pageSize },
        items,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.log(" =====================> SERVER ERROR ");
    console.error("Users API Error:", error);
    return new Response(
      JSON.stringify({
        message: error.message || "Internal server error",
        ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
      }),
      { status: 500 }
    );
  }
}
