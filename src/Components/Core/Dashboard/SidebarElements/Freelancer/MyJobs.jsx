import React, { useEffect, useState } from 'react';
import { apiConnector } from '../../../../../Service/Operations/apiConnector';
import { jobEndPoints } from '../../../../../Service/apis';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { MdOutlineLaunch } from "react-icons/md";

const MyJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchJobs = async () => {
      const toastId = toast.loading("Loading your jobs...");
      try {
        const response = await apiConnector("GET", jobEndPoints.GET_FREELANCER_JOBS);
        setJobs(response.data.jobs);
        toast.success("Jobs loaded successfully");
      } catch (error) {
        toast.error("Failed to fetch jobs");
        console.error(error);
      } finally {
        toast.dismiss(toastId);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = (jobs || []).filter(job => 
    filter === "all" || job?.status?.toLowerCase() === filter
  );

  return (
    <div className="my-10 px-12 text-richblack-25">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-richblack-5">My Jobs</h2>
        <select
          className="px-4 py-2 bg-richblack-700 text-white rounded-md border border-richblack-600"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Jobs</option>
          <option value="in progress">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Jobs List */}
      {filteredJobs.length > 0 ? (
        <div className="flex flex-col gap-6">
          {filteredJobs.map(job => (
            <div 
              key={job._id} 
              className="p-8 bg-richblack-800 border border-richblack-700 rounded-lg shadow-lg"
            >
              <div className='flex justify-between'>
                <h3 className="text-2xl font-semibold text-richblack-5">{job.title}</h3>
                <span className={`px-4 py-2 text-md font-semibold rounded-md ${job.status === "completed" ? "text-black bg-caribbeangreen-200" : "bg-yellow-500 text-black"}`}>
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </span>
              </div>
              <div className='flex flex-col gap-y-2'>
                <p>{job.description}</p>
                <p><span className='font-bold'>Category: </span>{job.category.name}</p>
                <p><span className='font-bold'>Final Amount: </span>₹{job.finalAmount}</p>
                <p><span className='font-bold'>Deadline: </span>{new Date(job.deadline).toLocaleDateString()}</p>
              </div>
              {/* Client  */}
              <div className='bg-richblack-900 border-2 border-richblack-700 mt-2 py-3 px-4 rounded-md max-w-fit'>
                  <p className='font-bold text-md text-richblack-25'>Client:</p>
                  <div className='flex gap-2 items-center'>
                      <img alt="Freelancer image" className='w-[45px] h-[45px] rounded-full' src={job.clientId.profilePicture}/>
                      <div>
                          <p className='text-richblack-5 font-bold'>{job.clientId.firstName}&nbsp;{job.clientId.lastName}</p>
                          <p className="text-richblack-100 flex items-center gap-1 hover:underline"><a href= {`mailto:${job.clientId.email}`}>{job.clientId.email}</a><MdOutlineLaunch /></p>
                      </div>
                  </div>
              </div>
              <button 
                onClick={() => navigate(`/dashboard/job/${job._id}`)}
                className="mt-4 px-5 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
              >
                View Details →
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-richblack-200 text-lg text-center mt-6">No jobs found.</p>
      )}
    </div>
  );
};

export default MyJobs;
