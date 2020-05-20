const lawyerController = {};
const User = require('../models/user.model.js');
const Rate=require('../models/rate.model.js');


lawyerController.fetchLawyers = async (req, res, next) => {
    const { spec, city, userName } = req.params;
    var query;
    if (spec && city && userName) {
        if (spec != 'em' && city != 'em' && userName != 'em') {
            query = {
                type: 2, spec, city, userName
            }
        } else if (spec != 'em' && city != 'em' && userName === 'em') {
            query = {
                type: 2, city, spec
            }
        } else if (spec != 'em' && city === 'em' && userName != 'em') {
            query = {
                type: 2, userName, spec
            }
        } else if (spec === 'em' && city != 'em' && userName != 'em') {
            query = {
                type: 2, city, userName
            }
        } else if (spec != 'em' && city === 'em' && userName === 'em') {
            query = {
                type: 2, spec
            }
        } else if (spec === 'em' && city != 'em' && userName === 'em') {
            query = {
                type: 2, city
            }
        } else if (spec === 'em' && city === 'em' && userName != 'em') {
            query = {
                type: 2, userName
            }
        }
    } else {
        query = {
            type: 2
        }
    }
    try {
        const lawyers = await User.find(query);
        return res.send({
            lawyers
        });
    } catch (e) {
        return res.status(401).send({
            error: 'now , try again to fetch lawyers'
        });
    }
}

lawyerController.getLawyer = async (req, res, next) => {
    const query = {
        type: 2,
        _id: req.params._id
    }
    try {
        const lawyer = await User.findOne(query)
        /*const rates=await Rate.find({ratee : req.params._id})
        var rateing=await rateingCal(rates)
        const lawyers =await {lawyer , ...rateing}*/
        return res.send({
            lawyers :lawyer
        });
    } catch (e) {
        return res.status(401).send({
            error: 'now , try again to fetch lawyer info'
        });
    }
}

const rateingCal = async (rates) => {
    //const {rates} =this.props
    var one, two, three, four, five, overall = 0 ,ratters =0
    five = await rates.reduce((total, rate, i, a) => {
        if (rate.stars === 5) {
            total += 1
        }

        return total

    }, 0);
    four = await rates.reduce((total, rate, i, a) => {
        if (rate.stars === 4) {
            total += 1
        }

        return total

    }, 0);
    three = await rates.reduce((total, rate, i, a) => {
        if (rate.stars === 3) {
            total += 1
        }

        return total

    }, 0);
    two = await rates.reduce((total, rate, i, a) => {
        if (rate.stars === 2) {
            total += 1
        }

        return total

    }, 0)
    one = await rates.reduce((total, rate, i, a) => {
        if (rate.stars === 1) {
            total += 1
        }

        return total

    }, 0);

    overall = await (one + 2 * two + 3 * three + 4 * four + 5 * five) / (one + two + three + four + five)

    return {one , two , three , four , five , overall}
}
module.exports = lawyerController;