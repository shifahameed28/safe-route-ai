import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import authRoutes from "./routes/auth";
import reportRoutes from "./routes/reports";
import safetyRoutes from "./routes/safety";
import geocodeRoutes from "./routes/geocode";
import areaRiskRoutes from "./routes/arearisk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.get("/", (req, res) => {
  res.json({ message: "Backend is running ✅" });
});

console.log("Loading geocode routes...");
app.use("/api/geocode", geocodeRoutes);
console.log("Geocode routes loaded");

app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/geocode", geocodeRoutes);
app.use("/api/arearisk", areaRiskRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
