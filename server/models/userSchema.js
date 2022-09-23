import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter password"]
    }
})
export default mongoose.model("Users",userSchema);