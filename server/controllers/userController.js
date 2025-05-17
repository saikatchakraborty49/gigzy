const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require('otp-generator');
const OTP = require("../models/OTP");
const MobileOtp = require("../models/MobileOtp");
require("dotenv").config();

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, accountType:role, otp,profilePicture} = req.body;
        if(password!==confirmPassword){
            res.status(400).json({
                success:false,
                message:"Password and Confirm password is not matching"
            })
          }
    
        const existingUser = await User.findOne({ email })
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: "User already exists. Please sign in to continue.",
          })
        }
    
        const response=await OTP.find({email}).sort({createdAt:-1}).limit(1)
    
        if (response.length === 0) {
            // OTP not found for the email
            return res.status(400).json({
              success: false,
              message: "The OTP is not valid",
            })
          } else if (otp !== response[0].otp) {
            // Invalid OTP
            return res.status(400).json({
              success: false,
              message: "The OTP is not valid",
            })
          }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName,lastName, email, password: hashedPassword, role,profilePicture });
        await user.save();
        return res.status(201).json({ 
            success:true,
            message: "User registered successfully" 
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { userId: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1d" }
        );
        // res.cookie("token", token, { httpOnly: true,expires:new Date(Date.now()+3*24*60*60*1000)});
        // res.cookie("token", token, { 
        //     httpOnly: true, 
        //     sameSite: "Lax", // More secure for localhost
        //     expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        // });
        
        const options={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
            secure:true,
            sameSite:'None',
            token,
        }
        user.password=undefined;
        user.token=token

        res.cookie("token",token,options)
        return res.status(200).json({
          success:true,
          token,
          user,
          message:'User login successful'
        })

        // user.password=undefined;
        // user.token=token
        // res.status(200).json({ 
        //     success: true,
        //     message: "Login successful",
        //     user
        // });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.logout = (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ 
            success:true,
            message: "Logout successful" 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Logout unsuccessful"
        })
    }
    
};

exports.sendotp=async (req,res)=>{
    try {
        const {email}=req.body;
        const checkUserPresent = await User.findOne({ email })
    // to be used in case of signup

    // If user found with provided email
    if (checkUserPresent) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is Already Registered`,
      })
    }
        var otp= otpGenerator.generate(
        6, 
        { 
            digits: true,
            upperCaseAlphabets: false, 
            specialChars: false,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false
        });
        var result=await OTP.findOne({otp})
        while (result) {
            otp= otpGenerator.generate(
                6, 
                { 
                    digits: true,
                    upperCaseAlphabets: false, 
                    specialChars: false,
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets: false
            });
        }
        await OTP.create({email,otp});
        return res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            data:otp
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in sending otp"
        })
    }
};
exports.sendMobileotp=async (req,res)=>{
    try {
        const {contactNumber}=req.body;
        // const checkUserPresent = await User.findOne({ email })
    // to be used in case of signup

    // If user found with provided email
    // if (checkUserPresent) {
    //   // Return 401 Unauthorized status code with error message
    //   return res.status(401).json({
    //     success: false,
    //     message: `User is Already Registered`,
    //   })
    // }
        var otp= otpGenerator.generate(
        6, 
        { 
            digits: true,
            upperCaseAlphabets: false, 
            specialChars: false,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false
        });
        var result=await OTP.findOne({otp})
        while (result) {
            otp= otpGenerator.generate(
                6, 
                { 
                    digits: true,
                    upperCaseAlphabets: false, 
                    specialChars: false,
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets: false
            });
        }
        await MobileOtp.create({contactNumber,otp});
        return res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            data:otp
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in sending otp"
        })
    }
};

exports.verifyMobileotp=async(req,res)=>{
    try{
        const {contactNumber,OTP}=req.body;
        var otp=await MobileOtp.find({contactNumber}).sort({createdAt:-1}).limit(1);
        if(!otp){
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
              })
        } 
        // console.log(otp);
        // else if (otp !== response[0].otp) {
        //   // Invalid OTP
        //   return res.status(400).json({
        //     success: false,
        //     message: "The OTP is not valid",
        //   })
        // }
        if(OTP==otp[0].otp){
            return res.status(200).json({
                success:true,
                message:"OTP is correct."
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"OTP is not correct.",
                otp
            })
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in sending otp"
        })
    }
    
}

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId).select("-password"); // Exclude password

        if (!user) return res.status(404).json({ success:false,message: "User not found" });

        res.status(200).json({ 
            success: true, 
            // message:"User"
            user 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
             success:false,
             message: error.message 
        });
    }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // assuming you're using auth middleware
    const {
      firstName,
      lastName,
      bio,
      skills,
      experience,
      portfolioLinks,
      profilePicture,
      contactNumber,
      DateOfBirth,
    } = req.body;

    // Build update object dynamically
    const updates = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(bio && { bio }),
      ...(skills && { skills }),
      ...(experience !== undefined && { experience }),
      ...(portfolioLinks && { portfolioLinks }),
      ...(profilePicture && { profilePicture }),
      ...(contactNumber && { contactNumber }),
      ...(DateOfBirth && { DateOfBirth }),
      updatedAt: new Date(),
    };

    console.log(updates);

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};


exports.updateUserBalance=async(req,res)=>{
    try {
        const {userId,money}=req.body;
        const user = await User.findByIdAndUpdate(
            userId,
            { $inc: { Balance: money } },
            { new: true }
          );
          

        if (!user) return res.status(404).json({ error: "User not found" });

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message:error.message 
        });
        
    }
}
