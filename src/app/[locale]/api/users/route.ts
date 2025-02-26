// app/[locale]/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { validateUserInput } from "@/lib/utils";
import argon from "argon2";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  //  console.log("=====================> USERS ROUTE");
  try {
    const body = await req.json();
    console.log("Req body", body);

    const { name, firstnames, email, phoneNumber, password, isAdmin } = body;

    const validationErrors = validateUserInput(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { message: "Validation failed", errors: validationErrors },
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

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.error("Users API Error:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const statusCode = error.name === "JsonWebTokenError" ? 401 : 500;
    return NextResponse.json(
      {
        message: error.message || "Internal server error",
        ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
      },
      { status: statusCode }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const url = new URL(req.url);
    const pathParts = url.pathname.split("/");
    const locale = pathParts.length > 1 ? pathParts[1] : null;

    const page = Math.max(Number(searchParams.get("page") || "1"), 1);
    const pageSize = Math.min(
      Number(searchParams.get("pageSize") || "20"),
      100
    );
    const search = searchParams.get("search") ?? "";

    const whereClause: Prisma.UsersWhereInput = {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { firstnames: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phoneNumber: { contains: search, mode: "insensitive" } },
      ],
    };

    const [total, items] = await Promise.all([
      prisma.users.count({ where: whereClause }),
      prisma.users.findMany({
        where: whereClause,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { id: "desc" },
      }),
    ]);

    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const host = req.headers.get("host");

    const baseUrl = locale
      ? `${protocol}://${host}/${locale}/api/users`
      : `${protocol}://${host}/api/users`;
    const queryParams = [];

    if (search) {
      queryParams.push(`search=${encodeURIComponent(search)}`);
    }

    queryParams.push(`pageSize=${pageSize}`);

    const previous =
      page > 1 ? `${baseUrl}?${queryParams.join("&")}&page=${page - 1}` : null;

    const next =
      page * pageSize < total
        ? `${baseUrl}?${queryParams.join("&")}&page=${page + 1}`
        : null;

    return NextResponse.json({
      total,
      previous,
      next,
      items,
    });
  } catch (error: any) {
    console.error("Users API Error:", error);
    return NextResponse.json(
      {
        message: error.message || "Internal server error",
        ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
      },
      { status: 500 }
    );
  }
}
