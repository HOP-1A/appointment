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

export const DELETE = async (req: Request) => {
  try {
    const { note, bookTimeId } = await req.json();
    const deleteNote = await prisma.note.delete({
      where: {
        id: note,
        bookTimeId,
      },
    });

    console.log("Note deleted: ", deleteNote);
    return NextResponse.json(deleteNote, { status: 200 });
  } catch (error) {
    console.error("Error while deleting note: ", error);
    return NextResponse.json(
      { error: "Unable to delete the note." },
      { status: 500 }
    );
  }
};
