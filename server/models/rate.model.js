const mongoose = require('mongoose');

const rateSchema =mongoose.Schema({
    comment:{
        type:String,
        require:true
    },
    stars:{
        type:Number
    },
    rater:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    ratee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
})

module.exports = mongoose.model( 'Rate' , rateSchema) ;