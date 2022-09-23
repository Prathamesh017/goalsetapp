
const errorHandler=async(err,req,res,next)=>{
    const statusCode=req.statusCode?req.statusCode:500
    res.status(statusCode).json({message:err.message})
    next();

}
export default errorHandler;
