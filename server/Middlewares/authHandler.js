import jwt from "jsonwebtoken"
import User from "../models/userSchema.js"
export const authHandler=async (req,res,next)=>{
let token;

try {
    

if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    token=req.headers.authorization.split(" ")[1];
    //we got the token,now we need to get the id to find the appropriate user
    const decoded=jwt.verify(token,process.env.JWT_SECRET); 
    
    // find the user but we don't need password just name and email are enough
    const findUser=await User.findById(decoded.id).select("-password");
    req.user=findUser;
    next();
   
}
}
catch (error) {
    // console.log(token);
    res.status(403);
    const err=new Error("Not Authorized");
    next(err);
}
if(!token){
    res.status(401);
    const err=new Error("Not Authorized No Token");
    next(err);
}
}