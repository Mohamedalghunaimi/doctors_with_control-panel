import axios from 'axios'
import React, { createContext,  useEffect,  useState } from 'react'
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
  const cancelAppointment = async(appointmentId,doctorId,function1)=> {
    try {
      const {data} = await axios.post("http://localhost:5000/api/admin/cancel",{
        appointmentId,doctorId
      })
      if(data.success) {
        function1()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const cancelAppointmentByDoctor = async(appointmentId,doctorId,fn) => {
    try {
      const {data} = await axios.post("http://localhost:5000/api/doctor/cancel",{
        appointmentId,doctorId
      })
      if(data.success) {
        fn()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const completeAppointment = async(appointmentId,doctorId,fn)=> {
    try {
      const {data} = await axios.post("http://localhost:5000/api/doctor/complete",{
        appointmentId,doctorId
      })
      if(data.success) {
        fn()
      }
    } catch (error) {
      console.log(error)
    }

  }
    const [dashData,setDashData] = useState(false)

      const getDashboardData = async()=> {
          try {
              const {data} = await axios.post("http://localhost:5000/api/doctor/dashboard",{
                  
                  doctorId:doctorData._id
              })
              console.log(data)
              if(data.success) {
                  setDashData(data.info)
              }
          } catch (error) {
              console.log(error)
          }
      }
    const [appointments,setAppointments] = useState([])
    const getAppointments = async()=> {
        try {
            const {data} = await axios.post("http://localhost:5000/api/doctor/appointments",{
                doctorId:doctorData._id
            })
            console.log(data)
            if(data.success) {
                setAppointments(data.appointments.reverse())
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
      appointments,
      getAppointments
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