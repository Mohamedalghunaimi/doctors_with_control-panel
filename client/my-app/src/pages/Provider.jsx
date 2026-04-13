import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
export const context = createContext()

const Provider = ({children}) => {
    const toTop = ()=> {
        window.scrollTo(0,0)
    }
    const [appointments,setAppointments] = useState([])
    const [isAuth,setIsAuth] = useState(false)
    const [dbDoctors,setDbDoctors] = useState([])
    const value = {
        toTop,appointments,setAppointments,isAuth,setIsAuth,
        dbDoctors,setDbDoctors
    }
    const getUserData = async()=> {
        try {
            axios.defaults.withCredentials = true;
            const {data} = await axios.get("http://localhost:5000/api/auth/is_auth");
            console.log(data)
            if(data.success) {
                setIsAuth(data.user)
            }
        } catch (error) {
            console.error(error)
        }
    }
    const getAllDoctors = async()=> {
        try {
            const {data} = await axios.get("http://localhost:5000/api/doctor/doctors")
            if(data.success) {
                setDbDoctors(data.doctors)
            } 
        } catch (error) {
            
        }
    }
    useEffect(()=> {
        getUserData()
        getAllDoctors()

    },[])
    return (
    <context.Provider value={value}>
        {children}
    </context.Provider>
    )
}

export default Provider
