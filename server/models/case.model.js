const mongoose =require('mongoose');0

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
        ref : 'User',
        required : true
    },
    caseOwner :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    finalDecision :{
        type : String,
    },
    notes:{
        type:String
    }
})

module.exports = mongoose.model( 'Case' , caseSchema) ;