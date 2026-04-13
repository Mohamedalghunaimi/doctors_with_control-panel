import React, { use, useContext, useEffect } from 'react'
import {useNavigate, useSearchParams} from "react-router-dom"
import axios from "axios"
import { context } from './Provider'
const Loading = () => {
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
    const {isAuth} = useContext(context)
    const nav = useNavigate()
    const setIsPaied = async() => {
        console.log("ccc")
        try {
        const {data} = await axios.post("http://localhost:5000/api/appointment/is-paied",{token})
        console.log(data)
        if(data.success) {
            nav("/appointments")
        }        
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(()=> {
        setIsPaied()

    },[isAuth])
  return (
    <div>
        LOADING

    </div>
  )
}

export default Loading
