import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets_frontend/assets'

const Book = () => {
    const nav = useNavigate()
  return (
    <div className=' container flex items-center  my-[70px] mx-auto rounded-xl bg-blue-500 text-white p-[50px] lg:pb-0'>
      <div>
        <h1 className=' text-5xl font-bold leading-[1.2] mb-[10px]'>book appointment with 100+ trusted doctors</h1>
        <button onClick={()=>nav("/login")} className=' text-black font-semibold capitalize py-[10px] px-[20px] mt-[20px] rounded-full bg-white'>
            create account
        </button>

      </div>
      <img src={assets.appointment_img} className=' w-[400px] hidden lg:block ' alt='' />
    </div>
  )
}

export default Book
