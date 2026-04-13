import React, { useState } from 'react'
import Navbar from './compontents/Navbar'
import Sidebar from './compontents/Sidebar'
import { assets } from '../../assets_admin/assets'
import axios from 'axios'
import { useContext } from 'react'
import { context } from '../Provider'
import { toast } from 'sonner'

const AddDoctor = () => {
    const {adminData} = useContext(context)
    const [img,setImg] = useState("");
    const [name,setName] = useState("")
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const [address,setAddress] = useState({})
    const [speciality,setSpeciality] = useState("")
    const [fees,setFees] = useState(0);
    const [experience,setExperience] = useState("")
    const [about,setAbout] = useState("")
    const [available,setAvailable] = useState(false)
    const [degree,setDegree] = useState("")
    const [loading,setLoading] = useState(false)
    const addDoctor = async()=> {
        const formData = new FormData();
        img&&formData.append("image",img)
        formData.append("name",name)
        formData.append("email",email)
        formData.append("password",password)
        formData.append("address",JSON.stringify(address))
        formData.append("experience",experience)
        formData.append("about",about)
        formData.append("speciality",speciality)
        formData.append("fees",Number(fees))
        formData.append("available",available)
        formData.append("degree",degree)
        try {
            setLoading(true)
            const {data} = await axios.post("http://localhost:5000/api/admin/add-doctor",formData)
            if(data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)

            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }

    }
    console.log(adminData)
    



  return (
    <div >
        <Navbar />
        <div className=' flex'>
            <Sidebar />
            <div className='flex-1 p-[20px] bg-gray-100'>
                <h1 className=' capitalize text-2xl font-semibold'>add doctor</h1>
                <form className=' p-[20px] bg-white mt-[20px] lg:w-[80%] shadow-md border-[1px] border-gray-300'>
                    <div className=' mb-[20px]'>
                        <label htmlFor='img' className='cursor-pointer'>
                            <input disabled={loading}  onChange={(e)=>setImg(e.target.files[0])} type='file' id='img' hidden/>
                            <img src={img?URL.createObjectURL(img):assets.upload_area} className='w-[150px] h-[150px] rounded-full' alt='' />
                        </label>
                        <p className=' capitalize text-xl font-semibold text-gray-800'>upload doctor picture</p>
                    </div>
                    <div className=' flex justify-between gap-[10px]  flex-wrap'>
                        <div className='flex flex-col gap-[5px] w-[100%] lg:w-[49%]'>
                            <label  className=' capitalize font-semibold'>your name</label>
                            <input disabled={loading}  type='text'value={name} onChange={(e)=>setName(e.target.value)}  className='border-[1px] border-gray-300 p-[5px]' placeholder='name here' />
                        </div>
                        <div className='flex flex-col gap-[5px] w-[100%] lg:w-[49%]'>
                            <label  className=' capitalize font-semibold'>speciality</label>
                            <select disabled={loading}  onChange={(e)=>setSpeciality(e.target.value)}  className='border-[1px] border-gray-300 p-[5px]'>
                                <option>select speciality</option>
                                <option value={"General physician"}>General physician</option>
                                <option value={"Gynecologist"}>Gynecologist</option>
                                <option value={"Dermatologist"}>Dermatologist</option>
                                <option value={"Pediatricians"}>Pediatricians</option>
                                <option value={"Neurologist"}>Neurologist</option>
                                <option value={"Gastroenterologist"}>Gastroenterologist</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-[5px]  w-[100%] lg:w-[49%]'>
                            <label className=' capitalize font-semibold'>doctor email</label>
                            <input disabled={loading}  type='text' value={email} onChange={(e)=>setEmail(e.target.value)} className='border-[1px] border-gray-300 p-[5px]' placeholder='email here' />
                        </div>
                        <div className='flex flex-col gap-[5px]  w-[100%] lg:w-[49%]'>
                            <label  className=' capitalize font-semibold'>degree</label>
                            <input disabled={loading}  type='text' value={degree} onChange={(e)=>setDegree(e.target.value)} className='border-[1px] border-gray-300 p-[5px]' placeholder='degree here' />
                        </div>
                        <div className='flex flex-col gap-[5px]  w-[100%] lg:w-[49%]'>
                            <label  className=' capitalize font-semibold'>set password</label>
                            <input type='password'value={password} onChange={(e)=>setPassword(e.target.value)} className='border-[1px] border-gray-300 p-[5px]' placeholder='password here' />
                        </div>
                        <div className='flex flex-col  w-[100%] lg:w-[49%]'>
                            <lable className=' capitalize font-semibold'>address</lable>
                            <div className=' flex flex-col gap-[5px]'>
                                <input disabled={loading}  type='text' value={address?address.line1:""} onChange={(e)=> {
                                    let copy = structuredClone(address)
                                    copy.line1 = e.target.value
                                    setAddress(copy)
                                }} className='border-[1px] border-gray-300 p-[5px]' placeholder='address1' />
                                <input disabled={loading}  type='text' value={address?address.line2:""} onChange={(e)=> {
                                    let copy = structuredClone(address)
                                    copy.line2 = e.target.value
                                    setAddress(copy)
                                }}  className='border-[1px] border-gray-300 p-[5px]' placeholder='address2' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-[5px]  w-[100%] lg:w-[49%]'>
                            <label  className=' capitalize font-semibold'>experience</label>
                            <select disabled={loading}   onChange={(e)=>setExperience(e.target.value)} className='border-[1px] border-gray-300 p-[5px]'>
                                <option value={"1year"}>1year</option>
                                <option value={"2year"}>2year</option>
                                <option value={"3year"}>3year</option>
                                <option value={"4year"}>4year</option>
                                <option value={"5year"}>5year</option>
                                <option value={"6year"}>6year</option>
                                <option value={"7year"}>7year</option>
                                <option value={"8year"}>8year</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-[5px]  w-[100%] lg:w-[49%]'>
                            <label  className=' capitalize font-semibold'>fees</label>
                            <input disabled={loading}  type='number'value={fees} onChange={(e)=>setFees(e.target.value)} className='border-[1px] border-gray-300 p-[5px]' placeholder='fees here' />
                        </div>
                        <div className='flex flex-col gap-[5px] w-[100%]'>
                            <label  className=' capitalize font-semibold'>about doctor</label>
                            <textarea disabled={loading}  value={about} onChange={(e)=>setAbout(e.target.value)} className=' min-h-[200px] border-[1px] border-gray-300 p-[5px]'></textarea>
                        </div>
                        <div className=' flex items-center gap-[5px]  w-[100%] lg:w-[49%]'>
                            <input disabled={loading}  type='checkbox' checked={available} onChange={(e)=>setAvailable(e.target.checked)} />
                            available
                        </div>
                        <button type='submit'  onClick={(e)=> {
                            e.preventDefault()
                            addDoctor()

                        }} className=' py-[10px] px-[20px] rounded-lg cursor-pointer capitalize bg-blue-500 text-white'>
                            {loading?"loading...":"add doctor"}
                        </button>
                    </div>

                </form>

            </div>
        </div>
    </div>

  )
}

export default AddDoctor
