import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../model/User.js";
import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser"

//REGISTER
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashpassword });
    await newUser.save();
    res.status(200).json({success:true, message: "Register success" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success:false,message: "Register failed" });
  }
};


//login
export const login=async (req,res)=>{
 const {email,password,}=req.body
 try {
    const checkUser=await User.findOne({email})
    if(!checkUser){
        return res.status(404).json({success:false,message:"User dosent exist"})
    }
    const checkPassword=await bcrypt.compare(password,checkUser.password)
    if(!checkPassword){
        return res.status(404).json({success:false,message:"password incorrect"})
    }

    const token=jwt.sign({id:checkUser._id,
        role:checkUser.role,
        email:checkUser.email,
        username:checkUser.username
    },"CLIENT_SECRET_KEY",{expiresIn:"1h"})

    
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
    });
    
    return res.json({success:true,message:"Logged in succesfully",user:{
      username:checkUser.username,
      id:checkUser._id,
        role:checkUser.role,  
        email:checkUser.email
    }})
 } catch (e) {   
    console.log(e);
    res.status(500).json({ message: "Login failed" });
  }



}




export const logout=(req,res)=>{
  res.clearCookie('token').json({
    success:true,
    message:"UnAuthorised User"
  })
}

//AuthMiddleware

 export const authMiddleware=async(req,res,next)=>{
  console.log("Incoming cookies:", req.cookies);
  const token=req.cookies.token
  console.log("token:,",token);
  
  

  if(!token){
    return res.status(401).json({
      success:false,
      message:"UnAuthenticated user"
    })
  }

  try {
    const decoded=jwt.verify(token,"CLIENT_SECRET_KEY")
req.user=decoded
next()

  } catch (error) {
    console.log(error);

    res.status(401).json({
      success:false,
      message:"UnAuthenticated user"
      
  })
}
}
