-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "severity" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);
