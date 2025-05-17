const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");
const otpSchema=new mongoose.Schema({
    email:{
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
async function emailVerification(email,otp) {
    try {
        await mailSender(email, "Email Verification", 
            `Your otp is ${otp}`)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status:false,
            message:"Error in email verification"
        })
    }
}
otpSchema.pre("save",async function(next){
    await emailVerification(this.email,this.otp);
    next();
})
module.exports=mongoose.model("OTP",otpSchema)