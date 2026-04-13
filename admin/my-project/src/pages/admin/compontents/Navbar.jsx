import React, { useState } from 'react'
import { assets } from '../../../assets_admin/assets'
import { useContext } from 'react'
import { context } from '../../Provider'
import axios from 'axios'
import { data, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const {setAdminData} = useContext(context)
  const nav = useNavigate()
  const logout = async() => {
    try {
      const {data} = await axios.get("http://localhost:5000/api/admin/logout")
      if(data.success) {
        setAdminData(false)
        nav("/")
      }
    } catch (error) {
      console.log(error)
      
    }
  }

  return (
    <div className='px-[40px] py-[20px] border-b-[1px] border-b-gray-200 flex items-center justify-between'>
      <div>
        <img src={assets.admin_logo} alt="" />
      </div>
      <button onClick={()=>logout()} className=' py-[10px] px-[15px] font-semibold rounded-full duration-300 hover:bg-blue-800 cursor-pointer capitalize bg-blue-500 text-white'>
        logout
      </button>
      
    </div>
  )
}

export default Navbar
