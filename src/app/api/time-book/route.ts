import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const bookTime = await prisma.bookTime.create({
      data: {
        reason: body.reason,
        startDate: body.startDate,
        endDate: body.endDate,
        firstname: body.firstname,
        lastname: body.lastname,
        phoneNumber: body.phoneNumber,
      },
    });
    console.log(bookTime);
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
