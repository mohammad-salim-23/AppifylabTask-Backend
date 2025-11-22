"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../errors/AppError"));
const globalErrorHandler = (err, req, res, next) => {
    console.error(err);
    if (err instanceof AppError_1.default) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            statusCode: err.statusCode,
            data: null,
        });
    }
    // fallback for unknown errors
    res.status(500).json({
        success: false,
        message: err.message || "Something went wrong!",
        statusCode: 500,
        data: null,
    });
};
exports.default = globalErrorHandler;
