import React from 'react'
import { useState ,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';

import {toast} from "react-toastify";
import { createGoal } from '../features/goals/goalSlice';
function GoalForm() {
const [text,setText]=useState("");
const dispatch=useDispatch();

const {message,isError}=useSelector((state)=>{return state.goal})
const onSubmit=(e)=>{
    e.preventDefault();
    dispatch(createGoal(text));
    
}
useEffect(()=>{
  if(isError){
    toast.error(message);
  }
  

 
  },[isError,message])
  return (
    <div className='flex flex-col w-4/5'>
        <form onSubmit={onSubmit}>
        <div className=' '>
        <input type="text"   onChange={(e)=>{setText(e.target.value)}} value={text} name="goal" placeholder='Enter your Goal' className='border border-slate-400  w-full px-0 md:p-1' ></input>
        </div>
        <div className='w-full bg-slate-900 p-0 md:p-1 text-center text-white mt-2'>
            <button type="submit" >Submit</button>
          </div>
        </form>
    </div>
  )
}

export default GoalForm