"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendRequest = (res, data) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        statusCode: data.statusCode,
        data: data.data,
    });
};
exports.default = sendRequest;
