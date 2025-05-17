const mongoose=require("mongoose")
const Job = require("./Job")
const User = require("./User")

const contactSchema=new mongoose.Schema({
    name:{
        required:true,
        type:String,
    },
    email:{
        required:true,
        type:String,
    },
    message:{
        required:true,
        type:String,
    },
})

module.exports=mongoose.model("Contact",contactSchema)