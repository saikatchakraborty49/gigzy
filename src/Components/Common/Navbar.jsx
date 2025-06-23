import React from 'react'
import Logo from '../../Assets/gigzy.png'
// import Logo from '../Common/Logo'
import { NavbarLinks } from '../../data/NavbarLinks'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MdKeyboardArrowDown } from "react-icons/md";
import { apiConnector } from "../../Service/Operations/apiConnector"
import { useState,useEffect } from 'react'
import ProfileDropdown from './ProfileDropdown'
import { categoryEndPoints } from '../../Service/apis'
import Balance from './Balance'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const location=useLocation()
  const [open,setOpen]=useState(false);
  function matchRoute(path) {
    return matchPath(path,location.pathname)
  }
  const {token}=useSelector((state)=>(state.auth))

  // Fetch categories from API
  const [subLinks,setSubLinks]=useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiConnector("GET",categoryEndPoints.GET_CATEGORIES);
        setSubLinks(response.data);
        
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div className='z-10 w-full flex justify-center items-center text-pure-greys-5 border-b-2 border-richblack-700 bg-richblack-800'>
        <div className='hidden md:flex w-11/12 h-14 justify-between items-center'>
          <img src={Logo} alt='logo' width={100}></img>
          {/* <Logo/> */}
          <nav>
            <div 
            className='flex gap-4'
            >
            {NavbarLinks.map((link,index)=>(
              <div 
              // className='hover:scale-105'
              >
              {link.title==='Category'?
                <div className='group relative'>
                  <div className='relative flex gap-1 items-center'>
                    <p>Category</p>
                    <MdKeyboardArrowDown fontSize={20} />
                  </div>
                  <div className='invisible z-[1000] group-hover:visible -translate-x-[22px] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:-translate-y-1 transition-all duration-500'>
                    <div className='absolute flex flex-col items-center -z-10'>
                      <div className='h-[15px] w-[15px] bg-white rotate-45'></div>
                      <div className='w-[200px] bg-white translate-y-[-7.5px] text-richblack-800 p-2 rounded-md'>
                      {subLinks.map((subLink, i) => (
                                <Link
                                to={`/category/${subLink._id}`}
                                key={i}
                              >
                                <div className="rounded-lg bg-transparent py-4 pl-2 hover:bg-richblack-50">
                                  <p>{subLink.name}</p>
                                </div>
                              </Link>
                              
                              ))}
                      </div>
                    </div>
                  </div>
                </div>
                :
                <Link to={link.path}>
                  <div className={`${matchRoute(link.path)?'text-yellow-5':''}`}>
                    {link.title}
                  </div>
                </Link>
              }
              </div>
            ))}
            </div>
      
          </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {token === null && (
            <Link to="/log-in">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/sign-up">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && 
          <>
            <ProfileDropdown/>
            <Balance/>
          </>
          }
        </div>
        </div>
        {/* responsive */}
        <div className='relative md:hidden flex justify-between w-full px-1 items-center'>
          <img src={Logo} alt='logo' width={100}></img>
          {open?
          <button
            onClick={()=>{setOpen(false)}}
          >
          <IoClose/>
          </button>
          :
          <button
            onClick={()=>{setOpen(true)}}
          >
          <GiHamburgerMenu/>
          </button>
          }
        </div>
        <div className={`${open?'flex':'hidden'} md:hidden  translate-x-2 w-1/4 text-pure-greys-5 border-2 border-richblack-700 bg-richblack-800 absolute top-11 right-3 p-2 rounded-md`}>
          <nav>
            <div className='flex flex-col gap-4'>
            {NavbarLinks.map((link,index)=>(
              <div 
              // className='hover:scale-105'
              >
              {link.title==='Category'?
                <div className='group relative'>
                  <div className='relative flex gap-1 items-center'>
                    <p>Category</p>
                    <MdKeyboardArrowDown fontSize={20} />
                  </div>
                  <div className='invisible z-[1000] group-hover:visible -translate-x-[22px] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:-translate-y-1 transition-all duration-500'>
                    <div className='absolute flex flex-col items-center -z-10'>
                      <div className='h-[15px] w-[15px] bg-white rotate-45'></div>
                      <div className='w-[200px] bg-white translate-y-[-7.5px] translate-x-[-90px] text-richblack-800 p-2 rounded-l-md rounded-br-md'>
                      {subLinks.map((subLink, i) => (
                                <Link
                                to={`/category/${subLink._id}`}
                                key={i}
                              >
                                <div className="rounded-lg bg-transparent py-4 pl-2 hover:bg-richblack-50">
                                  <p>{subLink.name}</p>
                                </div>
                              </Link>
                              
                              ))}
                      </div>
                    </div>
                  </div>
                </div>
                :
                <Link to={link.path}>
                  <div className={`${matchRoute(link.path)?'text-yellow-5':''}`}>
                    {link.title}
                  </div>
                </Link>
              }
              </div>
            ))}
            </div>
            <div className='h-1 bg-white opacity-10 w-10/12'></div>
            <div className="mt-2 gap-y-1 flex flex-col">
          {token === null && (
            <Link to="/log-in">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 w-10/12">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/sign-up">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 w-10/12">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && 
          <>
            <ProfileDropdown/>
            <Balance/>
          </>
          }
        </div>
          </nav>
        </div>
    </div>
  )
}

export default Navbar