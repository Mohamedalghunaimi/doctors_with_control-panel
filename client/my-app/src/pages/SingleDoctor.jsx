import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../compontents/Navbar'
import Footer from '../compontents/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { doctors } from '../assets_frontend/assets'
import { CiCircleQuestion } from "react-icons/ci";
import Doctors from '../compontents/Doctors'
import { context } from './Provider'
import axios from 'axios'
import {  toast } from 'react-toastify';

const SingleDoctor = () => {
    const {toTop,appointments,setAppointments,isAuth,dbDoctors} = useContext(context)
    const {id} = useParams();
    const [doctor,setDoctor] = useState(false)
    const [relatedDoctors,setRelatedDoctors] = useState([])
    const [day,setDay] = useState('')
    const [hour,setHour] = useState("")
    const nav = useNavigate()

    const fetchProduct = ()=> {
        setDoctor(dbDoctors.find((doctor)=>doctor._id===id))
    }
    const fetchRelated = ()=> {
        if(doctor)
        setRelatedDoctors(dbDoctors.filter((item)=>(doctor.speciality===item.speciality)&&(doctor._id!==item._id)))
    }
    useEffect(()=> {
        toTop()
        fetchProduct()
        setDay("");setHour("")
    },[id,dbDoctors])
    useEffect(()=> {
        fetchRelated()
    },[doctor,dbDoctors])
    const bookAppointmet = async()=> {
        if(!isAuth) {
            toast.error("you must login before")
            return nav("/login")
        }
        if(!day||!hour) {
            return toast.error("missing details!")
        }
        const appointment = {
            userId:isAuth._id,
            doctorId:id,
            slotDate:day,
            slotTime:hour,
            cancelled:false,
            payment:false,
            isCompleted:false,
            date:Date.now(),
            amount:Number(doctor.fees)
        }
        //setAppointments([...appointments,appointment])
        try {
            const {data} = await axios.post("http://localhost:5000/api/appointment/add-appointment",appointment)
            if(data.success) {
                toast.success(data.message)
            }else {
                toast.error(data.message)
            }
        } catch (error) {
        }
    }
    return doctor? (
    <>
    <Navbar />
    <div className='flex-wrap xl:flex-nowrap  container mx-auto flex items-start gap-[20px] my-[50px]'>
        <img src={doctor.image} className='bg-blue-500 rounded-lg w-[80%] mx-auto lg:w-[338px]' alt='' />
        <div className=' flex-1 flex flex-col gap-[30px]'>
            <div className=' capitalize flex flex-col gap-[10px] p-[30px] rounded-lg border-[1px] border-gray-400 '>
                <p className=' text-4xl font-bold'>{doctor.name}</p>
                <p className=' flex items-center gap-[5px] text-gray-600 font-semibold text-xl'>{doctor.degree} - {doctor.speciality} <span className='p-[5px] px-[10px] rounded-full border-[1px] text-sm border-gray-300'>{doctor.experience}</span></p>
                <span className=' font-bold flex items-center gap-[5px]'>about <span><CiCircleQuestion/></span></span>
                <p className=' leading-[1.6] lg:max-w-[60%] text-sm font-semibold text-gray-800'>{doctor.about}</p>
                <p className=' font-semibold'>appointment fee: <b className=' text-xl'>{doctor.fees}$</b></p>
            </div>
            <div>
                <h1 className=' capitalize text-gray-600 font-semibold mb-[20px]'>book slots</h1>
                <div className=' flex flex-wrap items-center gap-[10px] uppercase font-semibold text-md text-slate-600'>
                    <span onClick={()=>setDay("wed 4")} className={`cursor-pointer ${day==="wed 4"?"bg-blue-500 text-white":""} border-[1px] py-[10px] px-[30px] border-gray-300 rounded-full`}>wed 4</span>
                    <span onClick={()=>setDay("thu 5")} className={`cursor-pointer ${day==="thu 5"?"bg-blue-500 text-white":""} border-[1px] py-[10px] px-[30px] border-gray-300 rounded-full`}>thu 5</span>
                    <span onClick={()=>setDay("fri 6")} className={`cursor-pointer ${day==="fri 6"?"bg-blue-500 text-white":""} border-[1px] py-[10px] px-[30px] border-gray-300 rounded-full`}>fri 6</span>
                    <span onClick={()=>setDay("sat 7")} className={`cursor-pointer ${day==="sat 7"?"bg-blue-500 text-white":""} border-[1px] py-[10px] px-[30px] border-gray-300 rounded-full`}>sat 7</span>
                    <span onClick={()=>setDay("mon 9")} className={`cursor-pointer ${day==="mon 9"?"bg-blue-500 text-white":""} border-[1px] py-[10px] px-[30px] border-gray-300 rounded-full`}>mon 9</span>
                    <span onClick={()=>setDay("tue 10")} className={`cursor-pointer ${day==="tue 10"?"bg-blue-500 text-white":""} border-[1px] py-[10px] px-[30px] border-gray-300 rounded-full`}>tue 10</span>
                </div>
                <div className=' flex items-center gap-[10px] uppercase font-semibold text-md text-slate-600 my-[20px] flex-wrap'>
                    <span onClick={()=>setHour("10:00 am")} className={`cursor-pointer ${hour==="10:00 am"?"bg-blue-500 text-white":""} border-[1px] py-[10px] px-[30px] border-gray-300 rounded-full`}>10:00 am</span>
                    <span  onClick={()=>setHour("10:30 am")} className={`cursor-pointer ${hour==="10:30 am"?"bg-blue-500 text-white":""} border-[1px] py-[10px] px-[30px] border-gray-300 rounded-full`}>10:30 am</span>
                    <span onClick={()=>setHour("11:00 am")} className={`cursor-pointer ${hour==="11:00 am"?"bg-blue-500 text-white":""} border-[1px] py-[10px] px-[30px] border-gray-300 rounded-full`}>11:00 am</span>
                    <span onClick={()=>setHour("11:30 am")} className={`cursor-pointer ${hour==="11:30 am"?"bg-blue-500 text-white":""} border-[1px] py-[10px] px-[30px] border-gray-300 rounded-full`}>11:30 am</span>
                    <span onClick={()=>setHour("12:00 am")} className={`cursor-pointer ${hour==="12:00 am"?"bg-blue-500 text-white":""} border-[1px] py-[10px] px-[30px] border-gray-300 rounded-full`}>12:00 am</span>
                    <span onClick={()=>setHour("12:30 am")} className={`cursor-pointer ${hour==="12:30 am"?"bg-blue-500 text-white":""} border-[1px] py-[10px] px-[30px] border-gray-300 rounded-full`}>12:30 am</span>
                    <span onClick={()=>setHour("1:00 am")} className={`cursor-pointer ${hour==="1:00 am"?"bg-blue-500 text-white":""} border-[1px] py-[10px] px-[30px] border-gray-300 rounded-full`}>1:00 am</span>
                    <span onClick={()=>setHour("1:30 am")} className={`cursor-pointer ${hour==="1:30 am"?"bg-blue-500 text-white":""} border-[1px] py-[10px] px-[30px] border-gray-300 rounded-full`}>1:30 am</span>
                    <span onClick={()=>setHour("2:00 am")} className={`cursor-pointer ${hour==="2:00 am"?"bg-blue-500 text-white":""} border-[1px] py-[10px] px-[30px] border-gray-300 rounded-full`}>2:00 am</span>
                    <span onClick={()=>setHour("2:30 am")} className={`cursor-pointer ${hour==="2:30 am"?"bg-blue-500 text-white":""} border-[1px] py-[10px] px-[30px] border-gray-300 rounded-full`}>2:30 am</span>
                    <span  onClick={()=>setHour("3:00 am")} className={`cursor-pointer ${hour==="3:00 am"?"bg-blue-500 text-white":""} border-[1px] py-[10px] px-[30px] border-gray-300 rounded-full`}>3:00 am</span>
                </div>
                <button onClick={()=>bookAppointmet()} className=' py-[10px] px-[20px] bg-blue-500 rounded-full text-white'>
                    book appointment
                </button>
            </div>
        </div>
    </div>
    <div className=' mb-[30px] capitalize container mx-auto'>
        <h1 className=' text-center text-4xl font-bold mb-[20px] '>related doctors</h1>
        <Doctors doctors={relatedDoctors} />
    </div>
    
    <Footer />
    
    </>
    ):(<></>)
}

export default SingleDoctor
