const mongoose = require('mongoose');

const officeSchema =mongoose.Schema({
    mainLawyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required : true
    },
    subLawyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required : true
    },
    status:{
        type:String,
        default:'pending'
    }
})

module.exports = mongoose.model( 'Office' , officeSchema) ;