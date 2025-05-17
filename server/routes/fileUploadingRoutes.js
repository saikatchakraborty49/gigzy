const express = require("express");

const { auth, isFreelancer, isClient } = require("../middlewares/authMiddleware");
const { workUploading } = require("../controllers/files/fileUpload");
const router = express.Router();

router.post("/upload-work",auth,workUploading)
module.exports = router;
