const lawyerController ={};
const User = require('../models/user.model.js');


lawyerController.fetchLawyers=async (req ,res,next)=>{
    const {spec , city ,userName}=req.params;
    var query;
    if(spec && city && userName){
        if(spec!='em' && city !='em' && userName !='em' ){
            query={
                type:2,spec ,city ,userName
            }
        }else  if(spec!='em' && city !='em' && userName ==='em' ){
            query={
                type:2,city  ,spec
            }
        }else  if(spec!='em' && city ==='em' && userName !='em' ){
            query={
                type:2,userName  ,spec
            }
        }else  if(spec==='em' && city !='em' && userName !='em' ){
            query={
                type:2,city  ,userName
            }
        }else  if(spec!='em' && city ==='em' && userName ==='em' ){
            query={
                type:2,spec
            }
        }else  if(spec==='em' && city !='em' && userName ==='em' ){
            query={
                type:2,city  
            }
        }else  if(spec==='em' && city ==='em' && userName !='em' ){
            query={
                type:2,userName
            }
        }
    }else{
        query={
            type:2
        }
    }
    try{
        const lawyers = await User.find(query);
        return res.send({
            lawyers 
        });
    }catch(e){
        return res.status(401).send({
            error :'now , try again to fetch lawyers'
        });
    }
}
lawyerController.getLawyer=async (req ,res,next)=>{ 
    const  query={
        type:2,
        _id:req.params._id
        }
    try{
        const lawyers = await User.findOne(query)
        return res.send({
            lawyers
        });
    }catch(e){
        return res.status(401).send({
            error :'now , try again to fetch lawyer info'
        });
    }
}
module.exports = lawyerController;