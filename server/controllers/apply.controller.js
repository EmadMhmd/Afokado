const applyController = {};
const Internship = require('../models/internship.model.js');
const Apply = require('../models/apply.model.js');
const emailController = require('./email.controller')

applyController.apply = async (req, res, next) => {
    const {user}=req
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
                lawyer:internship.owner,
                internshipId:req.params._id
            })
            await app.save();
            emailController.sendNewMail(user.email, 'Confrim your Application please  http://localhost:3000/my_app', 'Apply Confirmation Email')
            return res.send({
                message: 'Applied successfully',
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
        /*const query={
            trainee: user._id ,
            deleted:0,
            status:'reject',
            stuNotify:1
            }*/
    try {
        const applications = await Apply.find(query).populate('internshipId');
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
        const applications = await Apply.find({ lawyer: user._id , deleted:0 , confirmed :1 , status: { $in: ['pending', 'accept'] }}).populate("trainee internshipId");
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
        if(app.confirmed===1){
            const internCount=await Internship.findOne({ _id: app.internshipId})
            const count=internCount.appCount - 1
            await Internship.updateOne({_id: app.internshipId} , {appCount : count})
        }
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
        const internId=await Apply.findOne({ _id: req.params._id })
        const internCount=await Internship.findOne({ _id: internId.internshipId})
        const count=internCount.appCount  + 1
        await Internship.updateOne({_id:internId.internshipId} , {appCount : count})

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
        const stu=await (await Apply.findOne({ _id: req.params._id }).populate('trainee'))
        emailController.sendNewMail(stu.trainee.email, 'Follow link to visit your applications http://localhost:3000/my_app', 'your application accepted')
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