import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (_req: Request) => {
  try {
    const bookTimes = await prisma.bookTime.findMany({
      include: {
        notes: true,
      },
    });

    return NextResponse.json(bookTimes);

  } catch (error) {
    console.error("error!", error);
    return NextResponse.json(
      {
        error: "failed to fetch booking times",
      },
      {
        status: 500,
      }
    );
  }
};
