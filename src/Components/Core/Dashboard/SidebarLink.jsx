import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"


const SidebarLink = (props) => {
    const {link}=props;
    const Icon=Icons[link.icon];
    const location = useLocation()
    const dispatch = useDispatch()
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

  return (
    <NavLink
      to={link.path}
    //   onClick={() => dispatch(resetCourseState())}
      className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-yellow-800 text-yellow-50"
          : "bg-opacity-0 text-richblack-300"
      } transition-all duration-200 hover:bg-yellow-800 hover:text-yellow-50`}
    >
        <div className='flex gap-1 items-center'>
            <Icon className="text-lg" />
            {link.name}
        </div>
    </NavLink>
  )
}

export default SidebarLink