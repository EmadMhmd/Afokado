const mongoose =require('mongoose');

const notify=0;
const timeSchema = mongoose.Schema({
    index:{
        type:Number,
    },
    time:{
        type:Date,
        require:true
    },
    notify:{
        type:Number,
        default:notify
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
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    books:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
    bookers:[
        {  
            no:{
                type:Number
            },
            bookTime:{
                type:Date
            },
            booker:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
            }
        }  
    ]
        
   
})




module.exports = mongoose.model( 'Time' , timeSchema) ;