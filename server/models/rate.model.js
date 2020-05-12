const mongoose = require('mongoose');

const rateSchema =mongoose.Schema({
    comment:{
        type:String,
    },
    stars:{
        type:Number
    },
    rater:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required : true
    },
    ratee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required : true
    },
})

module.exports = mongoose.model( 'Rate' , rateSchema) ;