import React from 'react'
import { specialityData } from '../assets_frontend/assets'
import { Link } from 'react-router-dom'

const Speciality = () => {
  return (
    <div className='  capitalize my-[70px]'>
        <h1 className='text-center font-bold text-4xl  text-slate-800'>find by Speciality</h1>
        <p className='text-center text-sm font-semibold my-[20px] mb-[40px]  text-gray-700'>simply browser through our extensive list of trusted doctors,
            schedule your appointment hassle-free
        </p> 
        <div className='flex flex-wrap justify-center items-center gap-[20px] text-center'>
            {
                specialityData.map((item)=> {
                    return(<>
                    <Link className=' duration-300 hover:scale-110' to={`/all-doctors?type=${item.speciality}`}>
                        <img src={item.image} alt='' />
                        <p>{item.speciality}</p>
                    </Link>
                    
                    
                    </>)
                })
            }
        </div>     
    </div>
  )
}

export default Speciality
