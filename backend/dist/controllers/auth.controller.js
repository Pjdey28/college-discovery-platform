"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../config/db"));
const jwt_1 = require("../utils/jwt");
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await db_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await db_1.default.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        const token = (0, jwt_1.generateToken)(user.id);
        res.status(201).json({
            token,
            user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Registration failed",
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }
        const match = await bcryptjs_1.default.compare(password, user.password);
        if (!match) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }
        const token = (0, jwt_1.generateToken)(user.id);
        res.json({
            token,
            user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Login failed",
        });
    }
};
exports.login = login;
const me = async (req, res) => {
    const user = await db_1.default.user.findUnique({
        where: {
            id: req.userId
        }
    });
    res.json(user);
};
exports.me = me;
