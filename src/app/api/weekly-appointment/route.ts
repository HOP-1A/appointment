import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const bookTime = await prisma.bookTime.findMany();
    return NextResponse.json(bookTime);
  } catch (error) {
    console.error("error!", error);
    return NextResponse.json(
      {
        error: "failed to create booking time",
      },
      {
        status: 500,
      }
    );
  }
};
