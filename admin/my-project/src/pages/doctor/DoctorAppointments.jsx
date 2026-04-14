/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import Navbar from './compontents/Navbar'
import Sidebar from './compontents/Sidebar'
import axios from 'axios'
import { context } from '../Provider'
import { data } from 'react-router-dom'
import { MdOutlineFileDownloadDone } from 'react-icons/md'
import { ImCancelCircle } from 'react-icons/im'

const DoctorAppointments = () => {

    const {doctorData,getDoctorAppointments,doctorAppointments, cancelAppointmentByDoctor, completeAppointment} = useContext(context)

    const getAge = (birtday)=> {
        const date1 = new Date(birtday)
        const date2 = new Date();
        const age = (date2 -date1)/(1000*60*60*24*360)
        return Math.floor(age)
        
    }
    useEffect(()=> {
        if(doctorData) {
            getDoctorAppointments()
        }



    },[doctorData])
  return (
    <>
    <Navbar/>
    <div className='flex '>
        <Sidebar />
        <div className=' w-[100%] p-[20px]  overflow-x-auto'>
            <h1>all appointments</h1>
            <table className=' w-[100%] mt-[20px] capitalize min-w-[900px] '>
                <thead>
                    <tr>
                        <td>#</td>
                        <td>patient</td>
                        <td>payment</td>
                        <td>age</td>
                        <td>date & time</td>
                        <td>fees</td>
                        <td>action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        doctorAppointments.map((appointment,index)=> (
                            <tr>
                                <td className='p-[5px]'>{index+1}</td>
                                <td className='p-[5px] flex items-center gap-[10px]'>
                                    <img className=' w-[80px] h-[80px] rounded-full' src={appointment.userId.image} alt=''/>
                                    <div>{appointment.userId.name}</div>
                                </td>
                                <td>{!appointment.payment?"cash":"online"}</td>
                                <td>{getAge(appointment.userId.birthday)}</td>
                                <td>{new Date(appointment.createdAt).toDateString()} {appointment.slotTime}</td>
                                <td>{appointment.amount}$</td>
                                <td>                            
                                    <span>
                                        {appointment.cancelled&&<p className=' text-red-600'>cancelled</p>}
                                        {appointment.isCompleted&&<p className=' text-green-600'>completed</p>}
                                        {!appointment.isCompleted&&!appointment.cancelled&&
                                        <div className=' capitalize flex items-center gap-[20px] '>
                                    <span onClick={()=> completeAppointment(appointment._id,appointment.doctorId)} className='cursor-pointer font-bold text-green-600  text-2xl'><MdOutlineFileDownloadDone/></span>
                                    <span onClick={()=> cancelAppointmentByDoctor(appointment._id,appointment.doctorId)} className='cursor-pointer font-bold text-red-600 text-2xl'><ImCancelCircle /></span>
                                        </div>}
                                    </span></td>
                            </tr>

                        ))


                    }
                </tbody>
            </table>
        </div>

    </div>
    
    </>
  )
}

export default DoctorAppointments
