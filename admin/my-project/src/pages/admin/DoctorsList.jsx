import React, { useEffect, useState } from 'react'
import Navbar from './compontents/Navbar'
import Sidebar from './compontents/Sidebar'
import axios from 'axios'

const DoctorsList = () => {
    const [doctors,setDoctors] = useState([])
    const getDoctors = async() => {
        try {
            const {data} = await axios.get("http://localhost:5000/api/admin/doctors")
            console.log(data)
            if(data.success) {
                setDoctors(data.doctors)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const changeAvailability = async(doctorId,available)=> {
        try {
            const {data} = await axios.post("http://localhost:5000/api/admin/update-doctor",{
                doctorId,
                available
            })
            if(data.success ) {
                getDoctors()
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=> {
        getDoctors()
    },[])
  return (
    <>
    <Navbar/>
    <div className='flex'>
        <Sidebar/>
        <div className=' flex-1 p-[20px]  grid items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
            {
                doctors.map((doctor,index)=> {
                    return(<>
                    <div className=' overflow-hidden rounded-xl shadow-lg'>
                        <img className=' bg-blue-500 w-full' src={doctor.image} alt='' />
                        <div className='p-[10px] capitalize flex flex-col gap-[5px]'>
                            <h1 className=' font-bold text-xl'>{doctor.name}</h1>
                            <p className=' font-semibold text-gray-700'>{doctor.speciality}</p>
                            <div className=' flex gap-[5px] items-center'>
                                <input defaultChecked={doctor.available} type='checkbox' onChange={(e)=> {
                                    changeAvailability(doctor._id,e.target.checked)
                                }} id={`ava${index}`} />
                                <label htmlFor={`ava${index}`}>
                                    available
                                </label>

                            </div>
                        </div>
                    </div>
                    
                    </>)
                })
            }

        </div>
    </div>
    </>

  )
}

export default DoctorsList
