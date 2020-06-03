const mongoose =require('mongoose');

const init=0;
const dvStatus='cur';
const bookSchema = mongoose.Schema({
    notify:{
        type:Number,
        default:init
    },
    Status:{
        type:String,
        default:dvStatus
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
        ref : 'Time',
        required : true
    },
    created:{
        type:Date,
        required : true,
        default:new Date()
    },
    lawyer:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    booker:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required : true
    }
        
},{timestamps: true})




module.exports = mongoose.model( 'Book' , bookSchema) ;