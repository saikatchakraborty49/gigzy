const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  jobId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Job", 
    required: true
   },
  clientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true
   },
  freelancerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  rating: { 
    type: Number, 
    required: true 
    
  },
  reviewText: { 
    type: String, 
    required: true 
    
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
    
  }
});

module.exports = mongoose.model("Review", ReviewSchema);
