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
exports.BlogController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendRequest_1 = __importDefault(require("../../utils/sendRequest"));
const blog_service_1 = require("./blog.service");
const sendRequestwithoutmongoosedata_1 = __importDefault(require("../../utils/sendRequestwithoutmongoosedata"));
//create blog with user id
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { useremail } = req.user;
    const result = yield blog_service_1.BlogServices.createBlogIntoDB(req.body, useremail);
    (0, sendRequest_1.default)(res, {
        success: true,
        message: 'Blog created successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: result,
    });
}));
//update blog with token and info
const updateSingleBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield blog_service_1.BlogServices.updateSingleBlogIntoDB(req.body, id);
    (0, sendRequest_1.default)(res, {
        success: true,
        message: 'Blog updated successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
//deleted Blog by user
const deleteSingleBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield blog_service_1.BlogServices.deletedSingleBlogIntoDB(id);
    (0, sendRequestwithoutmongoosedata_1.default)(res, {
        success: true,
        message: 'Blog deleted successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
}));
//get all block for public api
const getallBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.BlogServices.getallBlogfromDB(req.query);
    (0, sendRequest_1.default)(res, {
        success: true,
        message: 'Blog updated successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: result,
    });
}));
exports.BlogController = {
    createBlog,
    updateSingleBlog,
    deleteSingleBlog,
    getallBlog,
};
