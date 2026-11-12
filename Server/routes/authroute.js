import express from "express";
import { authMiddleware, login, logout, register } from "../controllers/authcontrol.js";
import User from "../model/User.js";


const router = express.Router();

router.post("/register", register);
router.post("/login",login)
router.post("/logout",logout)



router.get("/checkAuth",authMiddleware,(req,res)=>{
  const user= req.user
  res.status(200).json({
    success:true,
    message:"Authrosized user",
    // user:req.user
    user
  })
})
export default router;
