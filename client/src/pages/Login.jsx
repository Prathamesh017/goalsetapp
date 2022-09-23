import React, { useEffect, useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useDispatch,useSelector } from 'react-redux';
import {toast} from "react-toastify"
import {reset} from "../features/auth/authSlice.js"
import { login } from '../features/auth/authSlice.js';
import {useNavigate} from "react-router-dom";
import Spinner from '../components/Spinner.jsx';

function Login() {
const [formData,setFormData]=useState({
  email:"",
  password:"",
})
const {email,password}=formData;

const navigate=useNavigate();
const dispatch=useDispatch();
const {user,isLoading,isSuccess,message,isError}=useSelector((state)=>{return state.auth})




useEffect(()=>{
if(isError){
  console.log("Erroris ",isError);
  toast.error(message);
}

if(isSuccess){
  navigate("/");
}
dispatch(reset());
},[user,isLoading,isSuccess,message,isError,dispatch,navigate])
const onSubmit=(e)=>{
e.preventDefault();
const userData={
  email,
  password,
}
dispatch(login(userData))
}
useEffect(()=>{
 console.log(formData);
},[formData])


const onChange=(target)=>{
  const {name,value}=target;
  setFormData((data)=>({...data,[name]:value}))
}
if(isLoading){
  return <Spinner></Spinner>
}
  return (
    <div className='flex flex-col  gap-4 w-4/5  md:w-1/2 items-center  p-2'>
      <div className='flex space-x-1 '>
        <FaSignInAlt  size={35} ></FaSignInAlt > <h1 className='text-xl md:text-3xl font-bold'>Login</h1>
      </div>
      <div>
        <h2 className='text-base md:text-2xl text-red-800'>Login and Set Goals</h2>
      </div>
      <div className='w-4/5'>
        <form onSubmit={onSubmit}>
          <div className='flex flex-col gap-2'>
          <input type="email"  onChange={(e)=>{onChange(e.target)}} value={email} name="email" placeholder='Enter your email' className='border border-slate-400  px-0 md:p-1'></input>
          <input type="password"  onChange={(e)=>{onChange(e.target)}} value={password} name="password" placeholder='Enter your password' className='border border-slate-400  px-0 md:p-1'></input>
          <div className='w-full bg-slate-900 p-0 md:p-1 text-center text-white mt-2'>
            <button type="submit" >Submit</button>
          </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login