import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { context } from '../../Provider'
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";

const DashboardContent = () => {
    const {
    cancelAppointmentByDoctor,
    getDashboardData,
    completeAppointment,
    dashData
    } = useContext(context)

    useEffect(()=> {
        getDashboardData()
    },[])
  return dashData? (
    <div className=' flex-1 bg-slate-100 p-[20px]'>
        <div className=' flex gap-[10px]'>
            <div className=' py-[10px] px-[20px] bg-white capitalize shadow-lg'>
                earnings : {dashData.totalEarnings}$
            </div>
            <div  className=' py-[10px] px-[20px] bg-white capitalize shadow-lg'>
                appointments: {dashData.totalAppointments}
            </div>
        </div>
        {
            dashData.latestAppointments.length>0&&
            <div className='bg-white rounded-xl mt-[30px] p-[20px] w-[60%]'>
                <h1 className=' capitalize text-xl  font-bold mb-[20px]'>latest bookings</h1>
                {
                    dashData.latestAppointments.map((appointment)=> {
                        return(<>
                        <div className=' mt-[20px] flex items-center justify-center md:justify-between flex-wrap  '>
                            <div className=' flex items-center flex-wrap justify-center text-center gap-[10px]'>
                                <img src={appointment.userId.image} className='w-[100px] h-[100px] rounded-full' alt='' />
                                <div className=' capitalize'>
                                    <h1>{appointment.userId.name}</h1>
                                    <p>booking on {new Date(appointment.createdAt).toDateString()}</p>
                                </div>
                            </div>
                            <span>
                                {appointment.cancelled&&<p className=' text-red-600'>cancelled</p>}
                                {appointment.isCompleted&&<p className=' text-green-600'>completed</p>}
                                {!appointment.isCompleted&&!appointment.cancelled&&
                                <div className=' capitalize flex items-center gap-[20px] '>
                                    <span onClick={()=> completeAppointment(appointment._id,appointment.doctorId._id,getDashboardData)} className='cursor-pointer font-bold text-green-600  text-2xl'><MdOutlineFileDownloadDone/></span>
                                    <span onClick={()=> cancelAppointmentByDoctor(appointment._id,appointment.doctorId._id,getDashboardData)} className='cursor-pointer font-bold text-red-600 text-2xl'><ImCancelCircle /></span>
                                </div>}
                            </span>
                        </div>
                        
                        </>)
                    })
                }

            </div>
        }
        
        
    </div>
  ):(<></>)
}

export default DashboardContent
