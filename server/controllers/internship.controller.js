const internshipController = {};
const Internship = require('../models/internship.model.js');
const Apply = require('../models/apply.model.js');


internshipController.addInternship = async (req, res, next) => {
    const { count, description, created, paid , title , startDate , duration , job , role , minExp , maxExp , salary ,jobType} = req.body;
    const newIntern = new Internship({
        count, description, created, paid,title,startDate,duration,job,role,minExp , maxExp , salary ,jobType,
        owner: req.user
    })
    try {
        await newIntern.save();
        return res.send({
            message: 'The internship added successfully'
        })
    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to add new internship'
        });
    }
}

internshipController.fetchInternshipsForApply = async (req, res, next) => {
    var query;
    const { spec, city, paid } = req.params
    if (spec && city && paid) {
        if (spec != 'em' && city != 'em' && paid != 'em') {
            query = {
                spec, city, paid
            }
        } else if (spec != 'em' && city != 'em' && paid === 'em') {
            query = {
                city, spec
            }
        } else if (spec != 'em' && city === 'em' && paid != 'em') {
            query = {
                paid, spec
            }
        } else if (spec === 'em' && city != 'em' && paid != 'em') {
            query = {
                city, paid
            }
        } else if (spec != 'em' && city === 'em' && paid === 'em') {
            query = {
                spec
            }
        } else if (spec === 'em' && city != 'em' && paid === 'em') {
            query = {
                city
            }
        } else if (spec === 'em' && city === 'em' && paid != 'em') {
            query = {
                paid
            }
        }
    } else {
        query = {}
    }
    try {
        const internships = await Internship.find(query).populate('owner').sort({ created: 'asc' });
        return res.send({
            internships
        });
    } catch (e) {
        return res.status(401).send({
            error: 'Fetching failed , Please try again'
        });
    }
}

internshipController.fetchInternshipsForLawyer = async (req, res, next) => {
    try {
        const {user}=req
        const internships = await Internship.find({ owner:user._id }).sort({ created: 'asc' });
        return res.send({
            internships
        });
    } catch (e) {
        return res.status(401).send({
            error: 'fetching failed'
        });
    }
}
internshipController.deleteInternship = async (req, res, next) => {
    try {
        const existOrNot=await Apply.find({internshipId:req.params._id , status:'accept'})
        if(existOrNot.length===0){
            await Internship.deleteOne({ _id: req.params._id });
            return res.send({
                message: 'The internship deleted successfully'
            });
        }else{
            return res.status(401).send({
                error: 'You can not delete this internship , there are applications on this internship'
            });
        }
    
    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to delete the internship'
        });
    }

}

internshipController.updateInternship = async (req, res, next) => {
    const { count, description, paid,title,startDate,duration,role,minExp , maxExp , salary ,jobType } = req.body;
    try {
        await Internship.updateOne(
            { _id: req.params._id },
            {count, description, paid,title,startDate,duration,role,minExp , maxExp , salary ,jobType}
        );
        return res.send({
            message: 'The internshi[p updated successfully'
        });
    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to update the internship'
        });
    }
}

module.exports = internshipController;