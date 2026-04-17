"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../utils/prisma");
const router = (0, express_1.Router)();
// Create report
router.post("/", async (req, res) => {
    try {
        const { lat, lng, category, severity } = req.body;
        const report = await prisma_1.prisma.report.create({
            data: {
                lat,
                lng,
                category,
                severity,
                description: "",
            },
        });
        res.json({ message: "Report saved", report });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
// Get reports
router.get("/", async (req, res) => {
    const reports = await prisma_1.prisma.report.findMany();
    res.json(reports);
});
exports.default = router;
