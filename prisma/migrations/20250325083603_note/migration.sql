-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "bookTimeId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_bookTimeId_fkey" FOREIGN KEY ("bookTimeId") REFERENCES "bookTime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
