import { Router } from "express";
import { prisma } from "../utils/prisma";

const router = Router();

router.get("/score", async (req, res) => {
  const { lat, lng } = req.query;

  const reports = await prisma.report.findMany();

  let nearby = reports.filter((r) => {
    return (
      Math.abs(r.lat - Number(lat)) < 0.01 &&
      Math.abs(r.lng - Number(lng)) < 0.01
    );
  });

  const score = Math.max(100 - nearby.length * 15, 0);

  res.json({ safetyScore: score });
});

export default router;
