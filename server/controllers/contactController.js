const Contact=require("../models/Contact")

exports.contactController=async(req,res)=>{
    try{
        const {name,email,message}=req.body;
        const response=await Contact.create({name,email,message});
        return res.status(200).json({
            success:true,
            message:"Message has been sent successfully"
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in sending message"
        })
    }    
}