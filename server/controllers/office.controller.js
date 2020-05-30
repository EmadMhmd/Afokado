const officeController = {};
const User = require('../models/user.model.js');
const Office = require('../models/office.model');
const nodemailer = require('nodemailer');


officeController.addToOffice = async (req, res, next) => {
    const { user } = req
    const queryCheckExisting = {
        mainLawyer: user._id,
        subLawyer: req.params.id,
        status: { $in: ['pending', 'accept'] }
    }

    try {
        const existOrNot = await Office.find(queryCheckExisting)
        if (existOrNot.length === 0) {

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "afokadolawyer@gmail.com",
                    pass: "emad1998"
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            const subLawyer = await User.findOne({ _id: req.params.id })
            const mailOption = {
                from: 'afokadolawyer@gmail.com',
                to: subLawyer.email,
                subject: 'Apply Confirmation Email',
                text: `Confrim your application please  http://localhost:3000/my_app `
            }
            const newOffice = new Office({
                mainLawyer: user._id,
                subLawyer: req.params.id,
            })

            await newOffice.save();
            transporter.sendMail(mailOption, (err, info) => {
                if (err) {
                    return res.status(401).send({
                        error: 'email sended failed !!'
                    });
                }
                else {
                    return res.send({
                        message: 'add successfully',
                    })
                }
            })
        } else {
            return res.status(401).send({
                error: 'Already added !!'
            });
        }

    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to Apply !!'
        });
    }
}

officeController.getOffice = async (req, res, next) => {
    const { user } = req;
    const query = {
        mainLawyer: user._id,
        status: { $in: ['pending', 'accept'] },
        
    }
    try {
        const office = await Office.find(query).populate('subLawyer');
        return res.send({
            office
        });
    } catch (e) {
        return res.status(401).send({
            error: 'fetching falied , try again !!'
        });

    }
}
officeController.getMyOffice = async (req, res, next) => {
    const { user } = req;
    const query = {
        subLawyer: user._id,
        status: { $in: ['pending', 'accept'] }
    }
    try {
        const office = await Office.find(query).populate('mainLawyer');
        return res.send({
            office
        });
    } catch (e) {
        return res.status(401).send({
            error: 'fetching falied , try again !!'
        });

    }
}
officeController.getNewOffice = async (req, res, next) => {
    const { email, mobile } = req.params
    var query
    if (email !== 'em' && mobile === 'em') {
        query = { email, type: { $in: [2, 3] } }
    } else if (email === 'em' && mobile !== 'em') {
        query = { mobile, type: { $in: [2, 3] } }
    } else {
        query = { email, mobile, type: { $in: [2, 3] } }
    }
    try {
        const newOffice = await User.find(query)
        return res.send({
            newOffice
        });
    } catch (e) {
        return res.status(401).send({
            error: 'fetching failed , try again !!'
        });

    }
}
officeController.deleteFromOffice = async (req, res, next) => {
    const { user } = req
    try {
        await Office.updateOne({ _id: req.params.id, mainLawyer: user.id }, { status: 'delete' })
        return res.send({
            message: 'you delete employee from office successfully ',
        })
    } catch (e) {
        return res.status(401).send({
            error: 'please try again to delete the employee from office !!'
        });
    }
}
officeController.outFromOffice = async (req, res, next) => {
    const { user } = req
    try {
        await Office.updateOne({ subLawyer: user._id, _id: req.params.id }, { status: 'out' })
        return res.send({
            message: 'you now is out from office',
        })
    } catch (e) {
        return res.status(401).send({
            error: 'please try again to Exist from office !!'
        });
    }
}

officeController.rejectOffice = async (req, res, next) => {
    const { user } = req
    try {
        await Office.updateOne({ subLawyer: user._id, _id: req.params.id }, { status: 'reject' })
        return res.send({
            message: 'you rejected the office successfully',
        })
    } catch (e) {
        return res.status(401).send({
            error: 'please try again to reject the office !!'
        });
    }
}
officeController.acceptOffice = async (req, res, next) => {
    const { user } = req
    try {
        await Office.updateOne({ subLawyer: user._id, _id: req.params.id }, { status: 'accept' })
        return res.send({
            message: 'you accpted the office successfully',
        })
    } catch (e) {
        return res.status(401).send({
            error: 'please try again to accept the office !!'
        });
    }
}
module.exports = officeController;