const rateController={}
const Rate=require('../models/rate.model.js');

rateController.addRate= async(req ,res ,next)=>{
    const {comment , stars ,id}=req.body;
    const {user}=req
    const newRate = new Rate({
        comment , stars,
        rater :user._id,
        ratee:id
    })
    try{
        await newRate.save()
        return res.send({
            message:'the rate added successfully'
        })
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