const mongoose =require('mongoose');

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
        ref : 'User'
    }
})

module.exports = mongoose.model( 'Time' , timeSchema) ;