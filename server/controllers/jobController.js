const Category = require("../models/Category");
const Job = require("../models/Job");
const mongoose=require("mongoose")

exports.createJob = async (req, res) => {
    try {
        const { title, description, category, budget, deadline } = req.body;

        // Validate category ID format
        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid category ID" 
            });
        }

        // const categoryId = new mongoose.Types.ObjectId(category);
        const categoryId = category;

        // Check if category exists
        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
            return res.status(404).json({ 
                success: false, 
                message: "Category not found" 
            });
        }

        // Create job only if category is valid
        const job = new Job({ 
            title, 
            description, 
            category: categoryId, 
            budget, 
            deadline, 
            clientId: req.user.userId 
        });

        await job.save();

        // Add job reference to category
        await Category.findByIdAndUpdate(categoryId, { 
            $push: { jobs: job._id } 
        });

        res.status(201).json({
            success: true,
            message: "Job posted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            success: false,
            message:"Error in posting Job",
            error: error.message 
        });
    }
};

exports.getPostedJobsByClient = async (req, res) => {
    try {
        const clientId = req.user.userId;  // Current logged-in client ID
        // const jobs = await Job.find({ clientId }).populate("clientId"); // Filter jobs by clientId
        const jobs = await Job.find({ clientId }).populate("category").populate("clientId").populate("proposals").populate("freelancerId").populate("acceptedProposal").populate("file");
        // const jobs = await Job.find({ clientId });

        // console.log(clientId);
        // console.log(jobs);
        res.status(200).json({
            success: true,
            jobs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching posted jobs",
            error: error.message
        });
    }
};

exports.getOngoingJobByClient=async(req,res)=>{
    try{
        const clientId = req.user.userId;  // Current logged-in client ID
        const {jobId}=req.params;
        const job=await Job.findById(jobId).populate("clientId").populate("freelancerId").populate("proposals").populate("category").populate("acceptedProposal").populate("file");
        if(!job){
            return res.status(401).json({
                success:false,
                message:"No such Job is present"
            })
        }
        if(job.clientId._id!=clientId){
            return res.status(401).json({
                success:false,
                message:"This job is not posted by you"
            })
        }
        if(job.status!="in progress"){
            return res.status(400).json({
                success:false,
                message:"This job is not ongoing"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Job found successfully",
            job
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
exports.getCompletedJobByClient=async(req,res)=>{
    try{
        const clientId = req.user.userId;  // Current logged-in client ID
        const {jobId}=req.params;
        const job=await Job.findById(jobId).populate("clientId").populate("freelancerId").populate("proposals").populate("category").populate("acceptedProposal").populate("file");
        if(!job){
            return res.status(401).json({
                success:false,
                message:"No such Job is present"
            })
        }
        if(job.clientId._id!=clientId){
            return res.status(401).json({
                success:false,
                message:"This job is not posted by you"
            })
        }
        if(job.status!="completed"){
            return res.status(400).json({
                success:false,
                message:"This job is not completed"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Job found successfully",
            job
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate("clientId").populate("file");
        res.status(200).json({
            success:true,
            jobs
        })
    } catch (error) {
        res.status(500).json({ 
            success:false,
            message:"Error in getting all jobs",
            error: error.message 
        });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const jobId = req.body.jobId; // Job ID from URL
        const clientId = req.user.userId; // Logged-in client ID

        // console.log(jobId);

        // Validate Job ID
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid job ID"
            });
        }

        // Find job
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        // Check if client is authorized to delete
        if (job.clientId.toString() !== clientId.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: You can only delete your own jobs"
            });
        }

        // Delete job
        await Job.findByIdAndDelete(jobId);

        // Remove job reference from category
        await Category.findByIdAndUpdate(job.category, {
            $pull: { jobs: jobId }
        });

        const jobs = await Job.find({ clientId }).populate("category").populate("clientId");
        res.status(200).json({
            success: true,
            jobs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting job",
            error: error.message
        });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const { jobId } = req.params;  // Get job ID from request params
        const updates = req.body;  // Get updated job fields from request body

        // Find job and update it
        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            { $set: updates }, // Update only the provided fields
            { new: true, runValidators: true } // Return updated job & validate input
        );

        // Check if job exists
        if (!updatedJob) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Job updated successfully",
            job: updatedJob
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating job",
            error: error.message
        });
    }
};

exports.getFreelancerJobs=async(req,res)=>{
    try {
        const freelancerId = req.user.userId;
        if(!freelancerId){
            return res.status(400).json({
                success:false,
                message:"Kindly login again"
            })
        }
        const jobs=await Job.find({freelancerId:freelancerId}).populate("acceptedProposal").populate("category").populate("clientId").populate("file");
        return res.status(200).json({
            success:true,
            message:"FreelancerJob retrieved successfully",
            jobs
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getFreelancerJob=async(req,res)=>{
    try {
        const freelancerId = req.user.userId;
        const {jobId}=req.params;
        if(!freelancerId){
            return res.status(400).json({
                success:false,
                message:"Kindly login again"
            })
        }
        const job=await Job.findById(jobId).populate("acceptedProposal").populate("category").populate("clientId").populate("file");
        if(job.freelancerId!=freelancerId){
            return res.status(400).json({
                success:false,
                message:"This job is not assigned to you"
            })
        }
        return res.status(200).json({
            success:true,
            message:"FreelancerJob retrieved successfully",
            job
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updateJobStatus=async(req,res)=>{
    try {
        const {status}=req.body
        const {jobId}=req.params
        await Job.findByIdAndUpdate(jobId, {
            status,
        });
        return res.status(200).json({
            success:true,
            message:"Updated Status Successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}