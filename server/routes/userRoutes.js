const express = require("express");
const { getUserProfile, updateProfile,
    //  updateUserProfile
     } = require("../controllers/userController");
const { auth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/profile", auth, getUserProfile);
router.put("/profile",auth, updateProfile);
// router.put("/profile", auth, updateUserProfile);

module.exports = router;
