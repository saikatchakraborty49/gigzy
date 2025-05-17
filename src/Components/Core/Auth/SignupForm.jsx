import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { setSignupData } from '../../../Slices/authSlice';
import { sendOtp } from '../../../Service/Operations/authApi';

const SignupForm = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate()


    const{
        register,
        handleSubmit,
        reset,
        formState:{errors},
    }=useForm();

    const [accountType,setAccountType]=useState("Freelancer")

    const tabData = [
        {
          id: 1,
          tabName: "Freelancer",
        },
        {
          id: 2,
          tabName: "Client",
        },
    ]

    const [showPassword,setShowPassword]= useState(false)
    const [showConfirmPassword,setShowConfirmPassword]= useState(false)

    const onSubmit = (data) => {
        if(data.Password!=data.ConfirmPassword){
            toast.error('Password and Confirm Password doesnot match');
            return ;
        }
        // data.accountType=accountType
        // console.log(data)
        const firstName=data.FirstName;
        const lastName=data.LastName;
        const email=data.Email;
        const password=data.Password;
        const confirmPassword=data.ConfirmPassword;
        // const accountType=data.accountType;
        const formData={
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          accountType,
        }
        dispatch(setSignupData(formData))
      // Send OTP to user for verification
      dispatch(sendOtp(formData.email, navigate))

      // Reset
      reset();
      setAccountType("Freelancer")
      };
  return (
    <div className='w-10/12 md:w-4/12'>
        <p className='text-3xl font-bold text-richblack-5'>Join The Gigzy Community</p>

        {/* Tabs */}
      <div
        style={{
          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        }}
        className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full w-full"
      >
        {tabData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAccountType(tab.tabName)}
            className={`${
              accountType === tab.tabName
                ? "bg-richblack-900 text-richblack-5"
                : "bg-transparent text-richblack-200"
            } py-2 px-5 rounded-full transition-all duration-200 w-6/12`}
          >
            {tab?.tabName}
          </button>
        ))}
      </div>

        <form onSubmit={handleSubmit(onSubmit)} className='mt-3 flex flex-col justify-center gap-2 w-full'>
            <div className='flex gap-2'>
                <label className='w-full'>First Name <sup className="text-pink-200">*</sup>
                    <br></br>
                    <input 
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                    className='w-full px-1 bg-richblack-500 rounded-lg py-2 focus:outline-none '
                    placeholder='Enter First Name'
                    {...register("FirstName",{required:true})}
                    ></input>
                </label>
                <label className='w-full'>Last Name <sup className="text-pink-200">*</sup>
                    <br></br>
                    <input 
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                    className='w-full px-1 bg-richblack-500 rounded-lg py-2 focus:outline-none '
                    placeholder='Enter Last Name'
                    {...register("LastName",{required:true})}
                    ></input>
                </label>
            </div>            
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
            <div className='flex gap-2'>
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
            </label>
            <label className='relative w-full'>Confirm Password<sup className="text-pink-200">*</sup>
                <br></br>
                <input 
                type={showConfirmPassword?'text':'password'}
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                className='w-full px-1 bg-richblack-500 rounded-lg py-2 focus:outline-none'
                placeholder='Enter Confirm Password'
                {...register("ConfirmPassword",{required:true})}
                ></input>
                <span className='absolute right-3 top-[33px]'
                    onClick={()=>setShowConfirmPassword((prev)=>!prev)}
                >
                    {showConfirmPassword==false?
                    <FaEye fontSize={24} fill="#AFB2BF"/>
                    :
                    <FaEyeSlash fontSize={24} fill="#AFB2BF"/>
                    }
                </span>
            </label>
            </div>
            <button
            className='mt-1 bg-yellow-100 text-black px-1 rounded-lg py-2 hover:bg-yellow-200'
            type="submit"
            >Sign Up</button>
        </form>
    </div>
  )
}

export default SignupForm