"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorhandle_1 = __importDefault(require("./app/middleWares/globalErrorhandle"));
const notFound_1 = __importDefault(require("./app/middleWares/notFound"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
//application routes
app.use('/api', routes_1.default);
//for testing purpose
app.use('/', (req, res) => {
    res.status(200).json({
        message: 'Successfully woke server',
    });
});
// not found
app.use(notFound_1.default);
//globalErrorhandl
app.use(globalErrorhandle_1.default);
exports.default = app;
