// all https request will be here
import axios from "axios";

const register=async(userData)=>{
    try{
        const response=await axios.post("/api/users",userData);
        // axios by default create this .data object;
        if(response.data){
            localStorage.setItem("user",JSON.stringify(response.data));
        }
        return response.data;
    }
    catch(err){
        return err.response;
    }
    
   
    
}

const logout=()=>{
    console.log("AuthService Logout");
    localStorage.removeItem("user");
}


const login=async(userData)=>{
    try{
        const response=await axios.post("/api/users/login",userData);
      
        if(response.data){
            localStorage.setItem("user",JSON.stringify(response.data));
        }
        return response.data;
    }
    catch(err){
    
        return err.response;
    }
    // axios by default create this .data object;
   
   
}
const authServices={
    register,
    logout,
    login
}

export default authServices;