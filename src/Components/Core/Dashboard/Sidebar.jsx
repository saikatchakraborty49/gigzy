import React from 'react'
import { sidebarLinks } from '../../../data/DashboardLinks'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { PiSignOutBold } from "react-icons/pi";
import {logout} from "../../../Service/Operations/authApi"
import { useNavigate } from 'react-router';

const Sidebar = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleLogout=async()=>{
    dispatch(logout(navigate));
  }
    const {user}=useSelector((state)=>state.profile)
    // console.log(user)
  return (
    <div className='text-white flex flex-col min-w-[200px] bg-richblack-800 border-r-[1px] border-r-richblack-700 min-h-full'>
        <div className='flex flex-col'>
            {sidebarLinks.map((link)=>{
                if(link.type && link.type!=user.role) return null;
                return <SidebarLink link={link}/>

            })}
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />

        {/* Settings button */}
        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings",icon:"VscSettingsGear"}}
          />          
        </div>

        {/* Log out button  */}
        <div>
          <button onClick={handleLogout} className="flex gap-1 items-center px-8 py-2 w-full text-richblack-300 hover:bg-yellow-800 hover:text-yellow-50">
            <PiSignOutBold />
            <span>Log Out</span>
          </button>
        </div>
    </div>
  )
}

export default Sidebar