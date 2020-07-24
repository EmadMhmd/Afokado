const caseController = {};
const Case = require('../models/Case.model.js');
const User = require('../models/user.model.js');

caseController.addCase = async (req, res, next) => {
    const { number, description, created, type, court, claimant, defendant, title } = req.body;
    const newcase = new Case({
        number, description, created, type, court, claimant, defendant, title,
        owner: req.user
    })
    try {
        await newcase.save();
        return res.send({
            message: 'The case added successfully'
        })
    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to add case !!'
        });
    }
}

caseController.fetchCases = async (req, res, next) => {
    const { user } = req;
    const { archive, type } = req.params
    let query;
    if (archive || type) {
        if (archive !== 'em' && type !== 'em') {
            const archiveToBool = (archive === 'archive' ? 1 : 0)
            query = {
                owner: user._id,
                archive: archiveToBool,
                type
            };
        } else if (archive === 'em' && type !== 'em') {
            query = {
                owner: user._id,
                type
            };
        } else if (archive !== 'em' && type === 'em') {
            const archiveToBool = (archive === 'archive' ? 1 : 0)
            query = {
                owner: user._id,
                archive: archiveToBool
            };
        } else {
            query = {
                owner: user._id
            };
        }
    } else {
        query = {
            owner: user._id
        };
    }
    try {
        const cases = await Case.find(query).populate('caseOwner');
        return res.send({
            cases: cases
        });
    } catch (e) {
        return res.status(401).send({
            error: 'Fetching failed ,Please try again !!'
        });
    }
}
caseController.fetchUserCases = async (req, res, next) => {
    const { user } = req;
    try {
        const cases = await Case.find({caseOwner:user._id}).populate('owner');
        return res.send({
            cases
        });
    } catch (e) {
        return res.status(401).send({
            error: 'Fetching failed ,please try again !!'
        });
    }
}
caseController.getCase = async (req, res, next) => {
    const { user } = req;
    const { id } = req.params
    const query = {
        _id: id
    };
    try {
        const cases = await (await Case.findOne(query).populate('caseOwner'))
        return res.send({
            cases: cases
        });
    } catch (e) {
        return res.status(401).send({
            error: 'Ftching failed ,Please try again !!'
        });
    }
}

caseController.deleteCase = async (req, res, next) => {
    try {
        await Case.deleteOne({ _id: req.params._id });
        return res.send({
            message: 'Tee case deleted successfully'
        });
    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to delete the case !!'
        });
    }
}

caseController.updateCase = async (req, res, next) => {
    const { claimant, defendant, court, type, number, title } = req.body;
    try {
        await Case.updateOne(
            { _id: req.params._id },
            { claimant, defendant, court, type, number, title },
        );
        return res.send({
            message: 'The case updated successfully'
        });
    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to update the case !!'
        });
    }
}

caseController.archiveCase = async (req, res, next) => {
    const { finalDecision, _id, notes } = req.body
    console.log('case', finalDecision, _id, notes)
    try {
        await Case.updateOne(
            { _id: _id },
            { archive: 1, finalDecision, notes },
        );
        return res.send({
            message: 'The case archived successfully'
        });
    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to archive the case !!'
        });
    }
}


caseController.getNewOwner = async (req, res, next) => {
    const { email, mobile } = req.params
    var query
    if (email !== 'em' && mobile === 'em') {
        query = { email, type: 1 }
    } else if (email === 'em' && mobile !== 'em') {
        query = { mobile, type: 1 }
    } else {
        query = { email, mobile, type: 1 }
    }
    try {
        const owners = await User.find(query)
        return res.send({
            owners
        });
    } catch (e) {
        return res.status(401).send({
            error: 'Fetching failed ,Please try again !!'
        });

    }
}
caseController.updateCaseOwner = async (req, res, next) => {
    const { _id, caseOwner } = req.params
    console.log('caseOwner case' , caseOwner ,_id)
    try {
        await Case.updateOne(
            {_id},
            {caseOwner}
        );
        return res.send({
            message: 'The Ownner Added successfully'
        });
    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to add The Owner to the case !!'
        });
    }
}
module.exports = caseController;