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

    const adjustedBookTimes = bookTimes.map((bookTime) => {
      const startDate = new Date(bookTime.startDate);
      const endDate = new Date(bookTime.endDate);

      startDate.setHours(startDate.getHours() + 7);
      endDate.setHours(endDate.getHours() + 7);

      if (startDate.getHours() === 2) {
        startDate.setHours(9);
      }
      if (endDate.getHours() === 2) {
        endDate.setHours(9);
      }

      return {
        ...bookTime,
        startDate,
        endDate,
      };
    });

    return NextResponse.json(adjustedBookTimes);
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
