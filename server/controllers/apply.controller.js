const applyController = {};
const Internship = require('../models/internship.model.js');
const Apply = require('../models/apply.model.js');
const nodemailer = require('nodemailer');


applyController.apply = async (req, res, next) => {
    const {user}=req
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "afokadolawyer@gmail.com",
            pass: "emad1998"
        },
        tls:{
            rejectUnauthorized : false
        }
    });
    const mailOption = {
        from:'afokadolawyer@gmail.com',
        to : 'emadcuster@gmail.com',
        subject :'Apply Confirmation Email',
        text :`Confrim your application please  http://localhost:3000/my_app `   
    }
    try {
        const internship = await Internship.findOne({ _id: req.params._id })
        const queryCheckExisting={
                trainee: user._id,
                lawyer:internship.owner,
                internshipId:req.params._id
        }
        const existOrNot = await Apply.find(queryCheckExisting)
        if (existOrNot.length===0) {
            const Applications = await Apply.find()
            const app = new Apply({
                trainee: user._id,
                no: Applications.length + 1,
                lawyer:internship.owner,
                internshipId:req.params._id
            })
            await app.save();
            transporter.sendMail(mailOption , (err , info )=>{
                if(err){
                    return res.status(401).send({
                        error :'email sended failed !!'
                    });
                }
                else{
                    return res.send({
                        message: 'applied successfully , please confirm your application Now to alert the lawyer',          
                    })
                }
            })
        }else
            return res.status(401).send({
                error :'Already Applied !!'
            });
    } catch (e) {
        return res.status(401).send({
            error :'Please try again to Apply !!'
        });
    }
}

applyController.fetchApplications = async (req, res, next) => {
    const { user } = req;
    const query={
        trainee: user._id ,
        deleted:0,
        }
    try {
        const applications = await Apply.find(query);
        return res.send({
            applications
        });
    } catch (e) {
        return res.status(401).send({
            error :'fetching falied , try again !!'
        });

    }
}
applyController.fetchApplicationRequests = async (req, res, next) => {
    const { user } = req;
    try {
        const applications = await Apply.find({ lawyer: user._id , deleted:0 , confirmed :1 , status :'pending'});
        return res.send({
            applications
        });
    } catch (e) {
        return res.status(401).send({
            error :'fetching failed , try again !!'
        });

    }
}
applyController.deleteApplication = async (req, res, next) => {
    try {
        const app=await Apply.findOne({ _id: req.params._id })
        if(app.notify===0){
            await Apply.deleteOne({ _id: req.params._id })
            return res.send({
                message: 'your application Deleted successfully'
            })
        }
        await Apply.updateOne({ _id: req.params._id } ,{deleted:1})
        return res.send({
            message: 'your application Deleted successfully'
        })
    } catch (e) {
        return res.status(401).send({
            error :'please try again to cancel application !!'
        });
    }
}
applyController.confiremApplication = async (req, res, next) => {
    try {
        await Apply.updateOne({ _id: req.params._id } ,{confirmed:1})
        return res.send({
            message: 'you confirmed your application successfull application',
        })
    } catch (e) {
        return res.status(401).send({
            error :'please try again to confirm your application !!'
        });
    }
}
applyController.rejectApplication = async (req, res, next) => {
    try {
        await Apply.updateOne({ _id: req.params._id } ,{status:'reject'})
        return res.send({
            message: 'the app rejected  successfully',
        })
    } catch (e) {
        return res.status(401).send({
            error :'please try again to confirm your application !!'
        });
    }
}
applyController.acceptApplication = async (req, res, next) => {
    try {
        await Apply.updateOne({ _id: req.params._id } ,{status:'accept'})
        return res.send({
            message: 'the app accepted  successfully',
        })
    } catch (e) {
        return res.status(401).send({
            error :'please try again to confirm your application !!'
        });
    }
}
module.exports = applyController;