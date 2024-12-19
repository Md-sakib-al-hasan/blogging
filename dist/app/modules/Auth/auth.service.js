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
exports.AuthServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_modul_1 = __importDefault(require("../User/user.modul"));
const user_utils_1 = require("../User/user.utils");
const config_1 = __importDefault(require("../../config"));
//create token whit valide user
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_modul_1.default.isUserExistsByEmail(payload.email);
    //if the user doesn't exits
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'This user is not found !');
    }
    //if the user is blocked
    if (user === null || user === void 0 ? void 0 : user.isBlocked) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'This user is blocked ! ');
    }
    //match passworld
    if (!(yield user_modul_1.default.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Password do not matched');
    const jwtPayload = {
        useremail: user.email,
        role: user.role,
    };
    const accesstoken = (0, user_utils_1.createToken)(jwtPayload, config_1.default.jwt_secret, config_1.default.jwt_access_expires_in);
    return accesstoken;
});
exports.AuthServices = {
    loginUser,
};
