import express from "express";
const router = express.Router();
import * as UsersController from "../controllers/UsersController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";


// Users
router.post("/registration",UsersController.Registration);
router.post("/login",UsersController.Login)
router.get("/profileDetails",AuthMiddleware,UsersController.ProfileDetails);
router.post("/profileUpdate",AuthMiddleware,UsersController.UpdateProfile);
router.get("emilVerify",UsersController.EmailVerification);
router.post("/codeVerify",UsersController.CodeVerification);
router.post("/resetPassword",UsersController.ResetPassword);






export default router;