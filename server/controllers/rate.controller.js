const rateController={}
const Rate=require('../models/rate.model.js');
const Book = require('../models/book.model.js');


rateController.addRate= async(req ,res ,next)=>{
    const {comment , stars ,id}=req.body;
    const {user}=req
    const queryForCheckExisting={
        lawyer:id,
        booker:user._id
    }
    const existOrNot=await Book.find(queryForCheckExisting)
    try{
        if(existOrNot.length > 0){
            const newRate = new Rate({
                comment , stars,
                rater :user._id,
                ratee:id
            })
            await newRate.save()
            return res.send({
                message:'the rate added successfully'
            })
        }else{
            return res.status(401).send({
                error :'you can not rate this lawyer , you did not book time with you'
            });
        }
        
    }catch(e){
        return res.status(401).send({
            error :'please try again to rate the lawyer'
        });
    }
}

rateController.fetchRates= async(req ,res ,next)=>{
    const {_id}=req.params;
    try{
        const rates=await Rate.find({ratee:_id}).populate("rater")
        return res.send({
            rates
        })
    }catch(e){
        return res.status(401).send({
            error :'fetching failed , try again'
        });
    }
}
rateController.getRate = async (req ,res ,next) => {
    const {_id}=req.params
    const rates=await Rate.find({ratee : _id})
    var one, two, three, four, five, overall = 0
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
    const stars={one , two , three , four , five , overall}
    return overall
}
module.exports =rateController;