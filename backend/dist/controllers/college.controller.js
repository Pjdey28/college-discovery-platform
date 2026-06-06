"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrendingColleges = exports.getCollegeById = exports.getColleges = void 0;
const db_1 = __importDefault(require("../config/db"));
const getColleges = async (req, res) => {
    const { search, state, minFees, maxFees, } = req.query;
    const colleges = await db_1.default.college.findMany({
        where: {
            name: search ? {
                contains: String(search),
                mode: "insensitive"
            } : undefined,
            state: state
                ? String(state)
                : undefined,
            fees: {
                gte: req.query.minFees
                    ? Number(req.query.minFees)
                    : undefined,
                lte: req.query.maxFees
                    ? Number(req.query.maxFees)
                    : undefined
            },
            rating: {
                gte: req.query.rating
                    ? Number(req.query.rating)
                    : undefined
            }
        },
        take: 100,
    });
    res.json(colleges);
};
exports.getColleges = getColleges;
const getCollegeById = async (req, res) => {
    const { id } = req.params;
    const college = await db_1.default.college.findUnique({
        where: { id: id },
        include: {
            courses: true,
            reviews: true,
            placements: true,
            cutoffs: true
        },
    });
    if (!college) {
        return res.status(404).json({
            message: "College not found",
        });
    }
    res.json(college);
};
exports.getCollegeById = getCollegeById;
const getTrendingColleges = async (req, res) => {
    const colleges = await db_1.default.college.findMany({
        orderBy: {
            rating: "desc"
        },
        take: 6
    });
    res.json(colleges);
};
exports.getTrendingColleges = getTrendingColleges;
