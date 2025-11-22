"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const auth_service_1 = require("./auth.service");
const auth_model_1 = require("./auth.model");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const registerUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield auth_model_1.User.isUserExistByEmail(email);
    if (user) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            message: 'User already exists',
            statusCode: 409,
            data: null
        });
    }
    const result = yield auth_service_1.AuthServices.registerUser(req.body);
    //extract fields
    const filteredData = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
    };
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'User registered successfully',
        statusCode: 201,
        data: filteredData
    });
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.loginUser(req.body);
    console.log(result);
    const { accessToken } = result;
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'User logged in successfully',
        statusCode: 200,
        data: { accessToken }
    });
}));
const getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.getAllUser();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Users retrieved successfully',
        statusCode: 200,
        data: result
    });
}));
const updateUserStatusController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { isBlocked } = req.body;
    const result = yield auth_service_1.AuthServices.updateUserStatus(id, isBlocked);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'User status updated successfully',
        statusCode: 200,
        data: result
    });
}));
exports.AuthControllers = {
    registerUser,
    loginUser,
    getAllUser,
    updateUserStatusController,
};
