"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const q = req.query.q;
        if (!q) {
            return res.json([]);
        }
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5`;
        const response = await fetch(url, {
            headers: {
                "User-Agent": "SafeRouteAI/1.0 (student project)",
            },
        });
        const text = await response.text();
        // DEBUG
        if (text.startsWith("<")) {
            console.error("Nominatim returned XML instead of JSON");
            return res.json([]);
        }
        const data = JSON.parse(text);
        res.json(data);
    }
    catch (err) {
        console.error("Geocode error:", err);
        res.json([]);
    }
});
exports.default = router;
