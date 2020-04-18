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
        const rates=await Rate.find({ratee:_id})
        return res.send({
            rates
        })
    }catch(e){
        return res.status(401).send({
            error :'fetching failed , try again'
        });
    }
}

module.exports =rateController;