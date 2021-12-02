const formSchema = require('../models/formSchema');
const mailTransporter = require('../services/mailTransporter');
const validateMail = require('../services/validator').validateMail;
const newFormTemplate = require('../services/mailTemplates/newForm');
const response = require('../models/response');
const submitted = require('../services/mailTemplates/formSubmit');
const { Parser } = require('json2csv');

let forms = {
 newForm: async (req,res)=>{
     let formResponse = req.body;
     let template=""
     let {mail,author,name} = formResponse;
     let verifiedMails=mail.map(m=>m.trim()).filter(m=>validateMail(m));
     let link = name.replace(/\s+/g, '-').toLowerCase()+"-"+Math.random().toString(36).substr(3);
     mail.forEach(async m=>{
         template = newFormTemplate(author,`http://localhost:3000/submitForm/${m}/${link}`,m);
       await mailTransporter(template,m,"New Form shared with You !!");
     })
     await new formSchema({...formResponse,mail:verifiedMails,link,timestamp:new Date()}).save();
     return res.send({link,message:"success"});
 }
 ,
 getFormsByMail:async(req,res)=>{
     let {mail} = req.body;
     let fetchedForms = await formSchema.find({author:mail},{name:1,description:1});
     if(!fetchedForms){
         return res.send({message:"no forms available"});
     }
     else{
         return res.send({message:"success",data:fetchedForms})
     }
 }
 ,
 formBelongsToUser : async (req,res) => {
     let {mail,formLink} = req.body;
     let isAvail =await  formSchema.find({link:formLink,mail:{$in:[mail]}},{mail:0})
    //  console.log(isAvail)
     if (isAvail.length===0)
     return res.send({status:false})
     else
     return res.send({status:true,form:isAvail[0]})
 },
 submitFormResult:async(req,res)=>{
     let {form_id,mail} = req.body;
     let formResponse = {...req.body}
     delete formResponse.form_id;
     delete formResponse.mail;
     console.log(form_id,formResponse,mail);
     await new response({response:formResponse,user_mail:mail,form_id,timestamp:new Date()}).save();
     return res.send({status:true,message:"You would recive a copy of response via mail"});
 },
 submitHTML:async(req,res)=>{
     let {mail,html} = req.body;
     await mailTransporter(submitted(html),mail,"Your Response on PollQuery !!");
     return res.send("OK");
 },
 getResponses:async(req,res)=>{
     let {id} = req.body;
        let responses = await response.find({form_id:id},{response:1,_id:0})
        if (responses.length===0){
            res.send({status:false,message:"No responses availabel"})
        }
        else{
            
           const fields = Object.keys(responses[0].response).map(k=>{return {label:k,value:k}})
           const data = responses.map(k=>k.response)
           try{
               const parser = new Parser({fields});
               const csv = parser.parse(data);
               res.header('Content-Type', 'text/csv');
               res.attachment(`${id}.csv`);
               return res.send(csv);
             
           }
           catch(err){
               console.log(err);
           }
        }

 },
 customizedDatatable:async(req,res)=>{
     let {formId} = req.body;
        let results = await response.find({form_id:formId},{response:1})
        return res.send(results)
 },
 deleteResponse:async(req,res)=>{
     let {id} =req.body;
        await response.remove({_id:id})
        return res.send({status:"deleted"});
 }
}

module.exports=forms;