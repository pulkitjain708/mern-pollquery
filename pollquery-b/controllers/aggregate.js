const regs = require('../models/register');
const frms = require('../models/formSchema');
const rsps = require('../models/response');
const mongoose = require('mongoose');

let aggregate = {
    rtnrr:async(req,res)=>{
        let id = req.body.id;
        id = new mongoose.Types.ObjectId(id);
        if(id===undefined || id===""){
            return res.send({status:false});
        }
        let result = await frms.aggregate([
            {$match:{_id:id}},
           {
              $lookup:
                 {
                   from: "rsps",
                   pipeline: [
                      { $match: { form_id:id } },
                      { $project: { _id:0,mail:"$user_mail" } },
                   ],
                   as: "validResponses"
                 }
            },
            {$project:{
                ratio:{$arrayToObject:{
                $map:{	
                input:"$mail",
                as:"m",
                in:{	
                    $cond:{	
                        if:{$in:["$$m","$validResponses.mail"]},
                        then:{k:"$$m",v:true},
                        else:{k:"$$m",v:false}
                        }	
                }
                    }}	
                    }
                }}
        ])
        console.log(result)
        return res.send(result);
    },
    timedQuery:async(req,res)=>{
        let id = req.body.id;
        if(id===undefined || id===""){
            return res.send({status:false});
        }
        id = new mongoose.Types.ObjectId(id);
      let results = await  rsps.aggregate([
            {$match:{form_id:id}},
            {$bucketAuto:{
                    groupBy:"$timestamp",
                    buckets:5,
                    output:{	
                        respondedBy:{
                                $push:"$user_mail"
                                },
                        count:{$sum:1}
                        }
                    }}
        ])
        return res.send(results);
    },
    eachUser:async(req,res)=>{
        let id = req.body.id;
        if(id===undefined || id===""){
            return res.send({status:false});
        }
        id = new mongoose.Types.ObjectId(id);
        let results = await rsps.aggregate([
            {$match:{form_id:id}},
            {$group:{
                _id:"$user_mail",
                timesResponded:{$sum:1},
                responedOn:{$push:"$timestamp"}
                }}
        ])
        return res.send(results)
    }
}

module.exports=aggregate;