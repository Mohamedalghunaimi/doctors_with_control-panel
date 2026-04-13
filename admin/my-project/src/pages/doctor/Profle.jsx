import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './compontents/Sidebar'
import Navbar from './compontents/Navbar'
import { context } from '../Provider'
import axios from 'axios'
  import { ToastContainer, toast } from 'react-toastify';

const Profile = () => {
    const {doctorData} = useContext(context)
    const [fees,setFees] = useState(0)
    const [about,setAbout] = useState("")
    const [available,setAvailable] = useState(false)
    const [address,setAddress] = useState({})
    const update = async()=> {
        try {
            const {data} = await axios.post("http://localhost:5000/api/doctor/update",{
                userId:doctorData._id,
                fees,
                about,
                address:JSON.stringify(address),
                available
            })
            console.log(data)
            if(data.success) {
                console.log(data)
                toast.success(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=> {
        if(doctorData) {
            setFees(doctorData.fees)
            setAbout(doctorData.about)
            setAvailable(doctorData.available)
            setAddress(doctorData.address)
        }

    },[doctorData])
  return (
    <>
    <Navbar/>
    <div className='flex '>
            <Sidebar />

        
        {doctorData&&<>
        <div className=' min-h-screen flex-wrap flex-1 p-[20px] bg-gray-200 flex items-start  gap-[20px] '>
            <img src={doctorData.image} className='w-[400px] h-[400px] bg-blue-500 rounded-xl' alt='' />
            <div className='bg-white rounded-lg capitalize  p-[20px]  flex flex-col gap-[10px]'>
                <h1 className=' capitalize font-semibold text-2xl'>{doctorData.name}</h1>
                <p className=' text-xl font-semibold text-slate-600'><span>{doctorData.speciality}</span> <span className=' border-[1px] border-gray-400 py-[5px] px-[10px] rounded-full text-sm text-slate-700 font-semibold '>{doctorData.experience}</span></p>
                <div>
                    <div className=' text-xl font-semibold'>about:</div>
                    <textarea value={about} onChange={(e)=>setAbout(e.target.value)} className='w-[100%] p-[5px]' ></textarea>
                </div>
                <div>
                    <span>
                        <b>Appointment fee:</b>$
                        <input value={fees} onChange={(e)=>setFees(e.target.value)}  type='number' className='w-[100px]'  />
                    </span>
                </div>
                <div>
                    <span>address:</span>
                    <div className=' flex flex-wrap gap-[5px]'>
                        <input type='text' value={address.line1} onChange={(e)=> {
                            let copy = structuredClone(address)
                            copy.line1 = e.target.value
                            setAddress(copy)
                        }} placeholder='line1' className='border-[1px] p-[5px]' />
                        <input type='text'  onChange={(e)=> {
                            let copy = structuredClone(address)
                            copy.line2 = e.target.value
                            setAddress(copy)
                        }}  placeholder='line2' value={address.line2} className='border-[1px] p-[5px]' />
                    </div>
                </div>
                <div className=' flex gap-[10px] items-center'>
                    <input checked={available} onChange={(e)=>setAvailable(e.target.checked)} type='checkbox' id='ava' />
                    <label htmlFor='ava'>avalible</label>
                </div>
                <button onClick={()=>update()} className='py-[10px] px-[20px] w-fit bg-blue-500 text-white text-xl font-semibold cursor-pointer rounded-lg capitalize '>
                    save
                </button>

                
            </div>

        </div>
        
        
        </>}

    </div>

    
    </>
  )
}

export default Profile
