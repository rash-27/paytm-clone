const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    bankName:{
        type:String,
        required:true
    },
    balance :{
        type:Number,
        required:true
    }

});

module.exports.Bank = mongoose.model('Bank',bankSchema);