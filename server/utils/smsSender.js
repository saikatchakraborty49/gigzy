const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.mobile_msg_accountSid;
const authToken = process.env.mobile_msg_authToken;

const client = new twilio(accountSid, authToken);

async function smsSender(contactNumber,body){
    client.messages
    .create({
        body: body,
        to: contactNumber,     // Recipient's contactNumber number
        from: '+14709436272',    // Your Twilio phone number
    })
    .then((message) => console.log(`Message sent: ${message.sid}`))
    .catch((err) => console.error(err));
}

module.exports=smsSender;
