const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
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
  amount: { 
    type: Number, 
    required: true },
  status: { 
    type: String, 
    enum: ["pending", "completed", "failed"], 
    default: "pending" }
  ,
  paymentMethod: { 
    type: String, required: true 
    
  },
  transactionId: { 
    type: String 
    
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
    
  }
});

module.exports = mongoose.model("Payment", PaymentSchema);
