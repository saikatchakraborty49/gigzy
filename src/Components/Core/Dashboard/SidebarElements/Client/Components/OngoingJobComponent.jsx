import React from 'react'
import { formattedDate } from '../../../../../../Utils/dateFormatter'
import { MdOutlinePendingActions } from "react-icons/md"
import { MdOutlineLaunch } from "react-icons/md";
import IconBtn from '../../../../../Common/IconBtn';
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router';
import SeeMoreOngoingJob from './SeeMoreOngoingJob';

const OngoingJobComponent = ({ Job }) => {
  // console.log(Job)
  const navigate=useNavigate();
  const {freelancerId}=Job;
  return (
    <div className="my-10 flex flex-col gap-y-3 rounded-md border-[1px] text-richblack-25 border-richblack-700 bg-richblack-800 p-8 px-12">
      <div className='flex justify-between'>
        <p className="text-richblack-5 font-bold text-2xl">{Job.title}</p>
        <div className='flex gap-2 items-center text-yellow-500'>
          <MdOutlinePendingActions size={24} />
          <span className="text-lg font-semibold">In Progress</span>
        </div>
      </div>
      <p><span className='font-bold'>Description:</span> {Job.description}</p>
      <p><span className='font-bold'>Category:</span> {Job.category.name}</p>
      {/* <p><span className='font-bold'>Budget:</span> ₹{Job.budget}</p> */}
      <p><span className='font-bold'>Final Amount:</span> ₹{Job.finalAmount}</p>
      <p><span className='font-bold'>Last Updated:</span> {formattedDate(Job.updatedAt)}</p>
      <p><span className='font-bold'>Deadline:</span> {formattedDate(Job.deadline)}</p>

      {/* Freelancer  */}
      <div className='bg-richblack-900 border-2 border-richblack-700 py-3 px-4 rounded-md max-w-fit'>
          <p className='font-bold text-md'>Freelancer:</p>
          <div className='flex gap-2 items-center'>
              <img alt="Freelancer image" className='w-[45px] h-[45px] rounded-full' src={freelancerId.profilePicture}/>
              <div>
                  <p className='text-richblack-5 font-bold'>{freelancerId.firstName}&nbsp;{freelancerId.lastName}</p>
                  <p className="text-richblack-100 flex items-center gap-1 hover:underline"><a href= {`mailto:${freelancerId.email}`}>{freelancerId.email}</a><MdOutlineLaunch /></p>
              </div>
          </div>
      </div>

      {/* SEE MORE BUTTON */}
      <div className='flex'>
        <IconBtn
          text="See More"
          onclick={() => {
            // <SeeMoreOngoingJob Job={Job}/>
            navigate(`/dashboard/see-more-ongoing-job/${Job._id}`)
          }}
          children={<FaArrowRight />}
        />
      </div>
      
    </div>
  )
}

export default OngoingJobComponent
