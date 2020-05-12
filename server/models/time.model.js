const mongoose =require('mongoose');

const init=0
const timeSchema = mongoose.Schema({
    time:{
        type:Date,
        require:true
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
    count:{
        type:Number,
        default:init
    }
})

module.exports = mongoose.model( 'Time' , timeSchema) ;