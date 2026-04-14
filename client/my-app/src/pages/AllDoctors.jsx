import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../compontents/Navbar'
import Footer from '../compontents/Footer'
import { doctors, specialityData } from '../assets_frontend/assets'
import Doctors from '../compontents/Doctors'
import { unstable_setDevServerHooks } from 'react-router-dom'
import { context } from './Provider'

const AllDoctors = () => {
  const {toTop,dbDoctors} = useContext(context)
  const [type,setType] = useState("all")
  const [filteredDoctors,setFilteredDoctors] = useState([])
  
  const filter = ()=> {
    let doctorsCopy = dbDoctors.slice();
    if(type!=="all") {
      doctorsCopy = doctorsCopy.filter((item)=> item.speciality===type)
    }
    setFilteredDoctors(doctorsCopy)

  }
  useEffect(()=> {
    toTop()
    filter()

  },[type,dbDoctors])
  return (
    <>
    <Navbar />

    <div className=' my-[70px] min-h-screen container mx-auto flex gap-[30px]  flex-wrap lg:flex-nowrap items-start'>
        <ul className=' flex flex-row lg:flex-col gap-[10px] flex-wrap justify-center'>
            {specialityData.map((item)=> {
              return(
              <li onClick={()=>setType(item.speciality)} className={` cursor-pointer p-[10px] px-[25px] border-[1px] border-gray-300 ${type===item.speciality?"bg-blue-100":""} `}>
                {item.speciality}
              </li>)
            })}
        </ul>
        {filteredDoctors.length?<Doctors doctors={filteredDoctors} />:
        <div className=' capitalize text-center'>
          there is no doctors 
          </div>}
    </div>
    <Footer />
    
    
    </>

  )
}

export default AllDoctors
