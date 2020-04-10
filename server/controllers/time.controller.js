const timeController ={};
const Time = require('../models/time.model.js');

timeController.addTime = async (req , res ,next)=>{
    const {time ,created}=req.body;
    const times=await Time.find()
    const newTime = new Time({
        created ,time,
        owner : req.user,
    })
    try{
        await newTime.save();
        return res.send({
            message:`the time ${time} added successfully`
        })
    }catch(e){
        return res.status(401).send({
            error :'please try again to add new time'
        });
    }
}

timeController.fetchTimes= async (req , res , next)=>{
    var query;
    if(req.params._id){
         query ={
            owner :req.params._id,
        };
    }else{ 
        const {user} = req;
        query={owner:user._id} 
    }
    try{
        const times = await Time.find(query).sort({created : 'desc'});
        return res.send({
            times 
        });
    }catch(e){
        return res.status(401).send({
            error :'fetching failed'
        });
    }
}


timeController.deleteTime= async (req , res , next)=>{
    try{
        await Time.deleteOne({ _id : req.params._id});
        return res.send({
            message:'the time deleted successfully'
        });
    }catch(e){
        return res.status(401).send({
            error :'please try again to delete the time'
        });
    }
}

module.exports = timeController;