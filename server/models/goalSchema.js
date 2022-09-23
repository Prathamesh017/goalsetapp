import mongoose from "mongoose";

const goalSchema= new mongoose.Schema({
    user:{
       type:mongoose.Schema.Types.ObjectId, 
       required:true,
       ref:'user'
    },
    text:{
        type:String,
        required:[true,"Please Enter a Text"]
    }
})

export default mongoose.model("Goals",goalSchema);