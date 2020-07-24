const mongoose =require('mongoose');

const count = 1;
const init =0;
const internshipSchema = mongoose.Schema({
    title : {
        type : String
    },
    count : {
        type : Number,
        default:count
    },
    paid :{
        type : String
    },
    duration :{
        type : Number
    },
    startDate:{
        type:Date,
    },
    description :{
        type : String,
    },
    requirements :{
        type : String,
    },
    quailfications :{
        type : String,
    },
    created:{
        type:Date,
        required : true,
        default:new Date()
    },
    owner :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    appCount:{
        type:Number,
        default:init
    },
    minExp:{
        type:Number,
        default:init
    },
    maxExp:{
        type:Number,
        default:init
    },
    job:{
        type:Number,
        default:init
    },
    role:{
        type:String
    },
    jobType:{
        type:String
    },
    salary:{
        type:Number
    }
})

module.exports = mongoose.model( 'Internship' , internshipSchema) ;