const applyController = {};
const Internship = require('../models/internship.model.js');
const Apply = require('../models/apply.model.js');

applyController.apply = async (req, res, next) => {
    const {user}=req
    try {
        if (1) {
            const internship = await Internship.findOne({ _id: req.params._id })
            const Applications = await Apply.find()
            const app = new Apply({
                trainee: user._id,
                no: Applications.length + 1,
                lawyer:internship.owner,
                internshipId:req.params._id
            })
            await app.save();
            return res.send({
                message: 'applied successfully , please confirm your application Now to alert the lawyer',
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
        const applications = await Apply.find({ lawyer: user._id , deleted:0 , confirmed :1});
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
module.exports = applyController;