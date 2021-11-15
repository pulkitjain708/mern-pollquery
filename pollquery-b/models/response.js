const mongoose = require('mongoose');

const responsesSchema = new mongoose.Schema({
    form_id: { type: mongoose.Schema.Types.ObjectId, ref: 'frm' },
    response :{type:{}},
    user_mail:{type:String,required:true},
    timestamp:{type:Date,required:true}
                    });

module.exports = mongoose.model('rsp',responsesSchema);                    