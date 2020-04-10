const mongoose =require('mongoose');
const bcryptjs =require('bcryptjs');

const archive = 0;
const caseSchema = mongoose.Schema({
    number : {
        type : Number,
    },
    archive : {
        type : Number,
        default:archive
    },
    type :{
        type : String,
    },
    title :{
        type : String,
    },
    description :{
        type : String,
    },  
    claimant :{
        type : String,
    },
    defendant :{
        type : String,
    },
    court :{
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
    },
    tasks:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Task',
    } ,
    finalDecision :{
        type : String,
    },
})




module.exports = mongoose.model( 'Case' , caseSchema) ;