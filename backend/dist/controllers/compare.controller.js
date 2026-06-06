"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareColleges = void 0;
const db_1 = __importDefault(require("../config/db"));
const compareColleges = async (req, res) => {
    const { ids } = req.body;
    const colleges = await db_1.default.college.findMany({
        where: {
            id: {
                in: ids,
            },
        },
    });
    res.json(colleges);
};
exports.compareColleges = compareColleges;
