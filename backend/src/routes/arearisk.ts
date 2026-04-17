import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const data = await prisma.areaRisk.findMany();
  res.json(data);
});

export default router;
