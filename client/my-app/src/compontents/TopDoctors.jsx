import React, { useContext } from 'react'
import Doctors from './Doctors'
import { doctors } from '../assets_frontend/assets'
import { useNavigate } from 'react-router-dom'
import { context } from '../pages/Provider'

const TopDoctors = () => {
    const nav = useNavigate("/all-doctors")
    const {dbDoctors} = useContext(context)
  return (
    <div className=' my-[100px]'>
        <h1 className=' text-center capitalize text-5xl text-slate-800 font-semibold'>top doctor's book</h1>
        <p className='text-center text-sm font-semibold my-[20px] mb-[40px]  text-gray-700'>simply browser through our extensive list of trusted doctors,
            schedule your appointment hassle-free
        </p> 
        <div className=' container mx-auto'>
            <Doctors doctors={dbDoctors.slice(0,10)} />
        </div>
        <button onClick={()=>nav("/all-doctors")} className=' mx-auto rounded-full mt-[20px] w-fit block py-[10px] px-[30px] bg-gray-200 capitalize font-semibold'>
            more
        </button>

      
    </div>
  )
}

export default TopDoctors
