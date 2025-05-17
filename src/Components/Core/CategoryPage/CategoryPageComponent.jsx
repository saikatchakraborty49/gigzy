import React from 'react'
import IconBtn from '../../Common/IconBtn';
import { formattedDate } from '../../../Utils/dateFormatter';
import { IoMdSend } from "react-icons/io";

const CategoryPageComponent = (props) => {
    const {Job}=props;
    const {clientId}=Job;
  return (
    <div className="my-10 flex flex-col gap-y-3 rounded-md border-[1px] text-richblack-25 border-richblack-700 bg-richblack-800 p-8 px-12 ">
            <div className='flex justify-between'>
                {/* Title */}
                <p className="text-richblack-5 font-bold text-2xl">{Job.title}</p>
                {/* <div className='flex gap-2 items-center'> */}
                    
                    {/* Sent proposal  */}
                    {/* <button 
                    onClick={handleDelete} 
                    className='bg-[#10e32c] text-black py-2 px-2 rounded-md hover:scale-105 flex gap-2'>
                           Send Proposal
                           <IoMdSend fontSize={24} />
                    </button> */}
                {/* </div> */}
            </div>
            {/* Description */}
            <p>Description:&nbsp;{Job.description}</p>
            {/* Budget */}
            <p>Budget:&nbsp;₹{Job.budget}</p>
            {/* Last Updated */}
            <p>Last Updated:&nbsp;{formattedDate(Job.updatedAt)}</p>
            {/* Deadline */}
            <p>Dead Line:&nbsp;{formattedDate(Job.deadline)}</p>
            {/* Client  */}
            {/* <div className='bg-richblack-900 py-3 px-4 rounded-md max-w-fit'>
                <p className='font-bold text-md'>Client:</p>
                <div className='flex gap-2 items-center'>
                    <img alt="Client image" className='w-[45px] h-[45px] rounded-full' src={clientId.profilePicture}/>
                    <div>
                        <p className='text-richblack-5 font-bold'>{clientId.firstName}&nbsp;{clientId.lastName}</p>
                        <p className="text-richblack-100"><a href="mailto:someone@example.com">{clientId.email}</a></p>
                    </div>
                </div>
            </div> */}

    
        </div>
  )
}

export default CategoryPageComponent