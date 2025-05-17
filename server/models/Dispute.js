const mongoose=require("mongoose")
const Job = require("./Job")
const User = require("./User")

const disputeSchema=new mongoose.Schema({
    jobId:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:Job
    },
    raisedBy:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    reason:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String
    },
    evidence:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports=mongoose.model("Dispute",disputeSchema)