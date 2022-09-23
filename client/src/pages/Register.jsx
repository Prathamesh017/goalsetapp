import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch}   from "react-redux"
import { FaUser } from 'react-icons/fa'
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
import Spinner from '../components/Spinner.jsx'
import {reset ,register}  from "../features/auth/authSlice.js"


function Register() {
const [formData,setFormData]=useState({
  name:"",
  email:"",
  password:"",
  cpassword:""
})
const {name,email,password,cpassword}=formData;
const navigate=useNavigate();
const  dispatch=useDispatch();

const {user,isLoading,isSuccess,message,isError}=useSelector((state)=>{return state.auth})

useEffect(()=>{
 console.log(formData);
},[formData])


useEffect(()=>{
if(isError){
  toast.error(message);
}
if(isSuccess || user ){
  navigate("/login");
}
dispatch(reset());
},[user,isLoading,isSuccess,message,isError])

const onChange=(target)=>{
  const {name,value}=target;
  setFormData((data)=>({...data,[name]:value}))
}

const onSubmit=(e)=>{
  e.preventDefault();
  if(password!==cpassword){
    toast.error("Password Don't Match");
  }
  else{
    const userData={
      name,
      email,
      password,
    }
    dispatch(register(userData))
  }
}
if(isLoading){
  return <Spinner></Spinner>
}
  return (
    <div className='flex flex-col gap-4 w-4/5  md:w-1/2 items-center  p-2'>
      <div className='flex space-x-1 '>
        <FaUser size={35} ></FaUser> <h1 className='text-xl md:text-3xl font-bold'>Register</h1>
      </div>
      <div>
        <h2 className='text-base md:text-2xl text-red-800'>Please Create An Account</h2>
      </div>
      <div className='w-4/5'>
        <form onSubmit={onSubmit}>
          <div className='flex flex-col gap-2'>
          <input type="text"  onChange={(e)=>{onChange(e.target)}} value={name} name="name" placeholder='Enter your name' className='border border-slate-400  px-0 md:p-1'></input>
          <input type="email"  onChange={(e)=>{onChange(e.target)}} value={email} name="email" placeholder='Enter your email' className='border border-slate-400  px-0 md:p-1'></input>
          <input type="password"  onChange={(e)=>{onChange(e.target)}} value={password} name="password" placeholder='Enter your password' className='border border-slate-400  px-0 md:p-1'></input>
          <input type="password"  onChange={(e)=>{onChange(e.target)}} value={cpassword} name="cpassword" placeholder='Enter your password again' className='border border-slate-400  px-0 md:p-1'></input>
          <div className='w-full bg-slate-900 p-0 md:p-1 text-center text-white mt-2'>
            <button type="">Submit</button>
          </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register