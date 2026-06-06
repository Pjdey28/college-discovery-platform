"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSavedColleges = exports.saveCollege = void 0;
const db_1 = __importDefault(require("../config/db"));
const saveCollege = async (req, res) => {
    const { collegeId } = req.body;
    const save = await db_1.default.savedCollege.create({
        data: {
            userId: req.userId,
            collegeId
        }
    });
    res.json(save);
};
exports.saveCollege = saveCollege;
const getSavedColleges = async (req, res) => {
    const colleges = await db_1.default.savedCollege.findMany({
        where: {
            userId: req.userId
        },
        include: {
            college: true
        }
    });
    res.json(colleges);
};
exports.getSavedColleges = getSavedColleges;
