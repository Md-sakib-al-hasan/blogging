"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendRequestWithData = (res, data) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        statusCode: data.statusCode,
    });
};
exports.default = sendRequestWithData;
