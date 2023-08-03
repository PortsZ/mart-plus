-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "tax" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);
