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
exports.BlogServices = void 0;
const user_modul_1 = __importDefault(require("../User/user.modul"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const blog_model_1 = __importDefault(require("./blog.model"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
//create Blog into the database
const createBlogIntoDB = (payload, useremail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_modul_1.default.findOne({ email: useremail }).select('_id');
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'you are an authorised to create blog !');
    }
    payload.author = user._id;
    const result = (yield blog_model_1.default.create(payload)).populate('author');
    return result;
});
//update Blog into the database
const updateSingleBlogIntoDB = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        throw new Error(`Pleace Enter id`);
    }
    const result = yield blog_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    }).populate('author');
    if (!result) {
        throw new Error(`Blog with id ${id} not found.`);
    }
    return result;
});
//delete blog by user into the database
const deletedSingleBlogIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        throw new Error(`Pleace Enter id`);
    }
    const result = yield blog_model_1.default.findByIdAndDelete(id);
    if (!result) {
        throw new Error(`Blog with id ${id} not found.`);
    }
    return result;
});
//get all blog from databse
const getallBlogfromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const Blogquery = new QueryBuilder_1.default(blog_model_1.default.find().populate('author'), query)
        .search(['title', 'content'])
        .filter()
        .sort();
    const result = yield Blogquery.modelQuery;
    return result;
});
exports.BlogServices = {
    createBlogIntoDB,
    updateSingleBlogIntoDB,
    deletedSingleBlogIntoDB,
    getallBlogfromDB,
};
