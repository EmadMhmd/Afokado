const internshipController = {};
const Internship = require('../models/internship.model.js');
const Apply = require('../models/apply.model.js');


internshipController.addInternship = async (req, res, next) => {
    const { count, description, created, paid } = req.body;
    const newIntern = new Internship({
        count, description, created, paid,
        owner: req.user
    })
    try {
        await newIntern.save();
        return res.send({
            message: 'the internship added successfully'
        })
    } catch (e) {
        return res.status(401).send({
            error: 'please try again to add new internship'
        });
    }
}
/*
       
*/

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
        const internships = await Internship.find(query).sort({ created: 'asc' });
        return res.send({
            internships
        });
    } catch (e) {
        return res.status(401).send({
            error: 'fetching failed'
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
        const existOrNot=await Apply.find({internshipId:req.params._id})
        if(existOrNot.length===0){
            await Internship.deleteOne({ _id: req.params._id });
            return res.send({
                message: 'the internship deleted successfully'
            });
        }else{
            return res.status(401).send({
                error: 'you can not delete this internship , there are applications on this internship'
            });
        }
    
    } catch (e) {
        return res.status(401).send({
            error: 'please try again to delete the internship'
        });
    }

}

internshipController.updateInternship = async (req, res, next) => {
    const { count, description, created, paid } = req.body;
    try {
        await Internship.updateOne(
            { _id: req.params._id },
            { count, description, created, paid }
        );
        return res.send({
            message: 'the internshi[p updated successfully'
        });
    } catch (e) {
        return res.status(401).send({
            error: 'please try again to update the internship'
        });
    }
}

module.exports = internshipController;