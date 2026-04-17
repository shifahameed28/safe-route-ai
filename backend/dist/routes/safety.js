"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../utils/prisma");
const router = (0, express_1.Router)();
router.get("/score", async (req, res) => {
    const { lat, lng } = req.query;
    const reports = await prisma_1.prisma.report.findMany();
    let nearby = reports.filter((r) => {
        return (Math.abs(r.lat - Number(lat)) < 0.01 &&
            Math.abs(r.lng - Number(lng)) < 0.01);
    });
    const score = Math.max(100 - nearby.length * 15, 0);
    res.json({ safetyScore: score });
});
exports.default = router;
