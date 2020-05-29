const imgController = {};
const User = require('../models/user.model.js');
const multer = require('multer');
const path = require('path');


  const storage = multer.diskStorage({
    destination: "../client/src/images",
    //destination: "./public/profile_images",
    filename: function (req, file, cb) {
        /*const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)*/
        cb(null,  file.fieldname +' _' + Date.now() + path.extname(file.originalname));
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


imgController.uploadProfileImg = (req, res, next) => {

        upload(req, res, function (err) {
            //if (err instanceof multer.MulterError) {
                console.log("Request file ---", req.file);
                const url = req.protocol + '://' + req.get('host')
                User.updateOne({_id:req.user._id} , {img:req.file}).then(()=>{
                    res.send({doen:'done'})
                })
            /*} else if (err) {
                res.send({doen:'nnn done'})
            }*/
            });

};


module.exports = imgController;