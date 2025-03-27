import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { note, bookTimeId } = await req.json();
    const newNote = await prisma.note.create({
      data: {
        note,
        bookTimeId,
      },
    });
    console.log(newNote);
    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while creating the note." },
      { status: 500 }
    );
  }
};
