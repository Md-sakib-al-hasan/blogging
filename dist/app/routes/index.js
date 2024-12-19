"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/User/user.route");
const blog_route_1 = require("../modules/Blog/blog.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const admin_route_1 = require("../modules/Admin/admin.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRouters,
    },
    {
        path: '/blogs',
        route: blog_route_1.BlogRoutes,
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRouters,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
