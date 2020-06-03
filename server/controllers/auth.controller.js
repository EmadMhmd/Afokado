const authController = {};
const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
//const multer = require('multer');
const emailController = require('./email.controller')
const loadsh=require('loadsh');

/*
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
  })*/
/*
const storage = multer.diskStorage({
    destination: "./public/",
    filename: function (req, file, cb) {
        cb(null,  file.fieldnam +'_' + Date.now() + path.extname(file.originalname));
    }
});
*/
/*
 const DIR = './public/';
 const storage = multer.diskStorage({
     destination: (req, file, cb) => {
         cb(null, DIR);
     },
     filename: (req, file, cb) => {
         const fileName = file.originalname.toLowerCase().split(' ').join('-');
         
         cb(null, uuidv4() +'-' + fileName)
     }
 });


const upload = multer({
    storage: storage,
     limits:{fileSize: 1000000},
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}).single('profileImg');
*/

authController.imgUpload = async (req, res, next) => {
    
        

        /*upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                console.log("Request file ---", req.file);
                const { user } = req
                const img=req.file
                User.updateOne({_id:user._id} , {img}).then(()=>{
                    res.send({doen:'done'})
                })
            } else if (err) {
                res.send({doen:'nnn done'})
            }
            });*/

    /*
        upload(req ,res , function (err){
            if (err instanceof multer.MulterError) {
                console.log(' err' ,err)
              } else if (err) {
                console.log('req file' ,req.files)
              }
        });
        
        const url = req.protocol + '://' + req.get('host')
        const {user}=req
        const newImg = {                                    
            _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    img: url + '/public/' + req.file.filename
        }     
     */
    /*try{
               
            await User.updateOne({_id:user._id},newImg )      
            return res.send({
                message:'The profile updated successfully'
               });
            
        }catch(e){
                return res.status(401).send({
                   error :`Fail to update the profile , please try again`
               });
          
            
        }*/
/*
    User.updateOne({ _id: user._id }, newImg).then(result => {
        res.status(201).json({
            message: "The profile Image updated successfully!",
            userCreated: {
                _id: result._id,
                profileImg: result.profileImg
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
*/
};

authController.sign = async (req, res, next) => {
    const { userName, mobile, email, gender, age, spec, sspec, tspec, level, address, city, state, uni, password, type, gpa } = req.body;
    const newUser = new User({
        userName, mobile, email, gender, age, spec, sspec, tspec, level, address, city, state, uni, password, type, gpa
    })

    try {
        const salt = await bcryptjs.genSalt(10);
        const hashpass = await bcryptjs.hash(newUser.password, salt);
        newUser.password = hashpass
        await newUser.save();
        return res.send({
            message: 'You are Registreted Successfully'
        });

    } catch (e) {

        if (e.code === 11000 && e.name === "MongoError") {
            /*error = new Error(`Email Address ${newUser.email} Is already Exist`);
            error.status = 401; 
            next(error)*/
            return res.status(401).send({
                error: `Email Address ${newUser.email} Is already Exist`
            });
        } else {
            /*error = new Error(`Please Try Again ,Failed Registartion`);
            error.status = 401; 
            next(error);*/
            return res.status(401).send({
                error: `Please Try Again ,Failed Registartion`
            });
        }

    }
};

authController.SignForBook = async (req, res, next) => {

    const { userName, mobile, email, password, type, joined } = req.body;
    const newUser = new User({
        userName, mobile, email, password, type, joined
    })

    try {
        const salt = await bcryptjs.genSalt(10);
        const hashpass = await bcryptjs.hash(newUser.password, salt);
        newUser.password = hashpass
        await newUser.save();
        return res.send({
            message: 'you are registeted successfully'
        });
    } catch (e) {

        if (e.code === 11000 && e.name === "MongoError") {
            return res.status(401).send({
                error: `Email Address ${newUser.email} Is already Exist`
            });
        } else {
            return res.status(401).send({
                error: 'please fill your info again , registration failed'
            });
        }

    }
};

authController.auth = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        var user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({
                error: `The Email ${email} Is Not Found`
            });
        } else {
            user.isPasswordMatched(password, user.password, (err, match) => {
                if (match) {
                    const scret = process.env.JWT_SECRET;
                    const expir = process.env.JWT_EXPIRATION;
                    const token = jwt.sign({ _id: user._id }, scret, { expiresIn: expir });
                    return res.send({
                        token,
                        message: 'you are loged successfully'

                    });
                }
                return res.status(401).send({
                    error: 'Invaild UserName/Password Combination'
                });
            })
        }
    } catch (e) {
        return res.status(401).send({
            error: `please login again , login failed`
        });
    }
}


authController.updateUser = async (req, res, next) => {
    const { userName, mobile, email, gender, age, spec, sspec, tspec, level, address, city, state, uni, password, type, gpa } = req.body;
    const { user } = req
    const updatedUser = {
        userName, mobile, email, gender, age, spec, sspec, tspec, level, address, city, state, uni, password, type, gpa
    }
    try {
        await User.updateOne({ _id: user._id }, updatedUser)
        return res.send({
            message: 'The profile updated successfully'
        });
    } catch (e) {
        return res.status(401).send({
            error: `Fail to update the profile , please try again`
        });
    }
};
authController.upgradeUser = async (req, res, next) => {
    const { user } = req
    try {
        await User.updateOne({ _id: user._id }, { type: 2 })
        return res.send({
            message: 'The profile upgraded successfully'
        });
    } catch (e) {
        return res.status(401).send({
            error: `Fail to upgrade the profile , please try again`
        });
    }
};

authController.forgetPassword = async (req , res , next) =>{
    const {email} = req.body;
    User.findOne({email}, (err , user)=>{
        if(err || !user){
            return res.status(400).json({error : "this email is not exist"})
        }
        const token =jwt.sign({_id : user._id } , process.env.RESET_PASSWORD_KEY , {expiresIn : "10m"}) 
        return user.updateOne({resetLink : token } , (err , success)=>{
            if(err){
                return res.status(400).json({error : "Please try again to send reset email"})
            }
            else{
                emailController.sendNewMail(email, `Reset Your Password please  http://localhost:3000/reset_password/${token}` , 'Reset Password afokado Account')
                return res.send({
                    message: 'Please check your email to reset your password',
                })
            }
        })
    })
    
}
authController.resetPassword =  (req , res , next)=>{
   const { password } =  req.body;
   const {resetLink} =req.params;
   if(resetLink){
       jwt.verify(resetLink , process.env.RESET_PASSWORD_KEY ,(error , decodedData)=>{
           if(error){
               return res.status(400).json({
                   error : "InCorrect Token or Expired Token"
               })
           }
               User.findOne({resetLink} , (err , user) =>{
               if(err || !user){
                   return res.status(400).json({error : "InCorrect Token or Expired Token"})
               }            
               const obj = {password }
               obj.password = bcryptjs.hashSync(obj.password , 10)
               user = loadsh.extend(user, obj)
               user.save()
               return res.send({
                message: 'your password reseted successfully',
            })
           })    
       })
   } 
   else{
    return res.status(401).send({
        error :'Valied token or token expire !!'
    });
   }
}

authController.me = (req, res, next) => {
    const { user } = req;
    return res.send({ user })

}

module.exports = authController;