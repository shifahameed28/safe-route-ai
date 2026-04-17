-- CreateTable
CREATE TABLE "AreaRisk" (
    "id" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "risk" INTEGER NOT NULL,

    CONSTRAINT "AreaRisk_pkey" PRIMARY KEY ("id")
);
