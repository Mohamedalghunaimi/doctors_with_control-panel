import React, { useContext } from 'react'
import { assets } from '../../../assets_admin/assets'
import axios from 'axios'
import { context } from '../../Provider'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const {setDoctorData} = useContext(context)
  const nav = useNavigate()
  const logout = async()=> {
    try {
      const {data} =await axios.get("http://localhost:5000/api/doctor/logout")
      if(data.success) {
        setDoctorData(false)
        nav("/")


      }
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className=' p-[20px]  md:px-[40px] flex justify-between flex-wrap gap-[10px] items-center border-b-[1px] border-b-gray-200'>
        <div className=' flex items-center gap-[10px]'>
            <img src={assets.admin_logo} alt='' />
            <div className='font-semibold text-gray-600 capitalize text-sm border-[1px] rounded-full py-[5px] px-[10px]'> 
                doctor
            </div>
        </div>
        <button onClick={()=> {
          logout()

        }} className=' text-white capitalize cursor-pointer font-semibold bg-blue-500 py-[10px] px-[25px] rounded-full duration-300 hover:bg-blue-800'>
            logout
        </button>

      
    </div>
  )
}

export default Navbar
