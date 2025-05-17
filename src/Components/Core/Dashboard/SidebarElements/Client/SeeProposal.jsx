import React, { useEffect, useState } from 'react'
import SeeProposalComponent from './Components/SeeProposalComponent'
import { useParams } from 'react-router'
import { apiConnector } from '../../../../../Service/Operations/apiConnector';
import { jobEndPoints } from '../../../../../Service/apis';

const SeeProposal = () => {
    const {jobId}=useParams();
    const [proposals,setProposals]=useState();
    const [jobTitle,setJobTitle]=useState();
    useEffect(() => {
        async function fetchJobProposals(){
            const response=await apiConnector("GET",`${jobEndPoints.GETJOBPROPOSALS_API}/${jobId}`);
            console.log(response.data)
            setProposals(response.data.proposals)
            setJobTitle(response.data.jobTitle);
        }
        fetchJobProposals();
    }, [jobId])

    
  return (
    <div>
        <p className='text-center text-4xl font-bold text-richblack-5'>Proposals:&nbsp;{jobTitle}</p>
        {(proposals==undefined || proposals.length==0)?
            <div className='text-center text-3xl font-bold text-richblack-5 mt-10'>No Proposals</div>
        :
            <>
                {proposals.some((proposal) => proposal.status === 'pending') ? (
                proposals.map((proposal) =>
                    proposal.status === 'pending' && (
                        <SeeProposalComponent proposal={proposal} key={proposal.id} />
                    )
                )
                ) : (
                    <div className="text-center text-3xl font-bold text-richblack-5 mt-10">
                        No Proposals
                    </div>
                )}
            </>
        }
        
    </div>
  )
}

export default SeeProposal