exports.FileUploadClient=(
    title,freelancerId,clientId,file
)=>{
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Client Notification For Uploaded Work</title>
    </head>
    <body>
        <div class="container">
            <p>Dear ${clientId.firstName} ${clientId.lastName}</p>
            <p>Work for ${title} has been uploaded by the freelancer-${freelancerId.firstName} ${freelancerId.lastName}.</p>
            <p>Kindly <a href=${file.url}>click here</a> to see the work.</p>
            <p>For contacting the freelancer you can contact him through <a href="mailto:${freelancerId.email}">${freelancerId.email}</a></p>
            <br/>
            <p>Best regards,<br/>Team Gigzy</p>
        </div> 
    </body>
    </html>
    `
}