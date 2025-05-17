const express = require("express");
const { register, login, logout, sendotp, sendMobileotp, verifyMobileotp } = require("../controllers/userController");
const { resetPasswordToken, resetPassword } = require("../controllers/resetPassword");
const { updateProposalStatus } = require("../controllers/applicationController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/sendotp", sendotp);
router.post("/send-mobile-otp", sendMobileotp)
router.post("/verify-mobile-otp", verifyMobileotp)

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

router.put("/update-proposal/:proposalId",updateProposalStatus)

module.exports = router;
