import axios from 'axios'
import React, { createContext,  useEffect,  useState } from 'react'
import { toast } from 'sonner'
import Swal from 'sweetalert2'
export const context = createContext()
const Provider = ({children}) => {
  const [doctorData,setDoctorData] = useState(false)
  const [adminData,setAdminData] = useState(false)
  const [info,setInfo] = useState({})
  
  const getAdminDashData = async()=> {
    try {
      const {data} = await axios.get("http://localhost:5000/api/admin/dashboard-data")
      if(data.success) {
        setInfo(data.info)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const [appointments,setAppointments] = useState([])

  const cancelAppointment = async(appointmentId,doctorId)=> {
    
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancelle it!",

        });
        if(!result.isConfirmed) {
          return 
        }

    try {
      const {data} = await axios.post("http://localhost:5000/api/admin/cancel",{
        appointmentId,doctorId
      })
      if(data.success) {
        
        setAppointments(appointments.map((item)=>{
            if(String(item._id)===String(appointmentId)) {
              return data.appointment
            }
            return item
        }))
        await getAdminDashData()
        Swal.fire({
            title: "cancelled!",
            text: "Your file has been cancelled.",
            icon: "success",
        });  

      } else {
        toast.error(data.message)
        
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
      });
    }
  }
  const cancelAppointmentByDoctor = async(appointmentId,doctorId) => {
    try {
    
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancelle it!",

        });
        if(!result.isConfirmed) {
          return 
        }
      const {data} = await axios.post("http://localhost:5000/api/doctor/cancel",{
        appointmentId,doctorId
      })
      if(data.success) {
        setDoctorAppointments(doctorAppointments.map((item)=>{
            if(String(item._id)===String(appointmentId)) {
              return data.appointment
            }
            return item
        }))
        await getDashboardData()
            Swal.fire({
                title: "Cancelled!",
                text: "Your file has been cancelled.",
                icon: "success",
            });  
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
      });
    }
  }
  /* by doctors */
  const completeAppointment = async(appointmentId,doctorId)=> {
    try {
      const {data} = await axios.post("http://localhost:5000/api/doctor/complete",{
        appointmentId,doctorId
      })
      if(data.success) {
        setDoctorAppointments(
          doctorAppointments.map((item)=>{
            if(String(item._id)===String(appointmentId)) {
              return data.appointment
            }
            return item
        }))
        await getDashboardData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
    }

  }
    const [dashData,setDashData] = useState(false)
    /* for doctor */
      const getDashboardData = async()=> {
          try {
              const {data} = await axios.post("http://localhost:5000/api/doctor/dashboard",{
                  
                  doctorId:doctorData._id
              })
              if(data.success) {
                  setDashData(data.info)
              }
          } catch (error) {
              console.log(error)
          }
      }
    const [doctorAppointments,setDoctorAppointments] = useState([])
    const getDoctorAppointments = async()=> {
        try {
            const {data} = await axios.post("http://localhost:5000/api/doctor/appointments",{
                doctorId:doctorData._id
            })
            
            if(data.success) {
                setDoctorAppointments(data.appointments.reverse())
            }
        } catch (error) {
            console.log(error)
        }
    }
    const value = {
      doctorData,
      setDoctorData,
      adminData,
      setAdminData,
      cancelAppointment,
      getAdminDashData,
      info,setInfo,
      cancelAppointmentByDoctor,
      completeAppointment,
      getDashboardData,
      dashData,
      doctorAppointments,
      setDoctorAppointments,
      getDoctorAppointments,
      appointments,
      setAppointments
    }
    const getDoctorData = async()=> {
      try {
        axios.defaults.withCredentials=true
        const {data} = await axios.get("http://localhost:5000/api/doctor/doctor-data")
        console.log(data)
        if(data.success) {
          setDoctorData(data.doctor)
        }
      } catch (error) {
        console.log(error)
      }
    }
    const getAdminData= async()=> {
      try {
        const {data} = await axios.get("http://localhost:5000/api/admin/is-admin")
        if(data.success) {
          setAdminData(true)
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=> {
      getDoctorData()
      getAdminData()

    },[])
  return (
    <context.Provider value={value}>
        {children}
    </context.Provider>

  )
}

export default Provider