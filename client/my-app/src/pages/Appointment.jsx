import React, { useContext, useEffect, useState } from 'react'
import Footer from '../compontents/Footer'
import Navbar from '../compontents/Navbar'
import { context } from './Provider'
import axios from 'axios'
import { assets } from '../assets_frontend/assets'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Appointment = () => {
  const {appointments,setAppointments,isAuth}= useContext(context)
  const [showPayments,setShowPayments] = useState(-1)
  const nav = useNavigate()
  const getMyAppointment = async()=> {
    if(!isAuth) {
      toast.error("you must login before")
      return nav("/login")
    }
    try {
      const {data} = await axios.post("http://localhost:5000/api/appointment/my-appointments",{
        userId:isAuth._id
      })
      if(data.success) {
        setAppointments(data.appointments)
      }
    } catch (error) {
      
    }
  }
  const cancelAppointmentByPatient = async(userId,appointmentId,fun)=> {
    try {
      const {data} = await axios.post("http://localhost:5000/api/appointment/user-cancel",{
        userId,appointmentId
      })
      if(data.success) {
        fun()
        toast.success(data.message)
      }
    } catch (error) {
      console.log(error)
    }

  }
  const payOnline = async(appointmentId) => {
    console.log("yess")
    try {
      const {data} = await axios.post("http://localhost:5000/api/appointment/pay-online",{
        appointmentId
      })
      console.log(data)
      if(data.success) {
        window.location.assign(data.url)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=> {
    getMyAppointment()
  },[isAuth])
  return (
    <>
    <div className=' min-h-screen flex flex-col'>
      <Navbar />
      <div className=' container mx-auto flex-1 mt-[20px]'>
        <h1 className=' capitalize text-xl font-bold text-slate-700 mb-[10px]'>my appointments</h1>
        {
          appointments.map((appointment,index)=> {
            return(<>
            <div className=' py-[20px] flex-wrap gap-[20px] border-b-[1px] border-t-[1px] flex items-center justify-between  '>
              <div className=' flex flex-wrap gap-[10px]'> 
                <img src={appointment.doctorId.image} className='w-[180px] bg-gray-100' alt='' />
                <div className=' flex justify-between flex-col capitalize'>
                  <h1 className=' font-bold text-slate-700 text-xl'>{appointment.doctorId.name}</h1>
                  <p className='text-sm font-semibold text-gray-700'>{appointment.doctorId.speciality}</p>
                  <p>
                    <b>address:</b>
                    <p>{appointment?JSON.parse(appointment.doctorId.address).line1:""}</p>
                    <p>{appointment?JSON.parse(appointment.doctorId.address).line1:""}</p>
                  </p>
                  <p className=' font-bold text-gray-700'>date & time : <span>{new Date(appointment.doctorId.date).toLocaleDateString()} </span>
                  | <span>{appointment.slotTime}</span>
                  </p>
                </div>
              </div> 

              <div className=' flex flex-wrap lg:flex-col text-center capitalize gap-[10px]'>
                {appointment.cancelled?<>
                <p className=' text-red-500 font-semibold'>cancelled</p>
                </>:<>
                {showPayments!==index?<>
                {appointment.payment?<>
                <span className=' block py-[5px] px-[20px] border-gray-400 bg-gray-100 rounded-full border w-fit mx-auto'>paied</span>
                </>:<>
                <div onClick={()=>setShowPayments(index)} className='py-[10px] cursor-pointer px-[20px] border-[1px]'>
                  pay online
                </div>
                
                </>}

                </>:
                <>
                  <img onClick={()=>payOnline(appointment._id)} src={assets.stripe_logo} className='w-[100px] mx-auto cursor-pointer' alt=''/>
                </>}
                <button onClick={()=> {
                  cancelAppointmentByPatient(isAuth._id,appointment._id,getMyAppointment)

                }}  className='py-[10px] cursor-pointer px-[20px] border-[1px]'>
                  cancel appointment
                </button>                
                </>}


              </div>

            </div>
            
            </>)
          })
        }
      </div>
      <Footer/>
    </div>

    
    
    </>

  )
}

export default Appointment
