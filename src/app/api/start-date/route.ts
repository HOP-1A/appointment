import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { format } from "date-fns";
export const GET = async (req: Request) => {
  try {
    const bookTimes = await prisma.bookTime.findMany();
    const startDate = bookTimes.map((time) => {
      return format(time.startDate, "yyyy-MM-dd hh:mm");
    });
    return NextResponse.json(startDate);
  } catch (error) {
    console.error("error!", error);
    return NextResponse.json(
      {
        error: "failed to fetch start date",
      },
      {
        status: 500,
      }
    );
  }
};
