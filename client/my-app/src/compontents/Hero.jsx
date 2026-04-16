import React from 'react'
import { assets } from '../assets_frontend/assets'
import { GrFormNextLink } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
const Hero = () => {
    const nav = useNavigate()
  return (
    <div  className='container text-center lg:text-start mx-auto flex items-center justify-between p-[70px]  lg:pb-0 bg-blue-500 mt-[20px] rounded-xl'>
        <div className=' capitalize text-white flex flex-col gap-[30px]'>
            <h1 className=' text-5xl font-bold leading-[1.2]'>book appointment with trusted doctors</h1>
            <div className=' flex items-center justify-center flex-wrap md:flex-nowrap lg:justify-start gap-[10px]'>
                <img src={assets.group_profiles} alt='' />
                <p className=' text-sm font-semibold '>simply browser through our extensive list of trusted doctors,
                    schedule your appointment hassle-free
                </p>
            </div>
            <button onClick={()=>nav("/all-doctors")} className='mx-auto lg:mx-0 capitalize py-[10px] px-[20px] rounded-full font-semibold bg-white text-black flex items-center w-fit'>
                <span>book appointement</span>
                <span><GrFormNextLink /></span>
            </button>

        </div>
        <div>
            <img src={assets.header_img} className=' hidden lg:block'  alt='' />
        </div>
      
    </div>
  )
}

export default Hero
