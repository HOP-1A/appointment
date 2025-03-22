import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const bookedTime = await prisma.bookTime.findFirst({
      where: {
        userId: body.userId,
        startDate: body.startDate,
      },
    });

    console.log(bookedTime);

    if (bookedTime) {
      return NextResponse.json(
        {
          error: "already booked",
        },
        {
          status: 401,
        }
      );
    }

    const bookTime = await prisma.bookTime.create({
      data: {
        userId: body.userId,
        reason: body.reason,
        startDate: body.startDate,
        endDate: body.endDate,
        firstName: body.firstName,
        lastName: body.lastName,
        phoneNumber: body.phoneNumber,
      },
    });
    return NextResponse.json(bookTime);
  } catch (error) {
    console.error("error!", error);
    return NextResponse.json(
      {
        error,
      },
      {
        status: 500,
      }
    );
  }
};
