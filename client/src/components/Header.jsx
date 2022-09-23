import React from 'react'
import {FaSignInAlt,FaSignOutAlt,FaUser} from "react-icons/fa"
import { Link } from 'react-router-dom'
import {useDispatch,useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout,reset} from "../features/auth/authSlice.js"
function Header() {
const navigate=useNavigate();
const dispatch=useDispatch();
const {user}=useSelector((state)=>{return state.auth})
console.log(user);
const Logout=()=>{
 
  dispatch(logout())
  dispatch(reset());
  navigate("/login");
}
  return (
    <div className='w-full flex justify-between  p-2'>
        <div>
        <Link to="/" className='flex items-center space-x-2'>
              <p>Dashboard</p>
            </Link> 
        </div>
{
  user&& user.message==="User Successfully Logged in"? <div> 
    <button type='button' onClick={Logout} className='bg-slate-900 text-white  cursor-pointer py-2 px-5   rounded-md'>Logout</button> 
    </div>:

        <div className='flex space-x-2'>
            <div>
        <Link to="/login" className='flex items-center space-x-2'>
            <FaSignInAlt></FaSignInAlt> <p>Login</p>
            </Link> 
            </div>
            <div>
            <Link to="/register" className='flex items-center space-x-2'>
            <FaUser></FaUser> <p>Register</p>
            </Link> 
            </div>

            
        </div>
}
      
       
       
    </div>
  )
}

export default Header