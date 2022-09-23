import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import GoalForm from '../components/GoalForm';
import Goals from '../components/Goals';
import {getGoals } from '../features/goals/goalSlice';

function Dashboard() {
  const {user}  =useSelector((state)=>{return state.auth});
  const {goal}=useSelector((state)=>{return state.goal});
  const navigate=useNavigate();
  const dispatch=useDispatch();

  
  

  useEffect(()=>{
    if(!user){
      navigate("/login");
    }
    
    dispatch(getGoals());
    
    
    
    
    
  },[user,navigate,dispatch,goal]);
  const {goals}=goal?goal:undefined;
  return (
    <>
    <div className='flex flex-col  gap-4 w-4/5  md:w-1/2 items-center  p-2 '>
      <h1 className='text-xl md:text-3xl font-bold capitalize'>Welcome {user.name}</h1>
      <h1 className='text-base md:text-2xl text-red-800'>Goals</h1>
      <GoalForm></GoalForm>
      <Goals goals={goals}></Goals>
     
      </div>
    </>
  )
}

export default Dashboard



