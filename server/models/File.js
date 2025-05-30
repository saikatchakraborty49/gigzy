const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        // required:true,
    },
    url:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;