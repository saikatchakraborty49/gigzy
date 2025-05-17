const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { 
    type: String,
     required: true 
  },
  lastName: { 
    type: String,
     required: true 
  },
  email: { 
    type: String,
    required: true, 
    unique: true 
    
  },
  password: { 
    type: String, 
    required: true 
    
  },
  role: { 
    type: String, 
    enum: ["Freelancer", "Client", "Admin"], 
    required: true 
    
  },
  profilePicture: { 
    type: String 
    
  },
  bio: {
     type: String 
    
  },
  skills: { 
    type: [String] 
    
  },
  experience: { 
    type: Number 
    
  },
  portfolioLinks: {
     type: [String]
    
   },
  rating: { 
    type: Number,
     default: 0 
    
  },
  reviews: { 
    type: [String]
    
   },
  createdAt: { 
    type: Date,
     default: Date.now 
    
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
    
  },
  token:{
    type:String,
  },
  resetPasswordExpires:{
    type:Date,
  },
  DateOfBirth:{
    type:Date,
  },
  contactNumber:{
    type:String,
  },
  Balance:{
    type:Number,
    required:true,
    default:0
  }
});

module.exports = mongoose.model("User", UserSchema);
