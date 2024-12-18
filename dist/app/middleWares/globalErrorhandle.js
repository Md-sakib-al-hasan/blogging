"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorhandle = (err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: 'in not set',
        error: err,
        stack: err.stack,
    });
};
exports.default = globalErrorhandle;
