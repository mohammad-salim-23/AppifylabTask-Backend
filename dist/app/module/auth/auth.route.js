"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controler_1 = require("./auth.controler");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controler_1.AuthControllers.loginUser);
router.post('/register', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.registerValidationSchema), auth_controler_1.AuthControllers.registerUser);
router.get('/users', (0, auth_1.default)("admin", "user"), auth_controler_1.AuthControllers.getAllUser);
router.patch('/users/:id', auth_controler_1.AuthControllers.updateUserStatusController);
exports.authRoutes = router;
