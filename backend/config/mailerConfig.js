const mailer = require('nodemailer');
const {m,p} = require('./mail.json');

let transporter = mailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: m, 
      pass: p, 
    },
  });

module.exports=transporter;