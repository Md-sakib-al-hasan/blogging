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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_constant_1 = require("./user.constant");
const config_1 = __importDefault(require("../../config"));
//create useshema
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'The name field is required.'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'The email field is required.'],
        unique: true,
        validate: {
            validator: function (value) {
                return user_constant_1.emailValidationRegex.test(value);
            },
            message: 'Please provide a valid email address.',
        },
    },
    password: {
        type: String,
        required: [true, 'The password field is required.'],
        minlength: [6, 'Password must be at least 6 characters long.'],
        select: false,
    },
    role: {
        type: String,
        enum: {
            values: user_constant_1.roletype,
            message: "Role must be either 'admin' or 'user'.",
        },
        default: 'user',
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
//plant passworld convert to has passworld
userSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_rounds));
    });
});
//instance methods for checking if passwords are matched
userSchema.statics.isPasswordMatched = function (plainTextPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plainTextPassword, hashedPassword);
    });
};
//instance methods for checking if the user exist
userSchema.statics.isUserExistsByEmail = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield User.findOne({ email }).select('+password');
    });
};
//create user model
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
