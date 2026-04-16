import React, { use, useContext, useEffect, useState } from 'react'
import Navbar from '../compontents/Navbar'
import Footer from '../compontents/Footer'
import { context } from './Provider'
import { useActionData } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaDownload } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Profile = () => {
    const {isAuth,setIsAuth}  = useContext(context)
    const [edit,setEdit] = useState(false)
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("")
    const [gender,setGender] = useState("")
    const [birthday,setBirthday] = useState("")
    const [address,setAddress] = useState({})
    const [image,setImage] = useState("");
    const [loading,setLoading] = useState(false)
    const  update = async() => {

        const formData = new FormData()
        formData.append("image",image||isAuth.image)
        formData.append("email",email)
        formData.append("phone",phone)
        formData.append("gender",gender)
        formData.append("birthday",birthday)
        formData.append("address",JSON.stringify(address))
        formData.append("userId",isAuth._id)
        console.log(JSON.stringify(address))
        try {
            setLoading(true)
            const {data} = await axios.post("http://localhost:5000/api/auth/update-profile",formData)
            if(data.success) {
                setIsAuth(data.user)
                toast.success("done!")

            } else {
                toast.error(data.message)
                
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }

    }
    useEffect(()=> {
        if(isAuth) {
            setEmail(isAuth.email)
            setPhone(isAuth.phone)
            setGender(isAuth.gender)
            setBirthday(isAuth.birthday)
            setAddress(isAuth.address)
            

        }
        

    },[isAuth])

    return isAuth? (
    <div className=''>
        <Navbar/>
        {edit?
        <form  className='container mx-auto mt-[30px] flex-col flex gap-[20px]'>
            <label htmlFor='image'  className=' relative block parent   w-fit overflow-hidden cursor-pointer' >
                <input  disabled={loading} onChange={(e)=>setImage(e.target.files[0])} hidden type='file' id='image'/>
                <img src={image?URL.createObjectURL(image):isAuth.image} className=' w-[200px] h-[200px] rounded-full' alt='' />
                <div className=' absolute items-center justify-center top-0 left-0 hidden child  w-[100%] h-[100%] flex rounded-full ' >
                    <FaDownload />
                </div>
            </label>
            <h1 className=' font-bold capitalize text-xl'>{isAuth.name}</h1>
            <p className=' w-[50%]'>
            <hr></hr>
            </p>
            <p className=' uppercase underline text-green-700'>contact informations</p>
            <div  className=' capitalize flex gap-[20px] items-center'>
                <span>email id:</span>
                <input  disabled={loading} required value={email} onChange={(e)=>setEmail(e.target.value)} type='email' className='border-none p-[5px]' placeholder={isAuth.email?isAuth.email:"update email here"} />
            </div>
            <div  className=' capitalize flex gap-[20px] items-center '>
                <span>phone:</span>
                <input  disabled={loading} required value={phone} onChange={(e)=>setPhone(e.target.value)} type='text' className='border-none p-[5px]' placeholder='update your phone' />
            </div>
            <div className=' capitalize flex gap-[20px] '>
                <span>address:</span>
                <span className=' flex flex-col gap-[5px]'>
                    <input  disabled={loading} required value={address.line1} onChange={(e)=>{
                        setAddress({...address,line1:e.target.value})

                    }
                    } type='text' placeholder=' line1' className='p-[5px] border-none' />
                    <input disabled={loading} required value={address.line2} onChange={(e)=>{
                        setAddress({...address,line2:e.target.value})
                        

                    }
                    } type='text' placeholder=' line2' className='p-[5px] border-none' />
                </span>
            </div>
            <p className=' uppercase underline text-green-700'>basic information</p>
            <div className=' capitalize flex gap-[20px]'>
                <span>gender:</span>
                <select  disabled={loading} required onChange={(e)=>setGender(e.target.value)} className=' border p-[5px]  border-gray-500 '>
                    <option value={"not selected"} >not selected</option>
                    <option value={"male"}>male</option>
                    <option value={"female"}>female</option>
                </select>
            </div>
            <div className=' capitalize flex gap-[20px] '>
                <span>birthday:</span>
    <DatePicker
      selected={birthday}
      onChange={(date) => setBirthday(date)}
    />
            </div>
            <button  onClick={(e)=>{
                e.preventDefault()
                update()

            }}   disabled={loading} className=' w-fit bg-blue-500 text-white border px-[30px] py-[10px] rounded-full'>
                {loading?"loading...":"save changes"}
            </button>
        </form>:
        <div className=' container mx-auto mt-[30px] flex flex-col gap-[20px]'>
            <img src={isAuth.image} className=' w-[200px] h-[200px] rounded-full' alt='' />
            <h1 className=' font-bold capitalize text-xl'>{isAuth.name}</h1>
            <p className=' w-[50%]'>
            <hr></hr>
            </p>
            <p className=' uppercase underline text-green-700'>contact informations</p>
            <div  className=' capitalize flex gap-[20px] '>
                <span>email id:</span>
                <span>{isAuth.email}</span>
            </div>
            <div  className=' capitalize flex gap-[20px] '>
                <span>phone:</span>
                <span>{isAuth.phone}</span>
            </div>
            <div className=' capitalize flex gap-[20px] '>
                <span>address:</span>
                <span>
                    <p>{isAuth.address.line1||"not selected"}</p>
                    <p>{isAuth.address.line2||"not selected"}</p>
                </span>
            </div>
            <p className=' uppercase underline text-green-700'>basic information</p>
            <div className=' capitalize flex gap-[20px]'>
                <span>gender:</span>
                <span>{isAuth.gender}</span>
            </div>
            <div className=' capitalize flex gap-[20px] '>
                <span>birthday:</span>
                <span>{isAuth.birthday}</span>
            </div>
            <button onClick={()=>setEdit(true)} className=' w-fit border-gray-800 border px-[30px] py-[10px] rounded-full'>
                edit
            </button>
        </div>}
        <Footer/>
    </div>
    ):(<></>)
}

export default Profile
