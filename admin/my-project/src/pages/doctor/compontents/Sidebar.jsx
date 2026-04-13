import React from 'react'
import { BsInfoSquare } from "react-icons/bs";
import { FaCircleInfo } from "react-icons/fa6";
import { CiViewList } from "react-icons/ci";
import { FaUserShield } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const nav = useNavigate()
  return (
    <div className=' h-screen border-r-[1px] border-r-gray-300 w-fit'>
        <ul className=' flex flex-col py-[20px] capitalize  font-semibold'>
            <li onClick={()=> nav("/doctor/dashboard")}    className={` cursor-pointer px-[20px] md:px-[40px] py-[10px] flex items-center gap-[5px] ${location.pathname==="/doctor/dashboard"?"bg-blue-100 border-r-[2px] border-r-blue-400":""}`}>
                <span className='text-blue-500 text-2xl'><FaCircleInfo /></span>
                <span className=' hidden lg:inline-block'>dashboard</span>
            </li>
            <li onClick={()=> nav("/doctor/appointments")} className={` cursor-pointer px-[20px] md:px-[40px]  py-[10px] flex items-center gap-[5px] ${location.pathname==="/doctor/appointments"?"bg-blue-100 border-r-[2px] border-r-blue-400":""}`}>
                <span  className='text-blue-500 text-2xl'><CiViewList/></span>
                <span  className=' hidden lg:inline-block'>appointments</span>
                </li>
            <li onClick={()=> nav("/doctor/profile")} className={` cursor-pointer px-[20px] md:px-[40px] py-[10px] flex items-center gap-[5px] ${location.pathname==="/doctor/profile"?"bg-blue-100 border-r-[2px] border-r-blue-400":""}`}>
                <span className='text-blue-500 text-2xl'><FaUserShield /></span>
                <span  className=' hidden lg:inline-block'>
                    profile

                </span>
                
            </li>
        </ul>
    </div>
  )
}

export default Sidebar
