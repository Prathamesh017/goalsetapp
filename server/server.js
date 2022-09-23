import express from "express";
import dotenv from "dotenv";
import router from "./routes/goalRoutes.js";
import router2 from "./routes/userRoutes.js"
import errorHandler from "./Middlewares/errorHandler.js";
import colors from "colors";
import connectDB from "./config/database.js";
import path from "path";

const app=express();
dotenv.config();
connectDB();
app.use(express.json());
const PORT=process.env.PORT||5000;

app.use("/api/goals",router);
app.use("/api/users",router2);
app.use(errorHandler);

if(process.env.NODE_ENV="production"){
  app.use(express.static(path.join(__dirname,"../client/build")));
 
    app.get("*",(req,res)=>res.send(path.resolve(__dirname,"client","build","index.html")))
  
}
app.listen(PORT,()=>{
 console.log("Server is Running");
})