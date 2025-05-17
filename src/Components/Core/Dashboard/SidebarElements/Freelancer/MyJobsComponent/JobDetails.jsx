import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../../../../../../Service/Operations/apiConnector";
import { fileUploadEndPoints, jobEndPoints } from "../../../../../../Service/apis";
import toast from "react-hot-toast";
import { MdOutlineLaunch } from "react-icons/md";
import { formattedDate } from "../../../../../../Utils/dateFormatter";

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null)

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await apiConnector("GET", `${jobEndPoints.GET_FREELANCER_JOB}/${jobId}`);
        setJob(response.data.job);
      } catch (error) {
        toast.error("Error fetching job details");
        console.error(error);
      }
    };
    fetchJobDetails();
  }, [jobId]);

  // Handle File Upload
  const handleFileUpload = async () => {
    const toastId=toast.loading("Loading");
    if (!file) return toast.error("Please select a file.");
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobId",jobId);

    try {
      const response = await apiConnector("POST", `${fileUploadEndPoints.POST_FILE}`, formData);
      console.log(response)
      toast.success("File uploaded successfully!");
      if (fileInputRef.current) {
        // console.log(fileInputRef.current.value)
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error("File upload failed!");
      console.error(error);
    }
    toast.dismiss(toastId);
  };

  if (!job) return <p className="text-gray-300">Loading job details...</p>;

  return (
    <div className="mx-auto p-6 bg-[#1a1c1d] text-white rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#5ea4a4]">{job.title}</h2>
        <span className={`text-sm px-4 py-1 ${job.status=="completed"?"bg-caribbeangreen-200":"bg-yellow-500"} text-black font-semibold rounded-md`}>
          {job.status}
        </span>
      </div>
      
      <p className="text-gray-300 mt-2">{job.description}</p>

      {/* Client Details */}
      <div className="mt-4 p-4 bg-[#2a2d2e] rounded-lg shadow-md border border-[#3a3d3e] max-w-fit">
        <p className="font-bold text-md">Client:</p>
        <div className="flex gap-2 items-center">
          <img 
            src={job.clientId.profilePicture} 
            alt="Client" 
            className="w-[45px] h-[45px] rounded-full border-2 border-[#5ea4a4]"
          />
          <div>
            <p className="text-[#5ea4a4] font-bold">{job.clientId.firstName} {job.clientId.lastName}</p>
            <p className="text-gray-300 flex items-center gap-1 hover:underline">
              <a href={`mailto:${job.clientId.email}`} className="text-[#5ea4a4]">{job.clientId.email}</a> <MdOutlineLaunch />
            </p>
          </div>
        </div>
      </div>

       {/* Budget & Deadline */}
        <div className="mt-4 flex justify-between bg-[#2a2d2e] p-4 rounded-md border-2 border-richblack-700">
          <p className="text-lg"><span className="font-bold">Final Amount:</span> ₹{job?.finalAmount}</p>
          <p className="text-lg"><span className="font-bold">Deadline:</span> {formattedDate(job?.deadline)}</p>
        </div>

      {/* Cover Letter */}
      {job.acceptedProposal.coverLetter && (
        <div className="mt-4 p-4 bg-[#2a2d2e] rounded-lg shadow-md border border-[#3a3d3e]">
          <h3 className="text-lg font-semibold text-[#5ea4a4]">Cover Letter:</h3>
          <div
            className="text-gray-300 mt-2 bg-[#1a1c1d] p-3 rounded-md border border-[#3a3d3e]"
            dangerouslySetInnerHTML={{ __html: job.acceptedProposal.coverLetter }}
          />
        </div>
      )}


      {/* File Upload */}
      {job.status=="completed"?<></>:
        <div className="mt-6 p-4 bg-[#2a2d2e] rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-[#5ea4a4]">Upload Your Work:</h3>
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileInputRef}
          className="mt-2 p-2 w-full border border-gray-600 bg-[#3a3d3e] rounded-md text-white"
        />
        <button 
          onClick={handleFileUpload}
          className="mt-3 px-4 py-2 bg-[#5ea4a4] text-white font-semibold rounded-md hover:bg-[#4b8585] transition-all"
        >
          Upload File
        </button>
        </div>
      }
      {/* <div className="mt-6 p-4 bg-[#2a2d2e] rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-[#5ea4a4]">Upload Your Work:</h3>
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileInputRef}
          className="mt-2 p-2 w-full border border-gray-600 bg-[#3a3d3e] rounded-md text-white"
        />
        <button 
          onClick={handleFileUpload}
          className="mt-3 px-4 py-2 bg-[#5ea4a4] text-white font-semibold rounded-md hover:bg-[#4b8585] transition-all"
        >
          Upload File
        </button>
      </div> */}
    </div>
  );
};

export default JobDetails;
