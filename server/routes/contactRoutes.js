const express=require("express")
const { contactController } = require("../controllers/contactController")

const router = express.Router();

router.post("/contact-us",contactController);
module.exports = router
