"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compare_controller_1 = require("../controllers/compare.controller");
const router = (0, express_1.Router)();
router.post("/", compare_controller_1.compareColleges);
exports.default = router;
