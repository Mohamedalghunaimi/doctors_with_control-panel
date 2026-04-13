import React from 'react'
import Navbar from './compontents/Navbar'
import Sidebar from './compontents/Sidebar'
import DashboardContent from './compontents/DashboardContent'

const Dashboard = () => {
    
    return (
    <>
    <Navbar/>
    <div className='flex '>
        <Sidebar />
        <DashboardContent/>
    </div>
    
    </>
    )
}

export default Dashboard
