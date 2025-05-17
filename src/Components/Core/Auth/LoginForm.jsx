import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router';
import { login } from '../../../Service/Operations/authApi';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const{
        register,
        handleSubmit,
        formState:{errors},
    }=useForm();

    const [showPassword,setShowPassword]= useState(false)

    const onSubmit = (data) => {
        const email=data.Email;
        const password=data.Password;
    dispatch(login(email, password, navigate))
      };
  return (
    <div className='w-10/12 md:w-4/12'>
        <p className='text-3xl font-bold text-richblack-5'>Welcome Back</p>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-3 flex flex-col justify-center gap-2 w-full'>
            <label className='w-full'>Email Address<sup className="text-pink-200">*</sup>
                <br></br>
                <input 
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                className='w-full px-1 bg-richblack-500 rounded-lg py-2 focus:outline-none '
                placeholder='Enter Email Address'
                {...register("Email",{required:true})}
                ></input>
            </label>
            <label className='relative w-full'>Password<sup className="text-pink-200">*</sup>
                <br></br>
                <input 
                type={showPassword?'text':'password'}
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                className='w-full px-1 bg-richblack-500 rounded-lg py-2 focus:outline-none'
                placeholder='Enter Password'
                {...register("Password",{required:true})}
                ></input>
                <span className='absolute right-3 top-[33px]'
                    onClick={()=>setShowPassword((prev)=>!prev)}
                >
                    {showPassword==false?
                    <FaEye fontSize={24} fill="#AFB2BF"/>
                    :
                    <FaEyeSlash fontSize={24} fill="#AFB2BF"/>
                    }
                </span>
                <Link to='/forgot-password' className='flex justify-end'>
                    <p className='text-blue-100 text-sm'>
                        Forgot Password
                    </p>
                </Link>
            </label>
            <button
            className='bg-yellow-100 text-black px-1 rounded-lg py-2 hover:bg-yellow-200'
            type="submit"
            >Sign In</button>
        </form>
    </div>
  )
}

export default LoginForm