const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
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
        ref : 'User'
    },
    dateline:{
        type:Date
    },
    decision:{
        type:String
    },
    subLawyer:{
        type:String
    },
    notes:{
        type:String
    },
})

module.exports = mongoose.model( 'Task' , taskSchema) ;