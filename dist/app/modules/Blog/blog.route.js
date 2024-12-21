"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const blog_controller_1 = require("./blog.controller");
const auth_1 = __importDefault(require("../../middleWares/auth"));
const router = express_1.default.Router();
//create blog
router.post('/', (0, auth_1.default)('user'), (0, validateRequest_1.default)(blog_validation_1.BlogValidtions.blogValidationSchema), blog_controller_1.BlogController.createBlog);
//update blog by user
router.patch('/:id', (0, auth_1.default)('user'), (0, validateRequest_1.default)(blog_validation_1.BlogValidtions.IdvalidationSchema), (0, validateRequest_1.default)(blog_validation_1.BlogValidtions.blogUpdateValidationSchema), blog_controller_1.BlogController.updateSingleBlog);
//get blog by user
router.delete('/:id', (0, auth_1.default)('user'), (0, validateRequest_1.default)(blog_validation_1.BlogValidtions.IdvalidationSchema), blog_controller_1.BlogController.deleteSingleBlog);
//get all blog it is public api
//it is a public Api
router.get('/', blog_controller_1.BlogController.getallBlog);
exports.BlogRoutes = router;
