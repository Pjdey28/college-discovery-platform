"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const college_routes_1 = __importDefault(require("./routes/college.routes"));
const compare_routes_1 = __importDefault(require("./routes/compare.routes"));
const predictor_routes_1 = __importDefault(require("./routes/predictor.routes"));
const saved_routes_1 = __importDefault(require("./routes/saved.routes"));
const discussion_routes_1 = __importDefault(require("./routes/discussion.routes"));
const review_routes_1 = __importDefault(require("./routes/review.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.get("/", (_, res) => {
    res.json({
        success: true,
        message: "College Discovery API"
    });
});
app.use("/api/auth", auth_routes_1.default);
app.use("/api/colleges", college_routes_1.default);
app.use("/api/compare", compare_routes_1.default);
app.use("/api/predictor", predictor_routes_1.default);
app.use("/api/saved", saved_routes_1.default);
app.use("/api/discussions", discussion_routes_1.default);
app.use("/api/reviews", review_routes_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
