const { response } = require("express");
const File = require("../../models/File");
const Job = require("../../models/Job");
const mailSender=require("../../utils/mailSender");
const { FileUploadClient } = require("../../mail/template/FileUploadClient");
const { FileUploadFreelancer } = require("../../mail/template/FileUploadFreelancer");

const cloudinary = require("cloudinary").v2;

// async function uploadFileToCloudinary(file, folder) {
//     let resourceType = "auto";
//     const extension = file.name.split(".").pop().toLowerCase();
  
//     // Set resource_type manually for documents and zips
//     const rawTypes = ["pdf", "doc", "docx", "xls", "xlsx", "zip", "rar"];
//     if (rawTypes.includes(extension)) {
//       resourceType = "raw";
//     }
  
//     const options = {
//       folder,
//       resource_type: resourceType,
//       use_filename: true,
//       unique_filename: false,
//     };
  
//     return await cloudinary.uploader.upload(file.tempFilePath, options);
//   }

const uploadFileToCloudinary=async (file, folder)=>{
    let resourceType = "auto";
    const extension = file.name.split(".").pop().toLowerCase();
    const rawTypes = ["pdf", "doc", "docx", "xls", "xlsx", "zip", "rar"];
    let name=file.name
    // if(extension){
        // const name=file.name.split(".")[0];
    // }
    // const name=file.name.split(".")[0]
  
    // if (rawTypes.includes(extension)) {
    //   resourceType = "raw";
    // }
  
    const options = {
      folder,
      resource_type: resourceType,
      public_id: name, // Keeps filename and extension
    // public_id: file.name
    //   use_filename: true,
    //   unique_filename: false,
    //   overwrite: true,
    };
  
    return await cloudinary.uploader.upload(file.tempFilePath, options);
  }
  
  

exports.workUploading=async(req,res)=>{
    try {
        const file=req.files.file;
        const jobId=req.body.jobId;
        console.log(file);
        const response=await uploadFileToCloudinary(file, "gigzy");
        console.log(response);
        const result=await File.create({
            url:response.secure_url,
            email:req.user.email,
        })
        const job=await Job.findByIdAndUpdate(jobId,{file:result._id}).populate("freelancerId").populate("clientId").populate("file");
        console.log(job);
        await mailSender(job.clientId.email,`Uploaded work for ${job.title}`,FileUploadClient(job.title,job.freelancerId,job.clientId,job.file))
        await mailSender(job.freelancerId.email,`Uploaded work for ${job.title}`,FileUploadFreelancer(job.title,job.freelancerId,job.clientId,job.file))
        return res.status(200).json({
            success:true,
            message:"File uploaded successfully",
            result,
            job
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.fileUploading=async(file)=>{
    const response=await uploadFileToCloudinary(file, "gigzy");
    return response;
}