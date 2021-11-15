const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({

                mail:{
                    type:String,
                    required:true
                },
                token:{
                    type:String,
                    required:true,
                },
                otp:{
                    type:Number,
                    required:true,
                },
                isRegistered:{
                    type:Boolean
                },
                timestamp:{
                    required:true,
                    type:Date,
                },
                pass:{
                    type:String
                }
                    });

module.exports = mongoose.model('reg',registerSchema);                    