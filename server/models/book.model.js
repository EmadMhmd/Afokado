const mongoose =require('mongoose');

const init=0;
const bookSchema = mongoose.Schema({
    notify:{
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
    timeId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Time'
    },
    time:{
        type : Date,
    },
    created:{
        type:Date,
        required : true,
        default:new Date()
    },
    lawyer:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    lawyerName:{
        type:String
    },
    no:{
        type:Number
    }, 
    booker:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
        
})




module.exports = mongoose.model( 'Book' , bookSchema) ;