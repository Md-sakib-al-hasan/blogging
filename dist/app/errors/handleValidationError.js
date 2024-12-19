"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
//handlValdationErrro
const handleValidationError = (err) => {
    const errorSources = Object.values(err.errors).map((val) => {
        return {
            path: val === null || val === void 0 ? void 0 : val.path,
            message: val === null || val === void 0 ? void 0 : val.message,
        };
    });
    const statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    return {
        statusCode,
        message: 'Validation Error',
        errorSources,
    };
};
exports.default = handleValidationError;
