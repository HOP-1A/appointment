import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
      const appointment = await prisma.bookTime.findMany();
      return NextResponse.json(appointment);
    } catch (error) {
      console.error("error!", error);
      return NextResponse.json(
        {
          error: "failed to get categories",
        },
        {
          status: 500,
        }
      );
    }
  }