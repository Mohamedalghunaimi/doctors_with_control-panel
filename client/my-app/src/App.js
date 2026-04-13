import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
  import { ToastContainer, toast } from 'react-toastify';
import AllDoctors from './pages/AllDoctors';
import SingleDoctor from './pages/SingleDoctor';
import Appointment from './pages/Appointment';
import Profile from './pages/Profile';
import { useContext } from 'react';
import { context } from './pages/Provider';
import Loading from './pages/Loading';

function App() {
  const {isAuth} = useContext(context)
  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path='/' element={<><Home/></>} />
      <Route path='/login' element={<><Login /></>} />
      <Route path='/all-doctors' element={<><AllDoctors /></>} />
      <Route path='/doctor/:id' element={<><SingleDoctor /></>} />
      {isAuth&&
      <>
      <Route path='/appointments' element={<><Appointment /></>} />
      <Route path='/profile' element={<><Profile /></>} />
      <Route path='/success' element={<><Loading /></>} />
      </>

      }
    </Routes>
    </>
  );
}

export default App;
