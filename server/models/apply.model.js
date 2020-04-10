const mongoose =require('mongoose');

const init=0;
const applySchema = mongoose.Schema({
    notify:{
        type:Number,
        default:init
    },
    deleted:{
        type:Number,
        default:init
    },
    confirmed:{
        type:Number,
        default:init
    },
    internshipId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Time'
    },
    created:{
        type:Date,
        required : true,
        default:new Date()
    },
    lawyer:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    no:{
        type:Number
    }, 
    trainee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
        
})

module.exports = mongoose.model( 'Apply' , applySchema) ;