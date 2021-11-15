// flag request with headers as not fulfilable sending error code

const register = require('../models/register');
const validateMail = require('../services/validator').validateMail;
const registerTemplate = require('../services/mailTemplates/register');
const mailTransporter = require('../services/mailTransporter');

exports.registerController= async (req,res)=>{
    let {mail} = req.body;
    errs=[]
    console.log(validateMail,mail);
    if(!validateMail(mail)){
    errs.push("Mail not Valid !!")
    }
    if(errs.length==0){
       const exists = await register.findOne({mail});
       console.log(exists)
       if(exists){
       if(exists.isRegistered==true){
          errs.push("This mail is Registered with us !!") 
       }
       else if(exists.isRegistered==false){
        errs.push("Check mail to get the OTP !!")
       }
    }
    }
    if(errs.length>0){
        return res.send({"error":[...errs]});
    }
    else{
        let token = Math.random().toString(36).substr(3)
        let otp = 10000000 + Math.floor(Math.random() * 90000000);
        new register({
            mail:mail,
            otp:otp,
            token:token,
            isRegistered:false,
            timestamp:new Date()
        }).save();
        mailTransporter(registerTemplate(mail,'o',otp),mail,"Registration on PollQuery");
        return res.send({token:token,mail:mail});
        
    }
}

exports.verifyTokenController= async (req,res)=>{
    let {mail,otp,token} = req.body;
    let arrDateStamp=new Date();
    let dta = await register.findOne({mail,otp,token}); 
    if(!dta)
    return res.send({
        'error':"Incorrect Details"
    })
    let {timestamp} = dta
    console.log(timestamp);
    let dateDiffinMin=(arrDateStamp-timestamp)/(1000*60);
    let pass = Math.random().toString(36).substr(3,10)
    // 1 s = 1000 ms
    if(dateDiffinMin<=1.2)
    {
       let user = await register.findOneAndUpdate({mail,otp,token},
        {isRegistered:true,
            $set:{
                pass:pass
            },
            $unset:{
                token:"",
                otp:"",
                timestamp:""
            }});
       if (user){
        mailTransporter(registerTemplate(mail,'p',pass),mail,"Password for PollQuery");
        return res.send({
            'message':"You have been successfully registered"
        })}
    }
    else
    {
        await register.findOneAndRemove({mail,otp,token});
        return res.send({
            'error':"Time expired , Try Again.."
        })
    }
}