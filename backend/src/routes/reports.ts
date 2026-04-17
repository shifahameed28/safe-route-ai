import { Router } from "express";
import { prisma } from "../utils/prisma";

const router = Router();

// Create report
router.post("/", async (req, res) => {
  try {
    const { lat, lng, category, severity } = req.body;

    const report = await prisma.report.create({
      data: {
        lat,
        lng,
        category,
        severity,
        description: "",
      },
    });

    res.json({ message: "Report saved", report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// Get reports
router.get("/", async (req, res) => {
  const reports = await prisma.report.findMany();
  res.json(reports);
});

export default router;
