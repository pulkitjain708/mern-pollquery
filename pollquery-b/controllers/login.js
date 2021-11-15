const regs = require('../models/register');
const validateMail = require('../services/validator').validateMail;

let login = {

    loginController: async (req,res)=>{
        let {mail,pass} = req.body;
        console.log(mail)
        let resp = validateMail(mail) ? null : {"error":"Enter Mail in Valid Format"};
        if(!resp)
        {
            let details = await regs.findOne({mail,pass,isRegistered:true});
            if(details){
                // session set
                return res.send({"message":"Logged In"})
            }
            else{
                return res.send({"error":"No such account exist's"})
            }
        }
        else
        {
            return res.send(resp);
        }
    }

}

module.exports=login;