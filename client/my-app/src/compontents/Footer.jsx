import React from 'react'
import { assets } from '../assets_frontend/assets'

const Footer = () => {
  return (
    <>
    <div className=' container flex-wrap capitalize mx-auto mt-[100px] flex justify-between pb-[10px] '>
        <div className=' w-[500px]'>
            <img src={assets.logo} alt='' />
            <p className=' mt-[10px] text-sm font-semibold text-gray-500 leading-[1.6]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, modi eveniet ipsum velit odit rerum? Amet aliquid deserunt mollitia quaerat rem. Cum deleniti perferendis illo suscipit quos perspiciatis quam error!</p>
        </div>
        <ul>
            <li className=' font-semibold text-2xl capitalize mb-[10px]'>company</li>
            <li>home</li>
            <li>about us</li>
            <li>delivery</li>
            <li>privacy policy</li>
        </ul>
        <ul>
            <li  className=' font-semibold text-2xl capitalize mb-[10px]'>get in touch</li>
            <li>+1234-456-5555</li>
            <li>mohammed@gmail.com</li>
        </ul>
    </div>
    <div className=' border-t-[1px] text-center capitalize py-[20px]'>
        copyright 2024 &copy; piescripto.com - all right reversed


    </div>
    </>
  )
}

export default Footer
