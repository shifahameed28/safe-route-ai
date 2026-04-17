"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seed() {
    const areas = [
        { area: "Vashi", lat: 19.0771, lng: 72.9986, risk: 45 },
        { area: "Nerul", lat: 19.0330, lng: 73.0196, risk: 50 },
        { area: "Belapur", lat: 19.0222, lng: 73.0413, risk: 60 },
        { area: "Kharghar", lat: 19.0473, lng: 73.0699, risk: 55 },
        { area: "Kamothe", lat: 19.0166, lng: 73.0965, risk: 65 },
        { area: "Panvel", lat: 18.9894, lng: 73.1175, risk: 73 },
    ];
    for (const a of areas) {
        await prisma.areaRisk.create({ data: a });
    }
    console.log("Navi Mumbai area risks seeded");
}
seed().finally(() => prisma.$disconnect());
