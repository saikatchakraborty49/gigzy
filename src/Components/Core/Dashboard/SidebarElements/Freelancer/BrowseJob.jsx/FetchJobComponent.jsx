import React from 'react'
import IconBtn from '../../../../../Common/IconBtn';
import { formattedDate } from '../../../../../../Utils/dateFormatter';
import { IoMdSend } from "react-icons/io";
import { useNavigate } from 'react-router';
import { MdOutlineLaunch } from "react-icons/md";


const FetchJobComponent = (props) => {
    const {Job}=props;
    const {clientId}=Job;

    const navigate=useNavigate();

  return (
    <div className="my-10 flex flex-col gap-y-3 rounded-md border-[1px] text-richblack-25 border-richblack-700 bg-richblack-800 p-8 px-12 ">
            <div className='flex justify-between'>
                {/* Title */}
                <p className="text-richblack-5 font-bold text-2xl">{Job.title}</p>
                <div className='flex gap-2 items-center'>
                    
                    {/* Sent proposal  */}
                    <button 
                    onClick={()=>{
                        navigate(`/dashboard/send-proposal/${Job._id}`)
                    }} 
                    className='bg-[#10e32c] text-black py-2 px-2 rounded-md hover:scale-105 flex gap-2'>
                           Send Proposal
                           <IoMdSend fontSize={24} />
                    </button>
                </div>
            </div>
            {/* Description */}
            <p><span className='text-bold'>Description:</span>&nbsp;{Job.description}</p>
            {/* Budget */}
            <p><span className='text-bold'>Budget:</span>&nbsp;₹{Job.budget}</p>
            {/* Last Updated */}
            <p><span className='text-bold'>Last Updated:</span>&nbsp;{formattedDate(Job.updatedAt)}</p>
            {/* Deadline */}
            <p><span className='text-bold'>Dead Line:</span>&nbsp;{formattedDate(Job.deadline)}</p>
            {/* Client  */}
            <div className='bg-richblack-900 py-3 px-4 rounded-md max-w-fit border-2 border-richblack-700'>
                <p className='font-bold text-md'>Client:</p>
                <div className='flex gap-2 items-center'>
                    <img alt="Client image" className='w-[45px] h-[45px] rounded-full' src={clientId.profilePicture}/>
                    <div>
                        <p className='text-richblack-5 font-bold'>{clientId.firstName}&nbsp;{clientId.lastName}</p>
                        <p className="text-richblack-100 flex items-center gap-1 hover:underline"><a href= {`mailto:${clientId.email}`}>{clientId.email}</a><MdOutlineLaunch /></p>
                        
                    </div>
                </div>
            </div>

    
        </div>
  )
}

export default FetchJobComponent