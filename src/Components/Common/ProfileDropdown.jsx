import React from 'react'
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { PiSignOutBold } from "react-icons/pi";
import {logout} from "../../Service/Operations/authApi"
import { useNavigate } from 'react-router';

const ProfileDropdown = () => {
    const {user}=useSelector((state)=>state.profile);
    const navigate=useNavigate();
      const dispatch=useDispatch();
      const handleLogout=async()=>{
        dispatch(logout(navigate));
      }
  return (
    <div className='relative group'>
        <img alt="User image" className='w-[35px] h-[35px] rounded-full' src={user.profilePicture}/>
        <div className='invisible -translate-x-[4rem] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-1 transition-all duration-500 absolute flex flex-col items-center -z-10 group-hover:visible'>
          <div className='h-[15px] w-[15px] bg-richblack-700 rotate-45'></div>
          <div className='flex flex-col justify-center items-center w-[160px] translate-y-[-7.5px] bg-richblack-700 text-pure-greys-5 p-2 rounded-md'>
            <Link className='px-8 py-2 hover:bg-richblack-800 hover:text-yellow-50' to={"/dashboard/my-profile"}>Dashboard</Link>
            <div>
              <button onClick={handleLogout} className="flex gap-1 items-center px-8 py-2 w-full text-pure-greys-5 hover:bg-richblack-800 hover:text-yellow-50">
                <PiSignOutBold />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ProfileDropdown