import React, { useContext, useEffect, useState } from 'react'
import Navbar from './compontents/Navbar'
import Sidebar from './compontents/Sidebar'
import axios from 'axios'
import { context } from '../Provider'
import { ImCancelCircle } from "react-icons/im";

const AdminDashboard = () => {
  const {adminData,cancelAppointment,getAdminDashData,info} = useContext(context)


  useEffect(()=> {
    getAdminDashData()

  },[adminData])
  return ( 
    <>
    <Navbar/>
    <div className='flex'>
      <Sidebar />
      <div className=' flex-1 bg-gray-100 p-[20px]'>
        <div className=' flex flex-wrap gap-[10px] items-center'>
          <div className=' bg-white px-[20px] py-[10px] shadow-lg'>doctors:{info.totalDoctors}</div>
          <div className=' bg-white px-[20px] py-[10px] shadow-lg'>appointments:{info.totalAppointments}</div>
          <div className=' bg-white px-[20px] py-[10px] shadow-lg'>patients:{info.totalPatients}</div>
        </div>
        <div>
          {info.totalAppointments>0&&<>
          <div className='p-[20px]  mt-[20px] capitalize bg-white lg:w-[70%]'>
            <h1 className=' text-2xl font-bold text-center lg:text-start mb-[20px]'>latest bookings</h1>
            {info.appointments.map((appointment)=> {
              return(<>
              <div  className='flex border-b-[1px] border-b-gray-300 pb-[10px] flex-wrap justify-center md:justify-between items-center'>
                <div className=' flex justify-center flex-wrap items-center gap-[10px] mt-[20px]'>
                  <img src={appointment.doctorId.image} className='w-[70px] bg-gray-100  h-[70px] rounded-full' alt='' />
                  <div className=' text-center md:text-start'>
                    <h1 className=' text-slate-800 capitalize font-semibold text-xl'>{appointment.doctorId.name}</h1>
                    <p className=' text-sm font-semibold text-gray-500'>booking on {new Date(appointment.createdAt).toDateString()}</p>
                  </div>

                </div>
                {appointment.cancelled?<>
                <span className=' font-semibold text-red-500 cursor-pointer'>
                    cancelled
                </span>                
                </>:<>
                {appointment.isCompleted?<>
                <span className=' font-semibold text-green-500 cursor-pointer'>
                    completed
                </span>   
                </>:<>
                <span onClick={()=> cancelAppointment(appointment._id,appointment.doctorId._id,getAllAppointments)} className=' text-red-600 text-2xl cursor-pointer'>
                    <ImCancelCircle />
                </span>                
                </>}
                </>}
              </div>
              
              
              </>)
            })}
          </div>
          
          
          </>}
        </div>


      </div>

    </div>
    
    
    </>

  )
}

export default AdminDashboard
