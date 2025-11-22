import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controler";
import auth from "../../middleware/auth";

const router = Router();

router.post('/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser
);
router.post(
  '/register',
  validateRequest(AuthValidation.registerValidationSchema),
  AuthControllers.registerUser,
);
router.get('/users',
  auth("admin","user"),
  AuthControllers.getAllUser
)
router.patch('/users/:id',
  AuthControllers.updateUserStatusController
)

export const authRoutes = router;