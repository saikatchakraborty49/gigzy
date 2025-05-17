const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
    
  },
  description: { 
    type: String, 
    required: true 
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref:"Category"
  },
  budget: { 
    type: Number, 
    required: true     
  },
  finalAmount:{
    type:Number
  },
  deadline: { 
    type: Date, 
    required: true 
  },
  clientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
    
  },
  freelancerId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "User" 
  },
  status: { 
    type: String, 
    enum: ["open", "in progress", "completed", "cancelled"], 
    default: "open" 
    
  },
  proposals: { 
    type: [mongoose.Schema.Types.ObjectId], 
    ref: "Proposal" 
    
  },
  acceptedProposal:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Proposal" 
  },
  createdAt: { 
    type: Date,
     default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
  file:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "File" 
  }
});

module.exports = mongoose.model("Job", JobSchema);
