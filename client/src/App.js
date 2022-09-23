import React from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Header from './components/Header'
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'

function App() {
  return (
    <>
    <Router>
      <div className='container flex flex-col w-screen h-screen bg-[#e2e8f0]'>
      <Header></Header>
      <div className='w-full flex  flex-grow justify-center mt-20 h-4/5'>

      <Routes>
        <Route path="/" element={<Dashboard></Dashboard>}></Route>
        <Route path='login'  element={<Login></Login>}></Route>
        <Route path='register' element={<Register></Register>}></Route>
      </Routes>
      </div>
      </div>
    </Router>
    <ToastContainer/>
    </>
  )
}

export default App