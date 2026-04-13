import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { assets } from '../assets_frontend/assets'
import { context } from '../pages/Provider'
import axios from 'axios'
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";

const Navbar = () => {
    const {isAuth,setIsAuth} = useContext(context)
    const location = useLocation()
    const nav = useNavigate()
    const [showNav,setShowNav] = useState(false)
    const logout = async()=> {
        try {
            const {data} = await axios.get("http://localhost:5000/api/auth/logout")
            if(data.success) {
                setIsAuth(false)
                nav("/")
            }
        } catch (error) {
            
        }
    }
  return (
    <>
        <div className=' md:flex hidden justify-between py-[10px] border-b-[1px] items-center container mx-auto'>
        <Link to={"/"}>
        <div>
            <img src={assets.logo} alt='' />
        </div>
        </Link>
        <ul className=' text-slate-800 uppercase font-bold  flex flex-col md:flex-row items-end gap-[15px]'>
            <li onClick={()=>nav("/")} className={`duration-300 hover:underline cursor-pointer ${location.pathname==="/"?"underline":""}`}>home</li>
            <li onClick={()=>nav("/all-doctors")} className={`duration-300 hover:underline cursor-pointer ${location.pathname==="/all-doctors"?"underline":""}`}>all doctors</li>
            <li onClick={()=>nav("/about")} className={`duration-300 hover:underline cursor-pointer ${location.pathname==="/about"?"underline":""}`}>about</li>
            <li onClick={()=>nav("/contact")} className={`duration-300 hover:underline cursor-pointer ${location.pathname==="/contact"?"underline":""}`}>contact</li>
        </ul>
        {!isAuth?
        <button onClick={()=>nav("/login")} className=' py-[10px] px-[15px] rounded-full bg-blue-500 text-white
        duration-300 hover:bg-blue-800 capitalize font-semibold
        '>
            create account
        </button>
        :
        <div className='relative parent'>
            <img src={isAuth.image} className=' cursor-pointer w-[50px] h-[50px] rounded-full' alt='' />
            <ul className=' hidden child capitalize z-[100] bg-white shadow-lg p-[10px] px-[20px] absolute bottom-0 left-0 translate-x-[-70%] rounded-2xl border-t-[1px] rounded-tr-none translate-y-[100%]'>
                <li onClick={()=> nav("/profile")} className=' cursor-pointer mt-[10px] duration-300 hover:underline'>profile</li>
                <li onClick={()=>nav("/appointments")} className=' cursor-pointer  mt-[10px]  duration-300 hover:underline' >appointements</li>
                <li onClick={()=> {
                    logout()
                }}  className=' cursor-pointer  mt-[10px]  duration-300 hover:underline'>logout</li>
            </ul>
        </div>
        }
        </div>

    <div className=' flex px-[20px] md:px-0 md:hidden container mx-auto py-[20px] ' >
        <span onClick={()=>setShowNav(!showNav)} className=' font-bold text-3xl cursor-pointer'>
            <CiMenuFries />
        </span>
    <div className={`flex ${!showNav?"x":""} duration-300 flex-col items-center text-center h-screen justify-between bg-white z-[100] text-black border-l-[1px] shadow-lg border-l-gray-300 p-[30px] fixed top-0 left-0 `}>
        <Link to={"/"}>
        <div>
            <img src={assets.logo} alt='' />
        </div>
        </Link>
        <ul className='  uppercase font-bold  flex flex-col  items-end gap-[15px]'>
            <li onClick={()=>nav("/")} className={`duration-300 hover:underline cursor-pointer ${location.pathname==="/"?"underline":""}`}>home</li>
            <li onClick={()=>nav("/all-doctors")} className={`duration-300 hover:underline cursor-pointer ${location.pathname==="/all-doctors"?"underline":""}`}>all doctors</li>
            <li onClick={()=>nav("/about")} className={`duration-300 hover:underline cursor-pointer ${location.pathname==="/about"?"underline":""}`}>about</li>
            <li onClick={()=>nav("/contact")} className={`duration-300 hover:underline cursor-pointer ${location.pathname==="/contact"?"underline":""}`}>contact</li>
        </ul>
        {!isAuth?
        <button onClick={()=>nav("/login")} className=' py-[10px] px-[15px] rounded-full bg-blue-500 text-white
        duration-300 hover:bg-blue-800 capitalize font-semibold
        '>
            create account
        </button>
        :
        <div className='relative parent_2'>
            <img src={isAuth.image} className=' cursor-pointer w-[50px] h-[50px] rounded-full' alt='' />
            <ul className=' hidden child_1 capitalize z-[100] bg-white shadow-lg p-[10px] px-[20px] absolute bottom-0 left-0 translate-x-[-70%] rounded-2xl border-t-[1px] rounded-tr-none translate-y-[100%]'>
                <li onClick={()=> nav("/profile")} className=' cursor-pointer mt-[10px] duration-300 hover:underline'>profile</li>
                <li onClick={()=>nav("/appointments")} className=' cursor-pointer  mt-[10px]  duration-300 hover:underline' >appointements</li>
                <li onClick={()=> {
                    logout()
                }}  className=' cursor-pointer  mt-[10px]  duration-300 hover:underline'>logout</li>
            </ul>
        </div>
        }
        <div onClick={()=> setShowNav(!showNav)} className=' top-[5px] right-[5px] absolute text-4xl cursor-pointer'>
            <MdOutlineCancel />

        </div>
    </div>
    </div>

    </>
    
  )
}

export default Navbar
