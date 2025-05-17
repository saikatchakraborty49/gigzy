const express = require("express");
const {capturePayment,verifyPayment,sendPaymentSuccessMail, payout} = require("../controllers/paymentController");
const { auth, isClient } = require("../middlewares/authMiddleware");
const { updateUserBalance } = require("../controllers/userController");

const router = express.Router();

router.post("/capturePayment", auth,isClient, capturePayment);
router.post("/verifyPayment", auth,isClient, verifyPayment);
router.post("/sendPaymentSuccessMail", auth,isClient, sendPaymentSuccessMail);

router.post("/updateBalance", auth, updateUserBalance);
router.post("/payout",auth,payout)
module.exports = router;
