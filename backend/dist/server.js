"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const reports_1 = __importDefault(require("./routes/reports"));
const geocode_1 = __importDefault(require("./routes/geocode"));
const arearisk_1 = __importDefault(require("./routes/arearisk"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.get("/", (req, res) => {
    res.json({ message: "Backend is running ✅" });
});
app.use("/api/auth", auth_1.default);
app.use("/api/reports", reports_1.default);
app.use("/api/geocode", geocode_1.default);
app.use("/api/arearisk", arearisk_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
