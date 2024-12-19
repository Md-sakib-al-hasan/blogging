"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouters = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleWares/auth"));
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
// Allows an admin to block a user by updating the isBlocked property to true
router.patch('/users/:userId/block', (0, auth_1.default)('admin'), admin_controller_1.AdminController.BlockUser);
// Allows an admin to delete any blog by its ID
router.delete('/blogs/:id', (0, auth_1.default)('admin'), admin_controller_1.AdminController.deleteSingleBLog);
exports.AdminRouters = router;
