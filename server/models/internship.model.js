const mongoose =require('mongoose');

const count = 1;
const init =0;
const internshipSchema = mongoose.Schema({
    count : {
        type : Number,
        default:count
    },
    paid :{
        type : Number,
        default:init
    },
    duration :{
        type : Number
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
        ref : 'User'
    }
})




module.exports = mongoose.model( 'Internship' , internshipSchema) ;