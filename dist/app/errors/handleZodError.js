"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
//handle Zod Error
const handleZodError = (err) => {
    const errorSources = err.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    const statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    return {
        statusCode,
        message: 'Validation Error',
        errorSources,
    };
};
exports.default = handleZodError;
