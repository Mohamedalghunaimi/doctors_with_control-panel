import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { FaListCheck } from "react-icons/fa6";
import { HiMiniUserGroup } from "react-icons/hi2";

const Sidebar = () => {
    const nav = useNavigate()
  return (
    <div className=' h-screen py-[20px] capitalize  border-r-[1px] border-r-gray-200'>
        <ul className='flex flex-col '>
            <li onClick={()=> nav("/admin/dashboard")}  className={`p-[20px] cursor-pointer font-semibold  md:px-[40px]  flex justify-center gap-[10px] items-center ${location.pathname==="/admin/dashboard"?"bg-blue-100  border-r-[2px] border-r-blue-400":""}`}  >
              <span className=' text-2xl text-blue-500 '><MdOutlineDashboardCustomize/></span>
              <span className='hidden md:inline-block'>dashboard</span>
            </li>
            <li onClick={()=> nav("/admin/add-doctor")}  className={`p-[20px] cursor-pointer font-semibold  md:px-[40px]  flex justify-center gap-[10px] items-center ${location.pathname==="/admin/add-doctor"?"bg-blue-100  border-r-[2px] border-r-blue-400":""}`}>
              <span className=' text-2xl text-blue-500 '><IoIosPersonAdd /></span>
              <span className='hidden md:inline-block'>add doctor</span>
            </li>
            <li onClick={()=> nav("/admin/appointments")}  className={`p-[20px] cursor-pointer font-semibold  md:px-[40px]  flex justify-center gap-[10px] items-center ${location.pathname==="/admin/appointments"?"bg-blue-100  border-r-[2px] border-r-blue-400":""}`}>
              <span className=' text-2xl text-blue-500 '><FaListCheck/>
              </span>
              <span className='hidden md:inline-block'>appointments</span>


            </li>
            <li  onClick={()=> nav("/admin/list")}  className={`p-[20px] cursor-pointer font-semibold   md:px-[40px] flex justify-center items-center gap-[10px] ${location.pathname==="/admin/list"?"bg-blue-100  border-r-[2px] border-r-blue-400":""}`}>
              <span className=' text-2xl text-blue-500 '><HiMiniUserGroup /></span>
              <span className='hidden md:inline-block'>doctor's list</span>


            </li>
        </ul>
      
    </div>
  )
}

export default Sidebar
