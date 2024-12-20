"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const user_validation_1 = require("./user.validation");
// import auth from '../../middleWares/auth';
const router = express_1.default.Router();
//create user
router.post('/register', 
// auth('admin'),
(0, validateRequest_1.default)(user_validation_1.UserValidtions.userchmeavalidations), user_controller_1.UserController.createUser);
exports.UserRoutes = router;
