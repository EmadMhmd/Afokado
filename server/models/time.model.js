const mongoose =require('mongoose');

const init=0
const timeSchema = mongoose.Schema({
    time:{
        type:Date,
        require:true
    },
    owner :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    count:{
        type:Number,
        default:init
    },
    start:{
        type:String
    },
    end:{
       type:String
   }
})

module.exports = mongoose.model( 'Time' , timeSchema) ;