const timeController ={};
const Time = require('../models/time.model.js');
const Book = require('../models/book.model.js');


timeController.addTime = async (req , res ,next)=>{

    const {time}=req.body;

    const existOrNot=await Time.find({time , owner: req.user })
    
        try{
            if(existOrNot.length === 0){
            const newTime = new Time({
                time,
                owner : req.user,
            })
            await newTime.save();
            return res.send({
                message:`the time ${time} added successfully`
            })
        }else{
            return res.status(401).send({
                error :'The Time Already Exist !!'
            });
        }
        }catch(e){
            return res.status(401).send({
                error :'please try again to add new time'
            });
        }
    
    
    /*else{
        return res.status(401).send({
            error :'The Time Already Exist !!'
        });
    }*/
   
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
        const existOrNot=await Book.find({timeId:req.params._id})
        if(existOrNot.length===0){
        await Time.deleteOne({ _id : req.params._id});
        return res.send({
            message:'the time deleted successfully'
        });
        }else{
            return res.status(401).send({
                error :'you can not to delete this time , there books in this time'
            });
        }
    }catch(e){
        return res.status(401).send({
            error :'please try again to delete the time'
        });
    }
}

module.exports = timeController;