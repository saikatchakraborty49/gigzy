import React, { useEffect } from 'react'
import Sidebar from '../Components/Core/Dashboard/Sidebar'
import { Outlet, useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../Service/Operations/apiConnector';
import { profileEndPoints } from '../Service/apis';
import { setUser } from '../Slices/profileSlice';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const dispatch=useDispatch();
  const location=useLocation();
  useEffect(() => {
    async function fetchUser(){
      try{
        const response=await apiConnector("GET",profileEndPoints.GET_USER_PROFILE_API)
        console.log(response)
        dispatch(setUser(response.data.user))
        // toast.success(response.data.message);
      }catch(error){
        toast.error(error?.response?.data?.message)
        console.log(error)
      }
    }
    fetchUser();
  }, [location.pathname])
  return (
    <div className='w-full min-h-screen flex'>
      <Sidebar/>
      <div className="mx-auto w-11/12 max-w-[1000px] py-10">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard