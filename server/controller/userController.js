import brcypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userSchema.js"


// @desc register a user (first time registration)
// @route  POST api/user
// @access  public
export const registerUser=asyncHandler(async(req,res,next)=>{
    const {name,email,password}=req.body;
    // if something doesn't exist
    if(!name || !email || !password ){
        res.status(400);
        const err=new Error("Please Enter All Fields");
        next(err);
        return;
    }
    // check if user already exist or not;
    const existingUser=await User.findOne({email});
    if(existingUser){
        res.status(400);
        const err=new Error("User Already Exists");
        next(err);
        return;
    }
    // hash password
    const salt=await brcypt.genSalt(10);
    const hashedPassword=await brcypt.hash(password,salt);
    

    const createdUser=await User.create({
        name,
        email,
        password:hashedPassword,
    })
    if(createdUser){
        res.status(201).json({
            result:"success",
            message:"new user registered",
            _id:createdUser.id,
            name:createdUser.name,
            email:createdUser.email,
            token:generateToken(createdUser._id)
        })
    }
    else{
        const err=new Error("Invalid User Details");
        next(err);
    }

})

// @desc login and authincate  a user 
// @route  POST api/user/login
// @access  public
export const loginUser=asyncHandler(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        const err=new Error("Fill all the Details");
        next(err);
        return
    } 
    // check if user exists
    const user=await User.findOne({email});
    if(!user){
        const err=new Error("User doesn't Exist");
        next(err);
        return
    } 

    if(user && (await brcypt.compare(password,user.password))){
          res.status(200).json({
            result:"success",
            message:"User Successfully Logged in",
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
          })
    }else{
        res.status(404);
        const err=new Error("Invalid Creditinals");
        next(err);
    }
})
// @desc gell all goals of a user
// @route  GET api/user/me
// @access  public
export const getGoals=asyncHandler(async(req,res,next)=>{
    
    const {_id,name,email}=req.user;
    res.status(200).json({
        result:"success",
        _id,
        name,
        email,
    })
})


function generateToken(id){
    return  jwt.sign({id},process.env.JWT_SECRET);
}