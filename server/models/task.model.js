const mongoose = require('mongoose');

const init=0
const taskSchema = mongoose.Schema({
    notify:{
        type:Number,
        default:init
    },
    title:{
        type:String
    },
    created:{
        type:Date,
        default:new Date()
    },
    description:{
        type:String
    },
    caseId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Case'
    },
    owner :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    dateline:{
        type:Date
    },
    decision:{
        type:String
    },
    subLawyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    notes:{
        type:String
    },
})

module.exports = mongoose.model( 'Task' , taskSchema) ;