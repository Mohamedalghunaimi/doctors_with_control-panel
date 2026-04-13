import { use, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { context } from '../Provider'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [isAdmin,setIsAdmin]= useState(true)
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const {doctorData,setDoctorData,adminData,setAdminData} = useContext(context)
  const nav= useNavigate()
  const login = async()=> {
    try {
      if(!isAdmin){
      axios.defaults.withCredentials= true;
      const {data} = await axios.post("http://localhost:5000/api/doctor/login",{
        email,password
      })
      console.log(data)
      if(data.success) {
        setDoctorData(data.doctor)
        nav("/doctor/dashboard")
      }
    } else {
        axios.defaults.withCredentials= true;
        const {data} = await axios.post("http://localhost:5000/api/admin/login",{
          email,password
        })
        if(data.success) {
          nav("/admin/dashboard")
          setAdminData(true)
        }
    }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=> {
    if(doctorData) {
      nav("/doctor/dashboard")
    }
    if(adminData) {
      nav("/admin/dashboard")
    }

  },[doctorData,adminData])

  return (
    <div className=' h-screen flex justify-center items-center'>
      <form className='p-[20px] flex flex-col gap-[20px] capitalize  shadow-lg w-[400px]'>
        <h1 className=' text-center capitalize  font-bold  text-xl'><span className=' text-blue-700' >{isAdmin?"admin":"doctor"} </span>login</h1>
        <div className=' flex flex-col gap-[3px] '>
          <label htmlFor='email'>email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='email here' className='p-[5px] outline-none border' />
        </div>
        <div className=' flex flex-col gap-[3px] '>
          <label htmlFor='password'>password</label>
          <input value={password} onChange={(e)=>setPassword(e.target.value)}  type='password' placeholder='password here' className='p-[5px] outline-none border' />
        </div>
        <button onClick={(e)=> {
          e.preventDefault();
          login()
        }} className=' text-xl cursor-pointer font-semibold bg-blue-500 text-white py-[10px] rounded-md capitalize'>
          login
        </button>
        <div>
          {isAdmin?<p className=' text-sm font-semibold'>
            doctor's login? <span onClick={()=>setIsAdmin(false)} className='text-blue-600 cursor-pointer'>click here</span>
          </p>:<p  className=' text-sm font-semibold'>admin's login? <span  onClick={()=>setIsAdmin(true)}  className='text-blue-600 cursor-pointer'>click here</span></p>}
        </div>
      </form>

      
    </div>
  )
}

export default Login
