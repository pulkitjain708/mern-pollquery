const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({

                author:{
                    type:String,
                    required:true
                },
                description:{
                    type:String,
                    required:true,
                },
                name:{
                    type:String,
                    required:true,
                },
                mail:{
                    type:[]
                },
                timestamp:{
                    required:true,
                    type:Date,
                },
                link:{
                    required:true,
                    type:String
                },
                form_data:{
                    type:[{}],
                    required:true
                }
                    });

module.exports = mongoose.model('frm',formSchema);                    