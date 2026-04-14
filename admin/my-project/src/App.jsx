
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/doctor/Dashboard'
import Login from './pages/login/login'
import { useContext } from 'react'
import { context } from './pages/Provider'
import Profile from './pages/doctor/Profle'
import { Toaster,  } from "sonner";
import AdminDashboard from './pages/admin/AdminDashboard'
import Appointments from './pages/admin/Appointments'
import DoctorsList from './pages/admin/DoctorsList'
import AddDoctor from './pages/admin/AddDoctor'
import DoctorAppointments from './pages/doctor/DoctorAppointments'

function App() {
  const {doctorData,adminData} = useContext(context)

  return (
    <>
    <Toaster   position="top-right"
  expand
  richColors
  closeButton />

    <Routes>
      <Route path='/' element={<><Login /></>} />
      {doctorData&&<>
      <Route path='/doctor/dashboard' element={<><Dashboard /></>} />
      <Route path='/doctor/appointments' element={<><DoctorAppointments/></>} />
      <Route path='/doctor/profile' element={<><Profile /></>} />
      </>}
      {adminData&&<>
      <Route path='/admin/dashboard' element={<><AdminDashboard/></>}/>
      <Route path='/admin/appointments' element={<><Appointments/></>}/>
      <Route path='/admin/list' element={<><DoctorsList /></>} />
      <Route path='/admin/add-doctor' element={<><AddDoctor/></>} />
      </>}
    </Routes>
    </>
  )
}

export default App
