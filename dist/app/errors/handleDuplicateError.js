"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = require("http-status-codes");
//handle DuplicatedError
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSources = [
        {
            path: '',
            message: `${extractedMessage} is already exists`,
        },
    ];
    const statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    return {
        statusCode,
        message: 'Invalid email',
        errorSources,
    };
};
exports.default = handleDuplicateError;
