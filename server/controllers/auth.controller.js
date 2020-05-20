const authController ={};
const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcryptjs =require('bcryptjs');


//for image
/*
var multer  = require('multer')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
      //const date = now.replace(/:/g, '-'); 
      //cb(null, date + file.originalname);
    }
  })
  
  var upload = multer({ storage: storage }).single('img');
  */



 authController.sign=async (req , res , next)=>{

     /*
     upload(req ,res , function (err){
        if (err instanceof multer.MulterError) {
            console.log(' err' ,err)
          } else if (err) {
            console.log('req file' ,req.files)
          }
    });
    */
   //console.log('req file' ,req)
    const { userName ,mobile , email ,gender , age , spec , sspec , tspec , level , address , city , state  ,uni , password, type , gpa}= req.body; 
    const newUser =new User({                                    
        userName ,mobile , email ,gender , age , spec , sspec , tspec , level , address , city , state  ,uni , password, type , gpa
    })     

     try{
         const salt = await bcryptjs.genSalt(10);                                
         const hashpass =await bcryptjs.hash(newUser.password , salt);              
         newUser.password = hashpass       
         await newUser.save();      
         return res.send({
             message:'You are Registreted Successfully'
            });
         
     }catch(e){
        
         if(e.code === 11000 && e.name === "MongoError"){
             /*error = new Error(`Email Address ${newUser.email} Is already Exist`);
             error.status = 401; 
             next(error)*/
             return res.status(401).send({
                error :`Email Address ${newUser.email} Is already Exist`
            });
         }else{
            /*error = new Error(`Please Try Again ,Failed Registartion`);
            error.status = 401; 
            next(error);*/
            return res.status(401).send({
                error :`Please Try Again ,Failed Registartion`
            });
         }
         
     }
 };
 
 authController.SignForBook=async (req , res , next)=>{
    
    const { userName ,mobile , email , password, type , joined}= req.body;  
    const newUser =new User({                                    
        userName ,mobile , email , password, type , joined
    })     
 
     try{
         const salt = await bcryptjs.genSalt(10);                                 
         const hashpass =await bcryptjs.hash(newUser.password , salt);               
         newUser.password = hashpass                                                
         await newUser.save();          
         return res.send({
             message:'you are registeted successfully'
            });
     }catch(e){
         
         if(e.code === 11000 && e.name === "MongoError"){
             return res.status(401).send({
                error :`Email Address ${newUser.email} Is already Exist`
            });
         }else{
             return res.status(401).send({
                error :'please fill your info again , registration failed'
            });
         }
         
     }
 };

 authController.auth = async (req ,res , next)=>{
    const { email , password}= req.body; 
    try{
        var user = await User.findOne({ email });
        if(!user){
            return res.status(401).send({
                error :`The Email ${email} Is Not Found`
            });
            
        }else{
            user.isPasswordMatched(password , user.password , (err , match)=>{
                if(match){
                    const scret = process.env.JWT_SECRET;
                    const expir = process.env.JWT_EXPIRATION;
                    //jwt.sign(payload , secret , ...)
                    const token = jwt.sign({_id : user._id} , scret , {expiresIn : expir});
                    return res.send({
                        token,
                        message:'you are loged successfully'

                    });
                }
               return res.status(401).send({
                    error :'Invaild UserName/Password Combination'
                });


 
                })

               
        }
    }catch(e){
       return res.status(401).send({
            error :`please login again , login failed`
        });
    }
}


authController.updateUser=async (req , res , next)=>{
   const { userName ,mobile , email ,gender , age , spec , sspec , tspec , level , address , city , state  ,uni , password, type , gpa}= req.body; 
   const {user}=req
   const updatedUser = {                                    
       userName ,mobile , email ,gender , age , spec , sspec , tspec , level , address , city , state  ,uni , password, type , gpa
   }     

    try{
           
        await User.updateOne({_id:user._id},updatedUser )      
        return res.send({
            message:'The profile updated successfully'
           });
        
    }catch(e){
            return res.status(401).send({
               error :`Fail to update the profile , please try again`
           });
      
        
    }
};
authController.upgradeUser=async (req , res , next)=>{
    const {user}=req
     try{
            
         await User.updateOne({_id:user._id} , {type:2} )      
         return res.send({
             message:'The profile upgraded successfully'
            });
         
     }catch(e){
             return res.status(401).send({
                error :`Fail to upgrade the profile , please try again`
            });
       
         
     }
 };

authController.me = (req,res,next)=>{
    const {user} = req;
    return res.send( {user} )
        
}

module.exports = authController;