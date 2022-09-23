import mongoose from "mongoose";

const connectDB=async()=>{
    try{
     const conn=await mongoose.connect(process.env.MONGO);
     console.log(`Database Connect ${conn.connection.host}` .cyan.underline);
    }catch(e){
        console.log("Database is not connected");
        process.exit(1);
    }
}

export default connectDB;