import express from "express";
import { getGoals,setGoals,updateGoals,deleteGoals} from "../controller/goalController.js";
import { authHandler } from "../Middlewares/authHandler.js";
const router=express.Router();

router.route("/").get(authHandler,getGoals).post(authHandler,setGoals);
router.route("/:id").put(authHandler,updateGoals).delete(authHandler,deleteGoals);

export default router;