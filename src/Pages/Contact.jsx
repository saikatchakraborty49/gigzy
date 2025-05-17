import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import {apiConnector} from '../Service/Operations/apiConnector'
import { contactEndPoints } from '../Service/apis';
import toast from 'react-hot-toast';

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  }=useForm()


    const onSubmit=async(data)=>{
        const toastId=toast.loading("Loading");
        try{
            console.log(data)
            const response=await apiConnector("POST",contactEndPoints.CONTACTUS_API,data)
            console.log(response)
            toast.success(response.data.message)
            reset();
        }catch(error){
            toast.error(error.response.data.message)
        }
        toast.dismiss(toastId);
    }

  return (
    <div className="min-h-screen w-screen bg-richblack-900 text-richblack-100 px-6 py-16">
      {/* <div className="max-w-2xl mx-auto"> */}
      <div className="w-1/2 mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-yellow-50 text-center">Contact Us</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-1 text-richblack-300">Name</label>
            <input
              type="text"
            //   name="name"
              {...register("name")}
            //   value={form.name}
            //   onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-richblack-800 text-white border border-richblack-700"
            />
          </div>
          <div>
            <label className="block mb-1 text-richblack-300">Email</label>
            <input
              type="email"
            //   name="email"
            //   value={form.email}
            //   onChange={handleChange}
                {...register("email")}
              required
              className="w-full px-4 py-2 rounded bg-richblack-800 text-white border border-richblack-700"
            />
          </div>
          <div>
            <label className="block mb-1 text-richblack-300">Message</label>
            <textarea
            //   name="message"
            //   value={form.message}
            //   onChange={handleChange}
            {...register("message")}
              rows="5"
              required
              className="w-full px-4 py-2 rounded bg-richblack-800 text-white border border-richblack-700"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-100 text-black font-semibold py-2 rounded hover:bg-yellow-200 transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
