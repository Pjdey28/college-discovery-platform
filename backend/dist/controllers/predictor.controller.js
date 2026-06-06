"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.predictCollege = void 0;
const db_1 = __importDefault(require("../config/db"));
const predictCollege = async (req, res) => {
    try {
        const { rank, exam, } = req.body;
        const colleges = await db_1.default.cutoff.findMany({
            where: {
                exam,
                rank: {
                    gte: Number(rank)
                }
            },
            include: {
                college: true
            },
            orderBy: {
                rank: "asc"
            },
            take: 10
        });
        res.json(colleges);
    }
    catch (error) {
        res.status(500).json({
            message: "Prediction failed"
        });
    }
};
exports.predictCollege = predictCollege;
