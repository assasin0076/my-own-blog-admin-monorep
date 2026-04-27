-- CreateTable
CREATE TABLE "Stuff" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "repoLink" TEXT NOT NULL,
    "viewLink" TEXT,

    CONSTRAINT "Stuff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stuff_label_key" ON "Stuff"("label");
