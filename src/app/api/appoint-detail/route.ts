import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const body = await req.json();
    const apponitDetail = await prisma.bookTime.findUnique({
      where: {
        id: body.id,
      },
    });
    console.log(apponitDetail);
    return NextResponse.json(apponitDetail);
  } catch (error) {
    console.error("error!", error);
    return NextResponse.json(
      {
        error: "failed to find booked time",
      },
      {
        status: 500,
      }
    );
  }
};
