const mongoose =require('mongoose');
const bcryptjs =require('bcryptjs');


const type=1;
const user = mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    mobile : {
        type : Number,
        unique:true,
    },
    email :{
        type : String,
        required:true,
        unique:true,
    },
    gender : {
        type : String
    },
    age : {
        type : Number
    },
    spec :{
        type : String
    },
    sspec :{
        type : String
    },
    tspec :{
        type : String
    },
    level :{
        type : Date
    },
    address :{
        type : String
    },
    city :{
        type : String
    },
    state :{
        type : String
    },
    uni:{
        type : String
    },
    password :{
        type : String,
        require :true
    },
    type :{
        type : Number,
        default:type
    },
    rank :{
        type : Number,
    },
    joined:{
        type:Date,
        default:new Date()
    },
    gpa:{
        type:String,
    },
    bio:{
        type:String
    },
    img:{
    },
    rate:{
        type:Number
    },
    resetLink:{
        type:String,
        default:""
    },
     startTime:{
         type:Date
     },
     endTime:{
        type:Date
    }

})


//for encrypt password

/*user.pre('save' ,async (next)=>{
    //check if new password , or password is modified
    if(!this.isModified('password')){
        return next();
    }
    
    //encrypt password
    try{
        const salt = await bcryptjs.genSalt(10);
        const hashpass =await bcryptjs.hash(this.password , salt);
        this.password =hashpass;
        next();
    }catch(err){
        return next(err);
    }
    
})*/


//for compare hashed password with sended password
user.methods.isPasswordMatched= function (passwoed , hashed , callback){
    bcryptjs.compare(passwoed , hashed , (err , match)=>{

        if(err) {return callback(err);}
        else    {return callback(null ,match);}

    })
}


module.exports = mongoose.model( 'User' , user) ;