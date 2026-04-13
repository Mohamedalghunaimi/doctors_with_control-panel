import React, { useContext, useEffect } from 'react'
import Navbar from '../compontents/Navbar'
import Hero from '../compontents/Hero'
import Speciality from '../compontents/Speciality'
import TopDoctors from '../compontents/TopDoctors'
import Book from '../compontents/Book'
import Footer from '../compontents/Footer'
import { context } from './Provider'

const Home = () => {
    const {toTop} = useContext(context)
    useEffect(()=>{
      toTop()
    },[])
  return (
    <>
    <Navbar />
    <Hero />
    <Speciality />
    <TopDoctors />
    <Book />
    <Footer />
    </>

  )
}

export default Home
