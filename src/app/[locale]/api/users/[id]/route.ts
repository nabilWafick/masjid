// app/[locale]/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import argon from "argon2";
import { validateUserInput } from "@/lib/utils";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;

    /*
    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Authorization required" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      isAdmin: boolean;
    };

    if (decoded.userId !== userId && !decoded.isAdmin) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }
    
      
    */

    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    return handleApiError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;

    /*    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { message: "Authorization required" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      isAdmin: boolean;
    };
    const isAdminRequest = decoded.isAdmin;

    // Users can only patch their own data unless they're admin
    if (decoded.userId !== userId && !isAdminRequest) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }
      
    */

    const existingUser = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const patchData = await request.json();

    // Validate only the fields that are being updated
    const validationErrors = validateUserInput(patchData, true);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { message: "Validation failed", errors: validationErrors },
        { status: 400 }
      );
    }

    /*
    // Non-admins can't change admin status
    if ("isAdmin" in patchData && !isAdminRequest) {
      return NextResponse.json(
        { message: "Cannot modify admin status" },
        { status: 403 }
      );
    }
    
    */

    /*
    // Handle password update if included
    if (patchData.password) {
      patchData.password = await argon.hash(patchData.password);
    }
    */

    const updateData: any = {};
    if (patchData.name !== undefined) updateData.name = patchData.name.trim();
    if (patchData.firstnames !== undefined)
      updateData.firstnames = patchData.firstnames.trim();
    if (patchData.email !== undefined)
      updateData.email = patchData.email.trim().toLowerCase();
    if (patchData.phoneNumber !== undefined)
      updateData.phoneNumber = patchData.phoneNumber.trim();
    /*  if (patchData.password !== undefined)
      updateData.password = patchData.password;
    if (isAdminRequest && patchData.isAdmin !== undefined)
        updateData.isAdmin = patchData.isAdmin;
      */

    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    return handleApiError(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { message: "Authorization required" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      isAdmin: boolean;
    };
    const isAdminRequest = decoded.isAdmin;

    if (decoded.userId !== userId && !isAdminRequest) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    const existingUser = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const updateData = await request.json();
    const validationErrors = validateUserInput(updateData, true);

    if (validationErrors.length > 0) {
      return NextResponse.json(
        { message: "Validation failed", errors: validationErrors },
        { status: 400 }
      );
    }

    if ("isAdmin" in updateData && !isAdminRequest) {
      return NextResponse.json(
        { message: "Cannot modify admin status" },
        { status: 403 }
      );
    }

    /*
    if (updateData.password) {
      updateData.password = await argon.hash(updateData.password);
    }
    */

    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        name: updateData.name?.trim(),
        firstnames: updateData.firstnames?.trim(),
        email: updateData.email?.trim().toLowerCase(),
        phoneNumber: updateData.phoneNumber?.trim(),
        //  isAdmin: isAdminRequest ? updateData.isAdmin : undefined,
        //  password: updateData.password,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;

    /*
    
    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { message: "Authorization required" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      isAdmin: boolean;
    };

    if (!decoded.isAdmin) {
      return NextResponse.json(
        { message: "Admin privileges required" },
        { status: 403 }
      );
    }
    
    */

    await prisma.users.delete({
      where: { id: userId },
      select: { id: true },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    return handleApiError(error);
  }
}

// Helper function for error handling
function handleApiError(error: any) {
  console.error("User API Error:", error);

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
