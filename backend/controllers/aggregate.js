const regs = require('../models/register');
const frms = require('../models/formSchema');
const rsps = require('../models/response');
const mongoose = require('mongoose');

let aggregate = {
    // rtnrr:async(req,res)=>{
    //     let id = req.body.id;
    //     id = new mongoose.Types.ObjectId(id);
    //     if(id===undefined || id===""){
    //         return res.send({status:false});
    //     }
    //     let result = await frms.aggregate([
    //         {$match:{_id:id}},
    //        {
    //           $lookup:
    //              {
    //                from: "rsps",
    //                pipeline: [
    //                   { $match: { form_id:id } },
    //                   { $project: { _id:0,mail:"$user_mail" } },
    //                ],
    //                as: "validResponses"
    //              }
    //         },
    //         {$project:{
    //             ratio:{$arrayToObject:{
    //             $map:{	
    //             input:"$mail",
    //             as:"m",
    //             in:{	
    //                 $cond:{	
    //                     if:{$in:["$$m","$validResponses.mail"]},
    //                     then:{k:"$$m",v:true},
    //                     else:{k:"$$m",v:false}
    //                     }	
    //             }
    //                 }}	
    //                 }
    //             }}
    //     ])
    
    //     console.log(result)
    //     return res.send(result);
    // },
   
    clubbed:async(req,res)=>{
        let id = req.body.id;
        id = new mongoose.Types.ObjectId(id);
        let ratio = await frms.aggregate([
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
		{
		$project:{
			_id:0,
			ratio:{
			$reduce:{
				input:"$mail",
				initialValue:{responded:0,notResponded:0},
				in:{
				responded:{$add:["$$value.responded",{$cond:{if:{$in:["$$this","$validResponses.mail"]},then:1,else:0}}]},
				notResponded:{$add:["$$value.notResponded",{$cond:{if:{$eq:[{$in:["$$this","$validResponses.mail"]},false]},then:1,else:0}}]}
				   }
				}
			     }
			}
		}
        ])

        let timedQuery = await rsps.aggregate([
                    {$match:{form_id:id}},
                    {$bucketAuto:{
                            groupBy:"$timestamp",
                            buckets:12,
                            output:{	
                                respondedBy:{
                                        $push:"$user_mail"
                                        },
                                count:{$sum:1}
                                }
                            }}
                ])

                let eachUser = await rsps.aggregate([
                            {$match:{form_id:id}},
                            {$group:{
                                _id:"$user_mail",
                                timesResponded:{$sum:1},
                                responedOn:{$push:"$timestamp"}
                                }}
                        ])
                        // console.log(eachUser)
            let eachUserConfig={
              options:{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' ,
                  },
                  title: {
                    display: true,
                    text: 'Each User Response Count',
                  },
                },
              },
              data:{
                labels:eachUser.map(eu=>eu._id),
                datasets: [
                  {
                    label: 'Each User Response Count',
                    data: eachUser.map(eu=>eu.timesResponded),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  }
                ],
              }
            }

            let ratioConfig={
                labels: ['Responded', 'Not Responded'],
                datasets: [
                  {
                    label: 'Responded to Not Responded Ratio',
                    data: [ratio[0].ratio.responded,ratio[0].ratio.notResponded],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 3,
                  },
                ],
              }  
              console.log(timedQuery)
              let timedQueryConfig={
                data:{
                  labels:timedQuery.map(tq=>String(tq._id.min).split('T')[0]),
                  datasets: [
                    {
                      label: 'Intervals',
                      data: timedQuery.map(tq=>tq.count),
                      borderColor: 'rgb(255, 99, 132)',
                      backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }
                  ],
                },
                options:{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Responses by Time Count',
                    },
                  },
                }
              }
            return res.send({ratioConfig,eachUserConfig,timedQueryConfig})

    }
}

module.exports=aggregate;