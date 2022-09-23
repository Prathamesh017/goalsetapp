import express from "express";
import {loginUser, registerUser,getGoals} from "../controller/userController.js"
import { authHandler } from "../Middlewares/authHandler.js";
const router=express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(authHandler,getGoals);




export default router;

