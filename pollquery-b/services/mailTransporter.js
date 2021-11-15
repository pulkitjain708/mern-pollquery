const transporter = require('../config/mailerConfig');

module.exports=async function transport(htmlString,mail,subject){
     await transporter.sendMail({
      from: 'pulkitj89@gmail.com', 
      to: mail, 
      subject: subject, 
      html: htmlString, 
      attachments:[
        {
          cid:"logo",
          path:"logo.png",
          filename:"logo.png"
        }
      ]
    },(err,info)=>{console.log(err,info)});
  }