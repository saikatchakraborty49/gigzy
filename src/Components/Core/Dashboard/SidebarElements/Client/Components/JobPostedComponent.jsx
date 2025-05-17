import React from 'react'
import { formattedDate } from '../../../../../../Utils/dateFormatter';
import IconBtn from '../../../../../Common/IconBtn';
import { RiEditBoxLine } from "react-icons/ri"
import { useNavigate } from 'react-router';
import DeleteBtn from '../../../../../Common/DeleteBtn';
import {apiConnector} from '../../../../../../Service/Operations/apiConnector'
import {jobEndPoints} from '../../../../../../Service/apis'
import { useDispatch } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { setPostedJobs } from '../../../../../../Slices/profileSlice';
import toast from 'react-hot-toast';
import { FaArrowRight } from "react-icons/fa";

const JobPostedComponent = (props) => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {Job}=props;
    console.log(Job)
    async function handleDelete(){
        const toastId=toast.loading("Loading")
        try{
            const response=await apiConnector("DELETE",jobEndPoints.DELETEJOB_API,{jobId:Job._id});
            dispatch(setPostedJobs(response.data.jobs))
            toast.success("Job delete successfully")
        }catch(error){
            toast.error("Error in deleting jobs")
        }
        
        toast.dismiss(toastId);
    }
  return (
    <div className="my-10 flex flex-col gap-y-3 rounded-md border-[1px] text-richblack-25 border-richblack-700 bg-richblack-800 p-8 px-12 ">
        <div className='flex justify-between'>
            {/* Title */}
            <p className="text-richblack-5 font-bold text-2xl">{Job.title}</p>
            <div className='flex gap-2 items-center'>
                {/* Edit */}
                <IconBtn
                    text="Edit"
                    onclick={() => {
                        //   navigate("/dashboard/settings")
                    }}
                    >
                    <RiEditBoxLine />
                </IconBtn>
                {/* Delete button  */}
                <button onClick={handleDelete} className='bg-[#e31010] py-2 px-2 rounded-md hover:scale-105'>
                       <MdDelete fontSize={24} />
                   </button>
            </div>
        </div>
        {/* Description */}
        <p><span className='font-bold'>Description:</span>&nbsp;{Job.description}</p>
        {/* Category */}
        <p><span className='font-bold'>Category:</span>&nbsp;{Job.category.name}</p>
        {/* Budget */}
        <p><span className='font-bold'>Budget:</span>&nbsp;₹{Job.budget}</p>
        {/* Status */}
        <p><span className='font-bold'>Status:</span>&nbsp;{Job.status}</p>
        {/* Last Updated */}
        <p><span className='font-bold'>Last Updated:</span>&nbsp;{formattedDate(Job.updatedAt)}</p>
        {/* Deadline */}
        <p><span className='font-bold'>Dead Line:</span>&nbsp;{formattedDate(Job.deadline)}</p>
        
        <div className='flex'>
        <IconBtn
          text="See Proposals"
          onclick={() => {
            navigate(`/dashboard/see-proposals/${Job._id}`)
          }}
          children={<FaArrowRight />}
        />
        </div>

    </div>
  )
}

export default JobPostedComponent