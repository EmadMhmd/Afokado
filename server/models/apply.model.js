const mongoose =require('mongoose');

const init=0;
const status='pending';
const dvStatus='cur';
const applySchema = mongoose.Schema({
    notify:{
        type:Number,
        default:init
    },
    stuNotify:{
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
    status:{
        type:String,
        default:status
    },
    internshipId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Internship',
        required : true
    },
    created:{
        type:Date,
        required : true,
        default:new Date()
    },
    lawyer:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    trainee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required : true
    }
        
})

module.exports = mongoose.model( 'Apply' , applySchema) ;