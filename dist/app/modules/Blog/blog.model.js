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
const blog_constant_1 = require("./blog.constant");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
// create blogSchema for blog
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'The title field is required.'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'The content field is required.'],
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'The author field is required.'],
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
// is same user access
blogSchema.statics.isOwnUser = function (email, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findById(id)
            .select('author')
            .populate('author', 'email -_id');
        if (!user) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, `Blog with id ${id} not found.`);
        }
        if (user && user.author && user.author.email === email) {
            return true;
        }
        return false;
    });
};
//remove files in res in means  some filed is hidden
blogSchema.set('toJSON', {
    transform: function (doc, ret) {
        blog_constant_1.BlogHiddenfelds.forEach((field) => {
            delete ret[field];
        });
        return ret;
    },
});
// Create and export the Blog model
const Blog = (0, mongoose_1.model)('Blog', blogSchema);
exports.default = Blog;
