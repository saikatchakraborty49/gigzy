const mongoose = require("mongoose");

const ProposalSchema = new mongoose.Schema({
  jobId: {
     type: mongoose.Schema.Types.ObjectId, 
    ref: "Job", 
    required: true 

  },
  freelancerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
     required: true 

  },
  clientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 

  },
  coverLetter: { 
    type:String , 
    required: true 
  },
  bidAmount: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["pending", "accepted", "rejected", "archived"],
    default: "pending" 

  },
  submittedAt: { 
    type: Date, 
    default: Date.now 
  }
});


module.exports = mongoose.model("Proposal", ProposalSchema);
