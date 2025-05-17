const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  senderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
    
  },
  receiverId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
    
  },
  message: { 
    type: String, 
    required: true 
    
  },
  timestamp: { 
    type: Date, 
    default: 
    Date.now 
    
  },
  status: { 
    type: String, enum: ["sent", "delivered", "read"], 
    default: "sent" 
    
  }
});

module.exports = mongoose.model("Chat", ChatSchema);
