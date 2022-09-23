import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalServices from "./goalService";

const initialState={
    goal:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}


export const createGoal=createAsyncThunk("/goal/createGoal",async(text,thunkApi)=>{
    const token=thunkApi.getState().auth.user.token;
    const response=await goalServices.createGoal(text,token);
    if(response.status===500){
        return thunkApi.rejectWithValue(response.data.message);
         
     }
     
     return response;
})
export const getGoals=createAsyncThunk("/goal/getGoals",async(_,thunkApi)=>{
    const token=thunkApi.getState().auth.user.token;
    const response=await goalServices.getallGoals(token);
    if(response.status===500){
        return thunkApi.rejectWithValue(response.data.message);
         
     }
     
     return response;
})


export const deleteGoal=createAsyncThunk("/goal/deleteGoal",async(id,thunkApi)=>{
  const token=thunkApi.getState().auth.user.token;
  const response=await goalServices.deleteGoal(id,token);
  if(response.status===500){
      return thunkApi.rejectWithValue(response.data.message);
       
   }
   
   return response;
})
export const goalSlice=createSlice({
    name:"goal",
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=false
            state.message=""
            state.goal=[]
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createGoal.pending,(state)=>{
         state.isLoading=true
        })
        .addCase(createGoal.fulfilled,(state,action)=>{
          state.isLoading=false
          state.goal.push(action.payload)
          state.isSuccess=true
        })
        .addCase(createGoal.rejected,(state,action)=>{
          state.isError=true    
          state.isLoading=false
          state.isSuccess=false
          state.message=action.payload
        })


        .addCase(getGoals.pending,(state)=>{
            state.isLoading=true
           })
           .addCase(getGoals.fulfilled,(state,action)=>{ 
             state.isLoading=false
             state.goal=(action.payload)
             state.isSuccess=true
           })
           .addCase(getGoals.rejected,(state,action)=>{
             state.isError=true    
             state.isLoading=false
             state.isSuccess=false
             state.message=action.payload
           })




           .addCase(deleteGoal.pending,(state)=>{
            state.isLoading=true
           })
           .addCase(deleteGoal.fulfilled,(state,action)=>{ 
             state.isLoading=false
             state.goal=state.goal.filter((goal)=>{
                  return goal._id!==action.payload.id
             })
             state.isSuccess=true
           })
           .addCase(deleteGoal.rejected,(state,action)=>{
             state.isError=true    
             state.isLoading=false
             state.isSuccess=false
             state.message=action.payload
           })
    }


})

export const {reset}=goalSlice.actions

export default goalSlice.reducer;