const Razorpay=require("razorpay")
require('dotenv').config();

exports.instance = new Razorpay({
    key_id: process.env.razorpay_key_id,
    key_secret: process.env.razorpay_key_secret,
  });