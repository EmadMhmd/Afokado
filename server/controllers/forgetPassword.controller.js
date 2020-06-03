/*const ForgetPassController={}
const nodemailer = require('nodemailer');
const loadsh=require('loadsh');

ForgetPassController.forgetPassword = async (req , res , next) =>{
    const {email} = req.body;
    User.findOne({email}, (err , user)=>{
        if(err || !user){
            return res.status(400).json({error : "User with this email doesnot exist"})
        }
        const token = jwt.sign({_id : user._id } , process.env.RESET_PASSWORD_KEY , {expiresIn : "50m"}) 
        var transporter = nodemailer.createTransport({
           service: "gmail",
           auth: {
               user: "afokadolawyer@gmail.com",
               pass: "emad1998"
           },
           tls:{
               rejectUnauthorized : false
           }
       });
        var mailOption = {
           from:'afokadolawyer@gmail.com',
           to : email,
           subject :'Reset Password afokado Account',
           text : `Reset Your Password please  http://localhost:3000/reset_password/${token}`   
       }
       
       return user.updateOne({resetLink : token } , (err , success)=>{
           if(err){
               return res.status(400).json({error : "Reset password Link error "})
           }
           else{
               transporter.sendMail(mailOption , (err , info )=>{
                   if(err){
                       return res.status(401).send({
                        
                           error :'email sended failed !!'
                       });
                   }
                   else{
                       return res.send({
                           token,
                           message: 'Reset Password mail sent successfully',
                           
                       })
                   }
               })
           }
       })
    })
    
}
ForgetPassController.resetPassword = (req , res , next)=>{
   const { password } =  req.body;
   const {resetLink} =req.params
   console.log('data', password , resetLink)
   if(resetLink){
       jwt.verify(resetLink , process.env.RESET_PASSWORD_KEY ,(error , decodedData)=>{
           if(error){
               return res.status(400).json({
                   error : "InCorrect Token or Expired"
               })
           }
           User.findOne({resetLink} , (err , user) =>{
               if(err || !user){
                   return res.status(400).json({error : "User with this token doesnot exist"})
               }            
               const obj = {
                  password   
                
               }
               obj.password = bcryptjs.hashSync(obj.password , 10)
               user = loadsh.extend(user, obj)
               user.save((err,result)=>{
                   if(err){
                       return res.status(400).json({error: "reset Password Error"})
                   }
                   else{
                       
                      res.status(200).json({message : "Your Password has been changed"})
                   }
               })
           })    
       })

   } 
   else{
       return res.status(400).json({error : "Auth Error"})
   }
}

*/