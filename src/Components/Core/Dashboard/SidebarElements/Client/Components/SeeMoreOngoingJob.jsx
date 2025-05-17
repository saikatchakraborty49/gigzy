import React, { useEffect, useState } from 'react';
import { MdOutlineLaunch } from "react-icons/md";
import { apiConnector } from '../../../../../../Service/Operations/apiConnector';
import { balanceEndPoints, jobEndPoints } from '../../../../../../Service/apis';
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';
import { formattedDate } from '../../../../../../Utils/dateFormatter';
import { FaCheckCircle } from "react-icons/fa";
import IconBtn from '../../../../../Common/IconBtn';
// import { MdOutlineDownloadForOffline } from "react-icons/md";
import { MdDownloadForOffline } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationModal from '../../../../../Common/ConfirmationModal';

const SeeMoreOngoingJob = () => {
  const navigate = useNavigate();
  const [Job, setJob] = useState(null);
  const { jobId } = useParams();
  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.profile)
  const [confirmationModal,setConfirmationModal]=useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const toastId = toast.loading("Loading...");
      try {
        const response = await apiConnector("GET", `${jobEndPoints.GETONGOINGJOB_API}/${jobId}`);
        setJob(response.data.job);
        console.log(response.data.job)
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Error fetching job details.");
        console.error("Error fetching jobs:", error);
      } finally {
        toast.dismiss(toastId);
      }
    };
    fetchJobs();
  }, [jobId]);

  async function markAsCompleted(navigate,apiConnector) {
    const toastId=toast.loading("Loading")
    try {
      const freelancerId=Job.freelancerId
      const money = Job.finalAmount; // e.g., ₹1000

      // Razorpay Fee = 2% of money + ₹3 (Razorpay fee) + ₹1 (validation charge)
      const razorpayFee = (money * 0.02) + 4;


      // Platform Commission = 2% of money
      const platformCommission = money * 0.02;

      // Final amount freelancer receives
      const amountToFreelancer = money - razorpayFee - platformCommission;

      const response1=await apiConnector('POST',balanceEndPoints.UPDATE_BALANCE_API,{
        userId:freelancerId,
        money:amountToFreelancer,
      })
      const response2=await apiConnector('PUT',`${jobEndPoints.UPDATE_JOB_STATUS_API}/${Job._id}`,{
        status:"completed"
      })
      navigate("/dashboard/completed-jobs");
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
    toast.dismiss(toastId)
  }

  return (
    <div className="my-10 flex flex-col gap-y-4 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-25">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-richblack-5">{Job?.title}</h2>
        <span className="text-sm px-4 py-1 bg-yellow-500 text-black font-semibold rounded-md">
          {Job?.status}
        </span>
      </div>

      {/* Job Description */}
      <p className="text-lg text-justify">
        <span className="font-bold">Description:</span> {Job?.description}
      </p>

      {/* Client Details */}
      {/* <div className="bg-richblack-900 border-2 border-richblack-700 py-3 px-4 rounded-md max-w-fit">
        <p className="font-bold text-md">Client:</p>
        <div className="flex gap-2 items-center">
          <img 
            src={Job?.clientId.profilePicture} 
            alt="Client" 
            className="w-[45px] h-[45px] rounded-full border-2 border-richblack-500"
          />
          <div>
            <p className="text-richblack-5 font-bold">{Job?.clientId.firstName} {Job?.clientId.lastName}</p>
            <p className="text-richblack-100 flex items-center gap-1 hover:underline">
              <a href={`mailto:${Job?.clientId.email}`}>{Job?.clientId.email}</a> <MdOutlineLaunch />
            </p>
          </div>
        </div>
      </div> */}

      {/* Freelancer Details */}
      <div className="bg-richblack-900 border-2 border-richblack-700 py-3 px-4 rounded-md max-w-fit">
        <p className="font-bold text-md">Freelancer:</p>
        <div className="flex gap-2 items-center">
          <img 
            src={Job?.freelancerId.profilePicture} 
            alt="Freelancer" 
            className="w-[45px] h-[45px] rounded-full border-2 border-richblack-500"
          />
          <div>
            <p className="text-richblack-5 font-bold">{Job?.freelancerId.firstName} {Job?.freelancerId.lastName}</p>
            <p className="text-richblack-100 flex items-center gap-1 hover:underline">
              <a href={`mailto:${Job?.freelancerId.email}`}>{Job?.freelancerId.email}</a> <MdOutlineLaunch />
            </p>
          </div>
        </div>
      </div>

      {/* Budget & Deadline */}
      <div className="flex justify-between bg-richblack-900 p-4 rounded-md border-2 border-richblack-700">
        <p className="text-lg"><span className="font-bold">Final Amount:</span> ₹{Job?.finalAmount}</p>
        <p className="text-lg"><span className="font-bold">Deadline:</span> {formattedDate(Job?.deadline)}</p>
      </div>

      {/* Accepted Proposal */}
      {Job?.acceptedProposal && (
        <div className="p-6 border border-richblack-700 bg-richblack-900 rounded-md shadow-md">
          <h3 className="text-xl font-semibold text-richblack-5 mb-2">Accepted Proposal</h3>
          <p className="text-lg"><span className="font-bold">Bid Amount:</span> ₹{Job?.finalAmount}</p>
          <p className="text-lg"><span className="font-bold">Proposal Status:</span> {Job?.acceptedProposal.status}</p>
          <div className="mt-2 text-lg bg-richblack-800 p-4 rounded-md border-2 border-richblack-700"
            dangerouslySetInnerHTML={{ __html: Job?.acceptedProposal.coverLetter }} />
        </div>
      )}

      {/* See Work */}
      {Job?.file?.url?
      <a href={Job?.file?.url} target="_blank" >
      <IconBtn
        text="Download Your Work"
      >
        <MdDownloadForOffline size={19}/>
      </IconBtn>
      </a>
      :
      <></>
      }
 
      {/* Action Buttons */}
      {/* <div className="flex gap-4 mt-4">
         <IconBtn
           text="Mark as Completed"
         >
           <FaCheckCircle/>
         </IconBtn>
      </div> */}
      <div className='flex justify-between text-center text-black'>
        <div className='flex gap-2'>
            <button
                // onClick={()=>{markAsCompleted()}}
                onClick={() =>
                  setConfirmationModal({
                    text1: "Are you sure?",
                    text2: "Payment will be transferred to freelancer's account and it cannot be retrieved.",
                    btn1Text: "Mark as completed",
                    btn2Text: "Cancel",
                    btn1Handler: () => markAsCompleted(navigate,apiConnector),
                    btn2Handler: () => setConfirmationModal(null),
                  })
                }
                className='flex gap-1 items-center hover:scale-105 bg-[#02b10b] py-2 px-5 font-semibold text-richblack-900 rounded-md'>
                Mark as completed<FaCheckCircle/>
            </button>
            <button
                onClick={()=>{navigate(`/dashboard/file-a-complaint/${Job._id}`)}}
                className='flex gap-1 items-center hover:scale-105 bg-[#c90b0b] py-2 px-5 font-semibold text-richblack-900 rounded-md'>
                  File A Complaint<IoIosWarning size={19}/>
            </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        
    </div>
  );
};

export default SeeMoreOngoingJob;
