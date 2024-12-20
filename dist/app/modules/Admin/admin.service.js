"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blog_model_1 = __importDefault(require("../Blog/blog.model"));
const user_modul_1 = __importDefault(require("../User/user.modul"));
//Allows an admin to block a user by updating the isBlocked property to true
const BlockuserIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `Pleace Enter id`);
    }
    const user = yield user_modul_1.default.findById(id);
    if ((user === null || user === void 0 ? void 0 : user.role) !== 'user') {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, `The user isn't exities`);
    }
    const result = yield user_modul_1.default.findByIdAndUpdate(id, { isBlocked: true });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, `Blog with id ${id} not found.`);
    }
    return result;
});
//Allows an admin to delete any blog by its ID
const deleteBLogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `Pleace Enter id`);
    }
    const result = yield blog_model_1.default.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, `Blog with id ${id} not found.`);
    }
    return result;
});
exports.AdminService = {
    BlockuserIntoDB,
    deleteBLogFromDB,
};
