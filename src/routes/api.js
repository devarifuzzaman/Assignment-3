import express from "express";
const router = express.Router();
import * as UsersController from "../controllers/UsersController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";


// Users
router.post("/registration",UsersController.Registration);
router.get("/allUserProfile",UsersController.AllProfileDetails);
router.post("/login",UsersController.Login)
router.post("/logout",AuthMiddleware,UsersController.LogOut)
router.get("/profileDetails",AuthMiddleware,UsersController.ProfileDetails);
router.post("/profileUpdate",AuthMiddleware,UsersController.UpdateProfile);
router.delete('/deleteUser',AuthMiddleware,UsersController.DeleteUser);


// Forget Password 
router.get("/emailVerify/:email",UsersController.EmailVerification);
router.get("/codeVerify/:email/:code",UsersController.CodeVerification);
router.post("/resetPassword",UsersController.ResetPassword); 






export default router;