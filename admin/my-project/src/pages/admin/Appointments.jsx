import React, {  useContext, useEffect, useState } from 'react'
import Navbar from './compontents/Navbar'
import Sidebar from './compontents/Sidebar'
import axios from 'axios'
import { context } from '../Provider'
import { ImCancelCircle } from 'react-icons/im'

const Appointments = () => {
    const {cancelAppointment,appointments,setAppointments} = useContext(context)
    const getAge = (birtday)=> {
        const date1 = new Date(birtday)
        const date2 = new Date();
        const age = (date2 -date1)/(1000*60*60*24*360)
        return Math.floor(age)
        
    }
    const getAllAppointments = async()=> {
        try {
            const {data} = await axios.get("http://localhost:5000/api/admin/appointments")
            if(data.success) {
                setAppointments(data.appointments.reverse())
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=> {
        getAllAppointments()

    },[])
  return (<>
  <Navbar/>
  <div className='flex'>
    <Sidebar/>
    <div className='p-[20px] flex-1 overflow-auto   '>
        <h1>all appointments</h1>
        {appointments.length>0&&<>
        <table className='w-[100%]  mt-[30px] min-w-[800px]  '>
            <thead className=' capitalize font-semibold'>
                <tr>
                    <td>#</td>
                    <td>patient</td>
                    <td>age</td>
                    <td>date & time</td>
                    <td>doctor</td>
                    <td>fees</td>
                    <td>action</td>
                </tr>
            </thead>
            <tbody>
                {
                    appointments.map((appointment,index)=> {
                        return(<>
                        <tr className=' border-b-[1px] border-b-gray-200'>
                        <td>{index+1}</td>
                        <td className=' py-[10px] flex items-center gap-[10px]'>
                            <img src={appointment.userId.image} className="w-[70px] h-[70px] rounded-full"/>
                            <h1>{appointment.userId.name}</h1>
                        </td>
                        <td>{getAge(appointment.userId.birthday)}</td>
                        <td>{new Date(appointment.createdAt).toDateString()} , {appointment.slotTime}</td>
                        <td className=' py-[10px] flex items-center gap-[10px]'>
                            <img src={appointment.doctorId.image} className="w-[70px] bg-gray-100 h-[70px] rounded-full"/>
                            <h1>{appointment.doctorId.name}</h1>
                        </td>
                        <td>{appointment.amount}$</td>
                        <td>
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
                        </td>
                        </tr>
                        </>)
                    })
                }
            </tbody>
        </table>
        
        
        </>}
        
    </div>
  </div>
  
  </>

  )
}

export default Appointments
