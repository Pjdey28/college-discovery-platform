"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAnswer = exports.getDiscussions = exports.createDiscussion = void 0;
const db_1 = __importDefault(require("../config/db"));
const createDiscussion = async (req, res) => {
    const { title, content, } = req.body;
    const discussion = await db_1.default.discussion.create({
        data: {
            title,
            content,
            userId: req.userId
        }
    });
    res.json(discussion);
};
exports.createDiscussion = createDiscussion;
const getDiscussions = async (req, res) => {
    const discussions = await db_1.default.discussion.findMany({
        include: {
            answers: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    res.json(discussions);
};
exports.getDiscussions = getDiscussions;
const addAnswer = async (req, res) => {
    const { content } = req.body;
    const answer = await db_1.default.answer.create({
        data: {
            content,
            discussionId: req.params.id
        }
    });
    res.json(answer);
};
exports.addAnswer = addAnswer;
