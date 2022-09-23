import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import authServices from './authService';
const user=JSON.parse(localStorage.getItem("user"));
const initialState={
    user:user?user:null,
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

// user registration
export const register=createAsyncThunk("auth/register",async(userData,thunkApi)=>{
  
         const response=await authServices.register(userData);
         if(response.status===500){
            
          return thunkApi.rejectWithValue(response.data.message);
           
       }
     
       return response;
       

})
export const logout=createAsyncThunk("auth/logout",async()=>{
        await authServices.logout();
   
})

export const login=createAsyncThunk("auth/login",async(userData,thunkApi)=>{
    
    
        const response=await authServices.login(userData);
        if(response.status===500){
            
           return thunkApi.rejectWithValue(response.data.message);
            
        }
        
        return response;
    
    

})
export const authSlice=createSlice({
    name:"auth",
    initialState,
    // reducers are synchronous functions 
    reducers:{
        reset:(state)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=false
            state.message=""
        },
    },
    // extraReducers are asynchronous functions
    extraReducers:(builder)=>{
          builder
          .addCase(register.pending,(state)=>{
           state.isLoading=true
          })
          .addCase(register.fulfilled,(state,action)=>{
            state.isLoading=false
            state.user=action.payload
            state.isSuccess=true
          })
          .addCase(register.rejected,(state,action)=>{
             state.isError=true    
            state.isLoading=false
            state.user=null
            state.isSuccess=false
            state.message=action.payload
          })
          .addCase(login.pending,(state)=>{
            state.isLoading=true
           })
           .addCase(login.fulfilled,(state,action)=>{
             state.isLoading=false
             state.user=action.payload
             state.isSuccess=true
           })
           .addCase(login.rejected,(state,action)=>{
              state.isError=true    
             state.isLoading=false
             state.user=null
             state.isSuccess=false
             state.message=action.payload
           })
          .addCase(logout.fulfilled,(state)=>{
               state.user=null
          })

    }

})
export const {reset}=authSlice.actions;
export default authSlice.reducer;