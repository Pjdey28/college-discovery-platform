"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviews = exports.addReview = void 0;
const db_1 = __importDefault(require("../config/db"));
const addReview = async (req, res) => {
    const { rating, comment, collegeId } = req.body;
    const review = await db_1.default.review.create({
        data: {
            rating,
            comment,
            userId: req.userId,
            collegeId
        }
    });
    res.json(review);
};
exports.addReview = addReview;
const getReviews = async (req, res) => {
    const reviews = await db_1.default.review.findMany({
        where: {
            collegeId: req.params.id
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    res.json(reviews);
};
exports.getReviews = getReviews;
