import axios from "axios";

const createGoal=async(text,token)=>{
   
    const config={
        headers:{
          Authorization:`Bearer ${token}`
        }
    }
    try{
        const response=await axios.post("/api/goals",{text},config);
        
        return response.data;
    }
    catch(err){
       
        return err.response;
    }
    
}

const getallGoals=async(token)=>{
    const config={
        headers:{
          Authorization:`Bearer ${token}`
        }
    }
    try{
        const response=await axios.get("/api/goals",config);
       
        return response.data;
    }
    catch(err){
     
        return err.response;
    }
    
}

const deleteGoal=async(id,token)=>{
    console.log(id);
    const config={
        headers:{
          Authorization:`Bearer ${token}`
        }
    }
    try{
        const response=await axios.delete("/api/goals/"+id,config);
       
        return response.data;
    }
    catch(err){
     
        return err.response;
    }
    
}
const goalServices={
    createGoal,
    getallGoals,
    deleteGoal
}

export default goalServices;