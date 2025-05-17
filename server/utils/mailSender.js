const nodemailer = require("nodemailer");
require("dotenv").config();
async function mailSender(email,title,body) {
  // console.log("email:"+email);
    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
              user: "saikatchakraborty416@gmail.com",
              pass: process.env.NODEMAILER_PASS,
            },
          });
          const info = await transporter.sendMail({
            from: '"Admin-Gigzy" <saikatchakraborty416@gmail.com>', // sender address
            to: `${email}`, // list of receivers
            subject:`${title}`, // Subject line
            html: `${body}`, // plain text body
            // html: "<b>Hello world?</b>", // html body
          });  
          // return info;            
    }catch(error){
        console.log(error);
        
        // return error.message
    }
}
module.exports = mailSender;