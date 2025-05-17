const express = require("express");
const { createJob, getPostedJobsByClient, getAllJobs, updateJob, deleteJob, getOngoingJobByClient, getFreelancerJobs, getFreelancerJob, updateJobStatus, getCompletedJobByClient} = require("../controllers/jobController");
const { applyForJob, getJobProposals, getFreelancerProposals, updateProposalStatus } = require("../controllers/applicationController");
const { auth, isFreelancer, isClient } = require("../middlewares/authMiddleware");
const { raiseDispute, getDisputes } = require("../controllers/disputeController");
const router = express.Router();

router.post("/create-job", auth, isClient, createJob);
router.get("/", getAllJobs);


// Freelancer applies for a job
router.post("/apply-for-job", auth, isFreelancer, applyForJob);

//Client views all the jobs posted by him/her
router.get("/get-posted-jobs-by-client",auth,isClient,getPostedJobsByClient);

//Update Job
router.put("/updateJob/:jobId",auth,isClient,updateJob);

//Delete Job
router.delete("/delete-job/",auth,isClient,deleteJob);

// Client views all Proposals for a job
// http://localhost:4000/api/v1/get-job-proposals/67d085cffaff52b6e82b2337
router.get("/get-job-proposals/:jobId", auth, isClient, getJobProposals);

// Freelancer views their job Proposals
router.get("/freelancer", auth, isFreelancer, getFreelancerProposals);

// Client updates application status (Accept/Reject)
router.put("/update-propsal-status/:proposalId", auth, isClient, updateProposalStatus);

router.get("/get-ongoing-job/:jobId",auth,isClient,getOngoingJobByClient)

router.get("/get-completed-job/:jobId",auth,isClient,getCompletedJobByClient)

router.get("/get-freelancer-jobs",auth,isFreelancer,getFreelancerJobs);

router.get("/get-freelancer-job/:jobId",auth,isFreelancer,getFreelancerJob);

router.put("/update-job-status/:jobId",auth,isClient,updateJobStatus);

router.post("/file-complaint",auth,isClient,raiseDispute)

router.get("/get-complaint",auth,isClient,getDisputes);

module.exports = router;
