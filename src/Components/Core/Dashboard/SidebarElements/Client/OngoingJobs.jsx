import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiConnector } from '../../../../../Service/Operations/apiConnector'
import { jobEndPoints } from '../../../../../Service/apis'
import { setPostedJobs } from '../../../../../Slices/profileSlice'
import OngoingJobComponent from './Components/OngoingJobComponent'

const OngoingJobs = () => {
  const dispatch = useDispatch()
  const Jobs = useSelector((state) => state.profile.postedJobs)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await apiConnector("GET", jobEndPoints.JOBSPOSTED_API)
        dispatch(setPostedJobs(response.data.jobs))
      } catch (error) {
        console.error("Error fetching jobs:", error)
      }
    }
    fetchJobs()
  }, [])

  return (
    <div className="w-full h-full">
      {Jobs.length === 0 ? (
        <div className="w-full h-full flex justify-center items-center font-bold text-3xl text-richblack-25">
          <p>No Jobs Posted</p>
        </div>
      ) : (
        (() => {
          const ongoingJobs = Jobs.filter((Job) => Job.status === "in progress")
          return ongoingJobs.length === 0 ? (
            <div className="w-full h-full flex justify-center items-center font-bold text-3xl text-richblack-25">
              <p>No Ongoing Jobs</p>
            </div>
          ) : (
            ongoingJobs.map((Job) => (
              <OngoingJobComponent key={Job._id} Job={Job} />
            ))
          )
        })()
      )}
    </div>
  )
}

export default OngoingJobs
