const caseController = {};
const Case = require('../models/Case.model.js');

caseController.addCase = async (req, res, next) => {
    const { number, description, created, type, court, claimant, defendant, title } = req.body;
    const newcase = new Case({
        number, description, created, type, court, claimant, defendant, title,
        owner: req.user
    })
    try {
        await newcase.save();
        return res.send({
            message: 'the case added successfully'
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
        }else {
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
        const cases = await Case.find(query).sort({ created: 'desc', archive: 0 });
        return res.send({
            cases: cases
        });
    } catch (e) {
        return res.status(401).send({
            error: 'fetching failed , try again !!'
        });
    }
}

caseController.getCase = async (req, res, next) => {
    const { user } = req;
    const { id } = req.params
    const query = {
        owner: user._id,
        _id: id
    };
    try {
        const cases = await Case.findOne(query)
        return res.send({
            cases: cases
        });
    } catch (e) {
        return res.status(401).send({
            error: 'fetching failed , try again !!'
        });
    }
}

caseController.deleteCase = async (req, res, next) => {
    try {
        await Case.deleteOne({ _id: req.params._id });
        return res.send({
            message: 'the case deleted successfully'
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
            message: 'the case updated successfully'
        });
    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to update the case !!'
        });
    }
}

caseController.archiveCase = async (req, res, next) => {
    const { finalDecision  , _id , notes} = req.body
    console.log('case' ,finalDecision  , _id , notes)
    try {
        await Case.updateOne(
            { _id: _id },
            { archive: 1, finalDecision, notes },
        );
        return res.send({
            message: 'the case archived successfully'
        });
    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to archive the case !!'
        });
    }
}

module.exports = caseController;