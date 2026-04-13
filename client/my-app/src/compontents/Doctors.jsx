import React from 'react'
import { useNavigate } from 'react-router-dom'

const Doctors = ({doctors}) => {
    const nav = useNavigate()
    console.log(doctors)
  return (
    <div className=' flex  flex-wrap justify-center   gap-[20px]'>
        {
            doctors.map((doctor)=> {
                return(<>
                <div onClick={()=>nav(`/doctor/${doctor._id}`)} className=' cursor-pointer shadow-md border rounded-lg overflow-hidden'>
                    <img src={doctor.image}  className=' w-[230px] bg-gray-100' alt='' />
                    <div className=' p-[20px]'>
                        <p className=' flex items-center gap-[10px] capitalize text-green-600'>
                            <span className='w-[10px] h-[10px] rounded-full bg-green-600'></span>
                            available 
                        </p>
                        <h4 className=' font-semibold text-xl'>{doctor.name}</h4>
                        <p className=' text-gray-600 text-sm font-semibold'>{doctor.speciality}</p>
                    </div>
                </div>
                
                </>)
            })
        }
      
    </div>
  )
}

export default Doctors
