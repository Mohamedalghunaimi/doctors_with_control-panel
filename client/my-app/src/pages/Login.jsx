import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../compontents/Navbar'
import Footer from '../compontents/Footer'
import axios from 'axios'
  import {  toast } from 'react-toastify';
import { context } from './Provider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const nav = useNavigate()
    const {toTop,setIsAuth,isAuth} = useContext(context)
    const [state,setState] = useState("login")
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const loginOrRegister = async()=> {
        
        try {
            if(state==="login") {
                axios.defaults.withCredentials = true;
                const {data} = await axios.post(`${"http://localhost:5000/api"}/auth/login`,{
                    password,email
                })
                console.log(data)
                if(data.success) {
                    toast.success(data.message)
                    setIsAuth(data.user)

                }
            } else {
                axios.defaults.withCredentials = true;
                const {data} = await axios.post(`${"http://localhost:5000/api"}/auth/register`,{
                    name,email,password
                })
                if(data.success) {
                    toast.success(data.message)
                    setIsAuth(data.user)
                }
            }
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(()=> {
        toTop()
        if(isAuth) {
            nav("/")
        }


    },[isAuth])
  return (
    <div className=' flex flex-col min-h-screen '>
        <Navbar />
        <div className=' flex-1 flex justify-center items-center'>
            <div className=' w-[400px] shadow-lg border-[1px] p-[20px] flex flex-col gap-[10px] capitalize'>
                <h1 className='font-semibold text-3xl text-slate-700'>{state==="login"?"login":"create account"}</h1>
                <p className=' text-sm font-semibold text-gray-600'>please {state} to book appointement</p>
                <form className=' flex flex-col gap-[10px]'>
                    {state!=="login"&&<div className=' flex flex-col gap-[5px]'>
                        <label className=' font-semibold ' htmlFor="name">name:</label>
                        <input value={name} onChange={(e)=>setName(e.target.value)} id='name' type='text' placeholder=' name here' className='p-[10px] border-[1px] outline-none' />
                    </div>}
                    <div className=' flex flex-col gap-[5px]'>
                        <label  className=' font-semibold ' htmlFor='email'>email:</label> 
                        <input  value={email} onChange={(e)=>setEmail(e.target.value)}  type='email' placeholder='email here' className='p-[10px] border-[1px] outline-none'  />
                    </div>
                    <div className=' flex flex-col gap-[5px]'>
                        <label  className=' font-semibold ' htmlFor='password'>password:</label> 
                        <input  value={password} onChange={(e)=>setPassword(e.target.value)}  type='password' placeholder='password here'  className='p-[10px] border-[1px] outline-none' />
                    </div>
                    <button onClick={(e)=> {
                        e.preventDefault();
                        loginOrRegister()

                    }} className=' rounded-xl duration-300 hover:bg-blue-700 capitalize font-semibold py-[10px] bg-blue-500 text-white'>
                        {state}
                    </button>
                    <div className=' text-sm font-semibold'>
                    {state==="login"?<>
                    create a new account? <span onClick={()=>setState("sign up")} className=' cursor-pointer text-blue-500'>click here</span>
                    </>:<>
                    i have aleady account? <span onClick={()=>setState("login")} className=' cursor-pointer text-blue-500'>click here</span>
                    </>}
                    </div>
                </form>

            </div>
        </div>

    </div>
  )
}

export default Login
