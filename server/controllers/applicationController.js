const Proposal = require("../models/Proposal");
const Job = require("../models/Job");

// Submit a Proposal (Freelancer applies for a job)
exports.applyForJob = async (req, res) => {
    try {
        const { jobId, coverLetter, bidAmount } = req.body;
        const freelancerId = req.user.userId; // Freelancer applying for the job
        // console.log("freelancerId:"+freelancerId)

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ success: false, error: "Job not found" });

        // Check if the freelancer has already submitted a proposal
        // const existingProposal = await Proposal.findOne({ jobId, freelancerId });
        // if (existingProposal) {
        //     return res.status(400).json({ success: false, error: "You have already applied for this job" });
        // }

        // Create a new proposal
        const proposal = new Proposal({
            jobId,
            freelancerId,
            clientId: job.clientId, // Extract clientId from the job
            coverLetter,
            bidAmount
        });

        // Save proposal
        await proposal.save();

        // Add proposal reference to the job
        await Job.findByIdAndUpdate(jobId, { $push: { proposals: proposal._id } });

        res.status(201).json({ success: true, message: "Proposal submitted successfully", proposal });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get all proposals for a job (For Clients)
exports.getJobProposals = async (req, res) => {
    try {
        const { jobId } = req.params;
        // console.log(jobId);
         // Fetch job details to check owner
         const job = await Job.findById(jobId);
         if (!job) {
             return res.status(404).json({ success: false, message: "Job not found." });
         }
         const jobTitle=job.title;
         // Check if the logged-in user is the job owner
         if (req.user.userId.toString() !== job.clientId.toString()) {
             return res.status(403).json({ success: false, message: "Access denied. Only the job owner can view proposals." });
         }

        // Retrieve proposals and populate freelancer details
        const proposals = await Proposal.find({ jobId }).populate("freelancerId").populate("clientId");
        //  console.log(proposals);
        res.json({ success: true,
            message:"Proposals fetched succefully",
            proposals,
            jobTitle
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get all proposals submitted by a freelancer
exports.getFreelancerProposals = async (req, res) => {
    try {
        const freelancerId = req.user.userId;

        // Retrieve proposals and populate job details
        const proposals = await Proposal.find({ freelancerId }).populate("jobId", "title description");

        res.json({ success: true, proposals });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Accept or Reject a Proposal (For Clients)
// exports.updateProposalStatus = async (req, res) => {
//     try {
//         const { proposalId } = req.params;
//         const { status } = req.body; // "accepted" or "rejected"

//         if (!["accepted", "rejected"].includes(status)) {
//             return res.status(400).json({ success: false, error: "Invalid status" });
//         }

//         const proposal = await Proposal.findByIdAndUpdate(proposalId, { status }, { new: true });

//         if (!proposal) return res.status(404).json({ success: false, error: "Proposal not found" });

//         res.json({ success: true, message: `Proposal ${status} successfully`, proposal });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// Accept or Reject a Proposal (For Clients)
exports.updateProposalStatus = async (req, res) => {
    try {
        const { proposalId } = req.params;
        const { status } = req.body; // "accepted" or "rejected"

        // Validate status input
        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
        }

        // Find the proposal
        const proposal = await Proposal.findById(proposalId);
        if (!proposal) return res.status(404).json({ error: "Proposal not found" });

        // If accepted, update job and reject other proposals
        if (status === "accepted") {
            // Update the accepted proposal status
            console.log(status);
            proposal.status = "accepted";
            await proposal.save();

            // Assign freelancer to the job and mark job as "in progress"
            await Job.findByIdAndUpdate(proposal.jobId, {
                freelancerId: proposal.freelancerId,
                status: "in progress",
            });

            // Reject all other proposals for the same job
            await Proposal.updateMany(
                { jobId: proposal.jobId, _id: { $ne: proposalId } },
                { status: "rejected" }
            );
        } else if(status === "rejected") {
            // If rejected, just update the proposal status
            proposal.status = "rejected";
            await proposal.save();
        }

        res.json({ message: `Proposal ${status} successfully`, proposal });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
