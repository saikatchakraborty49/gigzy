import React,{useEffect, useState} from 'react'
import { IoIosAddCircle } from "react-icons/io";
import IconBtn from '../../../../Common/IconBtn';
import { useNavigate } from 'react-router';
import {jobEndPoints} from '../../../../../Service/apis'
import {apiConnector} from '../../../../../Service/Operations/apiConnector'
import JobPostedComponent from './Components/JobPostedComponent';
import { useDispatch, useSelector } from 'react-redux';
import { setPostedJobs } from '../../../../../Slices/profileSlice';

const JobsPosted = () => {
  const navigate=useNavigate();
  const Jobs=useSelector((state)=>state.profile.postedJobs);
  const dispatch=useDispatch();
  // const [Jobs, setJobs] = useState([])
  useEffect(() => {  
    const fetchJobs = async () => {
      try {
        const response = await apiConnector("GET", jobEndPoints.JOBSPOSTED_API);
        // console.log(response);
        dispatch(setPostedJobs(response.data.jobs))
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
  
    fetchJobs();
  
  }, []);

  // useEffect(() => {
  //   console.log("Updated Jobs:", Jobs);
  // }, [Jobs]);
  
   return (
      <div className='w-full h-full '>
        {/* Post A Job button */}
        <IconBtn
          text="Post A Job"
          onclick={() => {
            navigate("/dashboard/post-a-job")
          }}
          children={<IoIosAddCircle />}
        />

        <div className='w-full h-full '>
          {/* Upload all jobs */}
          {Jobs.length === 0 ? (
            <div className="w-full h-full flex justify-center items-center font-bold text-3xl text-richblack-25">
              <p>No Jobs Posted</p>
            </div>
          ) : (
            (() => {
              const openJobs = Jobs.filter((Job) => Job.status === "open");
              return openJobs.length === 0 ? (
                <div className="w-full h-full flex justify-center items-center font-bold text-3xl text-richblack-25">
                  <p>No Open Jobs</p>
                </div>
              ) : (
                openJobs.map((Job) => <JobPostedComponent key={Job.id} Job={Job} />)
              );
            })()
          )}

        </div>
        
      </div>
    )
}

export default JobsPosted