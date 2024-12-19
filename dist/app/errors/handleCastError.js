"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
//hanlde CastError
const handleCastError = (err) => {
    const errorSources = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    const statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    return {
        statusCode,
        message: 'CastError',
        errorSources,
    };
};
exports.default = handleCastError;
