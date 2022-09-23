import asyncHandler from "express-async-handler"
import Goals from "../models/goalSchema.js";
import User from "../models/userSchema.js"
// @desc  get all goals of a user
// @route  GET  api/goals
// @access   private
export const getGoals= asyncHandler (async(req,res)=>{

    const allGoals=await Goals.find({user:req.user.id});
    // user:req.user.id --> it basically says that find user whose user_property matchs id of the user
    // you can do same for text  text:"this is prathamesh first text"  
    if(allGoals){
        res.status(200).json({
            goals:allGoals
        })
    }
    else{
        res.status(400);
        const err=new Error("Couldn't found any goal");
        next(err);
    }
})

// @desc  set a  goal of a user
// @route  POST  api/goals
// @access private
export const setGoals=asyncHandler (async(req,res,next)=>{

    if(!req.body.text){
       res.status(400);
       const err=new Error("NO Text ENTERED")
       next(err);
       return;
    }
    const goal=await Goals.create({
        user:req.user.id,
        text:req.body.text
    })

    if(goal){
        res.status(201).json({result:"success",message:"Goal Successfully Created",goal})
    }
    else{
        res.status(400);
        const err=new Error("Couldn't a Create Goal");
        next(err);
    }


    
})

// @desc  update a goal of a user
// @route  PUT  api/goals/:id
// @access private
export const updateGoals= asyncHandler (async(req,res,next)=>{
    const id=req.params.id
    if(!req.body.text){
        res.status(400);
        const err=new Error("No Text Entered To Update");
        next(err);
        return
    }
    const goal=await Goals.findById(id);
    // also check is user exists or not
    const user=await User.findById(req.user.id)
    if(!user){
        res.status(404);
        const err=new Error("No user Exist");
        next(err);
        return
    }
    // check the goaluser id is equal with  user id
    if(goal.user.toString()!==user.id){
        res.status(401);
        const err=new Error("Not Authorized");
        next(err);
    }
   
    if(!goal){
        res.status(400);
        const err=new Error("Couldn't Find Goal To Update");
        next(err);
        return
    }

    const UpdatedGoal=await Goals.findByIdAndUpdate(id,req.body,{new:true});
    if(UpdatedGoal){
         res.status(201).json({
            result:"success",
            message:"Updated Goal Succesfully",

         })
    }


})

// @desc   delete a goal of a user
// @route  Delete api/goals/:id
// @access  private
export const deleteGoals=asyncHandler (async(req,res)=>{ 
    const id=req.params.id
    console.log(id)
    const GoaltobeDeleted=await Goals.findById(id);
    if(!GoaltobeDeleted){
        res.status(400);
        const err=new Error("Couldn't Find Goal To Delete");
        next(err);
        return
    }
    const user= await User.findById(req.user.id);
    if(!user){
        res.status(404);
        const err=new Error("No User found");
        next(err);
        return
    }
    if(user.id!==GoaltobeDeleted.user.toString()){
        res.status(401);
        const err=new Error("No Authorization");
        next(err);
        return
    }
    await GoaltobeDeleted.remove();
    res.status(201).json({id:req.params.id});

})