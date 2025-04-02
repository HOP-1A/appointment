import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  try {
    const { id } = await req.json();
    const deletedNote = await prisma.note.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(deletedNote, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while deleting the note." },
      { status: 500 }
    );
  }
};
