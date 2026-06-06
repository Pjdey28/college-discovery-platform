"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const predictor_controller_1 = require("../controllers/predictor.controller");
const router = (0, express_1.Router)();
router.post("/", predictor_controller_1.predictCollege);
exports.default = router;
