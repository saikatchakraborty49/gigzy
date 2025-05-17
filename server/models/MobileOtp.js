const mongoose=require("mongoose");
const smsSender = require("../utils/smsSender");
const otpSchema=new mongoose.Schema({
    contactNumber:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:300
    }
})
async function smsVerification(contactNumber,otp) {
    try {
        await smsSender(contactNumber, 
            `Your otp is ${otp}`)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status:false,
            message:"Error in contactNumber verification"
        })
    }
}
otpSchema.pre("save",async function(next){
    await smsVerification(this.contactNumber,this.otp);
    next();
})
module.exports=mongoose.model("contactNumberOtp",otpSchema)