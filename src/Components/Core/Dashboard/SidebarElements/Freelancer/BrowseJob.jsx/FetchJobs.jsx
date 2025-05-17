import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../../../../../Service/Operations/apiConnector';
import { categoryEndPoints } from '../../../../../../Service/apis';
import FetchJobComponent from './FetchJobComponent';

const FetchJobs = (props) => {
    const {currCategory}=props;
    // console.log(currCategory);
    const [jobs,setJobs]=useState([]);
    useEffect(() => {
      async function fetchData(){
        const response=await apiConnector("GET",`${categoryEndPoints.GET_JOBS_OF_PARTICULAR_CATEGORY_API}/${currCategory}`,)
        // console.log(response.data.data.jobs);
        setJobs(response.data.data.jobs);
      }
      fetchData();
    }, [currCategory])

    useEffect(() => {
      console.log(jobs)
    }, [jobs])
    
    
  return (
    <div className='w-full h-full'>
        {jobs.length===0?
            <div className='text-richblack-5 w-full h-full text-3xl font-bold flex justify-center items-center'>
                <p>No Jobs Posted</p>
            </div>
        :
        <>
            {jobs.filter(job => job.status === "open").length === 0 ? (
              <div className='text-richblack-5 w-full h-full text-3xl font-bold flex justify-center items-center'>
                <p>No Open Jobs</p>
              </div>
            ) : (
              <>
                {jobs
                  .filter(job => job.status === "open")
                  .map((job) => (
                    <FetchJobComponent key={job._id} Job={job} />
                  ))}
              </>
            )}

        </>
        }
        
    </div>
  )
}

export default FetchJobs