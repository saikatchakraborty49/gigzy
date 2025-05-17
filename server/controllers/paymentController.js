//capture payment
//verify payment


const Payment = require("../models/Payment");
const Razorpay = require('razorpay');
const {instance} =require('../config/razorpay');
const Proposal=require('../models/Proposal');
const Job = require("../models/Job");
const crypto = require("crypto");
const axios=require("axios");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
require("dotenv").config();


exports.capturePayment=async (req,res)=>{

    const {proposal}=req.body;

    // console.log(proposal);

    const amount=proposal.bidAmount*100;
    // const amount=300000

    var options = {
        amount: amount,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    };
    try{
        const paymentResponse = await instance.orders.create(options)
        console.log(paymentResponse)
        res.json({
          success: true,
          data: paymentResponse,
        })
    }catch(error){
        console.log(error);
    }
      
}

exports.verifyPayment=async(req,res)=>{
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const proposal=req.body?.proposal

    const generated_signature = crypto
    .createHmac("sha256", "F2lSNpMkdLcejejPWaJPo7wx")
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

    if (generated_signature == razorpay_signature) {
        // update proposal status
        const response=await Proposal.findByIdAndUpdate(proposal._id, 
            {status:"accepted"}, 
            {new:true})
            
        await Proposal.updateMany(
            { jobId: proposal.jobId, _id: { $ne: proposal._id} },
            { status: "rejected" }
        );

        await Job.findByIdAndUpdate(proposal.jobId, {
                        freelancerId: proposal.freelancerId,
                        status: "in progress",
                        finalAmount:proposal.bidAmount,
                        acceptedProposal:proposal._id,
        });

        // console.log(response);
        return res.status(200).json({ success: true, message: "Payment Verified" })
    }

      return res.status(200).json({ success: false, message: "Payment Failed" })

}

exports.sendPaymentSuccessMail=async(req,res)=>{
  const {userId}=req.user;
  const user=await User.findById(userId)
  const response=await mailSender(user.email, "Payment Successful Email", body)
}

// exports.payout=async(req,res)=>{
//   const { name, email, contact, account_type, account_details } = req.body;
//   const key_id= 'rzp_test_p4Cc7BRTkxzlgr';
//   const key_secret= 'F2lSNpMkdLcejejPWaJPo7wx';
//   const auth = Buffer.from(`${key_id}:${key_secret}`).toString("base64");

//   const payload = {
//     source_account_number: "2323230087175707",
//     reference_id: `ref_${Date.now()}`,
//     fund_account: {
//       account_type,
//       [account_type]: account_details,
//       contact: {
//         name,
//         email,
//         contact,
//         type: "employee",
//         reference_id: `ref_${Date.now()}`,
//         notes: {
//           key1: "Example note",
//           key2: "More info"
//         }
//       }
//     },
//     "amount": 100, // in paise (1.00 INR)
//     "currency": "INR",
//     "reference_id": `ref_${Date.now()}`,
//     "notes": {
//       "random_key_1": "Make it so.",
//       "random_key_2": "Tea. Earl Grey. Hot."
//     }
//   };
// //   console.log(payload);
//   try {
//     const response = await axios.post(
//       "https://api.razorpay.com/v1/fund_accounts/validations",
//       payload,
//       {
//         headers: {
//           Authorization: `Basic ${auth}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log("success");
//     console.log(response);
//     return res.json({ success: true, data: response.data });
//   } catch (error) {
//     // console.error(error);
//     return res.status(500).json({ success: false, error: error.response?.data || error.message });
//   }
// }

exports.payout=async(req,res)=>{
  try {
  const { name, email, contact, account_type, account_details, mode } = req.body;
  const {userId}=req.user;
  const user=await User.findById(userId)
  const key_id= 'rzp_test_p4Cc7BRTkxzlgr';
  const key_secret= 'F2lSNpMkdLcejejPWaJPo7wx';
  const auth = Buffer.from(`${key_id}:${key_secret}`).toString("base64");

  const createContactPayload={
    name,
    email,
    contact,
    "type":"employee",
    "reference_id":`ref_${Date.now()}`,
    "notes":{
      "notes_key_1":"Tea, Earl Grey, Hot",
      "notes_key_2":"Tea, Earl Grey… decaf."
    }
  }
    const createContactResponse=await axios.post(
      "https://api.razorpay.com/v1/contacts",
      createContactPayload,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    ); 

    console.log("*********done1************");
    // console.log(createContactResponse.data);
    
    const createFundAccountPayload={
      "contact_id":createContactResponse.data.id,
      "account_type":account_type,
      [account_type]:account_details
    }

    const createFundAccountResonse=await axios.post(
      "https://api.razorpay.com/v1/fund_accounts",
      createFundAccountPayload,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    )
    console.log("*********done2************");
    console.log(createFundAccountResonse.data.account_type);

    const validateFundAccountPayloadBankAccount={
      "account_number": "2323230087175707",
      "fund_account": {
        "id": createFundAccountResonse.data.id
      },
      "amount": 100,
      "currency": "INR",
      "notes": {
        "random_key_1": "Make it so.",
        "random_key_2": "Tea. Earl Grey. Hot."
      }
    }

    const validateFundAccountPayloadVpa={
      "account_number": "2323230087175707",
      "fund_account": {
        "id": createFundAccountResonse.data.id
      },
      "notes": {
        "random_key_1": "Make it so.",
        "random_key_2": "Tea. Earl Grey. Hot."
      }
    }

    const validateFundAccountResonse=await axios.post(
      "https://api.razorpay.com/v1/fund_accounts/validations",
      createFundAccountResonse.data.account_type=="vpa"?validateFundAccountPayloadVpa:validateFundAccountPayloadBankAccount,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    )
    console.log("*********done3************");
    
    const payoutPayload={
      "account_number": "2323230087175707",
      "fund_account_id": createFundAccountResonse.data.id,
      "amount": user.Balance*100,
      "currency": "INR",
      mode,
      "purpose": "payout",
      "queue_if_low_balance":true,
      "reference_id": `ref_${Date.now()}`,
      "narration": "Acme Corp Fund Transfer",
      "notes": {
        "notes_key_1":"Tea, Earl Grey, Hot",
        "notes_key_2":"Tea, Earl Grey… decaf."
      }
    }
    console.log(payoutPayload);
    const payoutResponse=await axios.post(
      "https://api.razorpay.com/v1/payouts",
      payoutPayload,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    )
    await User.findByIdAndUpdate(userId,{Balance:0});
    
    console.log("************done4***********");
    return res.status(200).json({
      success:true,
      message:"Payout done successfully",
      // payoutResponse
    })
  } catch (error) {
    console.error(error.response?.data || error.message);
    // console.log(error);
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}