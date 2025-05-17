import React from 'react'
import DOMPurify from "dompurify";
import { MdOutlineLaunch } from "react-icons/md";
import { FaArchive } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import {apiConnector} from "../../../../../../Service/Operations/apiConnector"
import { jobEndPoints } from '../../../../../../Service/apis';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { jobPayment } from '../../../../../../Service/Operations/payment';

const SeeProposalComponent = (props) => {
    const {proposal
        // ,dispatch,setProposals
    }=props;
    const navigate=useNavigate();
    const {freelancerId}=proposal;
    // console.log(proposal)

    async function handleStatus(status) {
        const toastId=toast.loading("Loading");
        try{
            if(status==="accepted"){
                jobPayment(proposal,navigate)
            }
            else{
                const response=await apiConnector("PUT",`${jobEndPoints.UPDATEPROPOSALSTATUS_API}/${proposal._id}`,{status})
                // dispatch(setProposals())
                navigate(0); //reload
            }
            
        }catch(error){
            console.log(error.message)
        }
        toast.dismiss(toastId)
    }


  return (
    <div className="my-10 flex flex-col gap-y-3 rounded-md border-[1px] text-richblack-25 border-richblack-700 bg-richblack-800 p-8 px-12 ">
            {/* <div className='flex justify-between'> */}
                {/* Cover Letter */}
                {/* className="text-richblack-5 font-bold text-2xl" */}
                {/* <p className='text-lg text-justify'><span className='font-bold'>Cover Letter:</span>&nbsp;{proposal.coverLetter}</p> */}
                <p className='font-bold text-lg'>Cover Letter:</p>
                <div className='text-lg bg-richblack-900 p-2 rounded-md border-2 border-richblack-700 text-justify' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(proposal.coverLetter) }} />
                <p className='text-lg'><span className='font-bold '>Bid Amount:</span>&nbsp;₹{proposal.bidAmount}</p>
                
            {/* </div> */}
            
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

            {/* ACCEPT REJECT PROPOSAL HANDLING */}
            <div className='flex justify-between text-center'>
                <div className='flex gap-2'>
                    <button
                        onClick={()=>{handleStatus("accepted")}}
                        className='flex gap-1 items-center hover:scale-105 text-lg bg-[#02b10b] p-1 rounded-md'>Accept<TiTick />
                    </button>
                    <button
                        onClick={()=>{handleStatus("rejected")}}
                        className='flex gap-1 items-center hover:scale-105 text-lg bg-[#c90b0b] p-1 rounded-md'>Reject<RxCross2 />
                    </button>
                </div>
                <button 
                     onClick={()=>{handleStatus("archived")}}
                    className='flex gap-1 items-center hover:scale-105 text-richblack-800 text-lg bg-yellow-200 p-1 rounded-md'>Archive<FaArchive /></button>
            </div>
    
        </div>
  )
}

export default SeeProposalComponent