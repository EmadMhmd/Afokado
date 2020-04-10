const caseController ={};
const Case = require('../models/Case.model.js');

caseController.addCase = async (req , res ,next)=>{
    const {number , description , created ,type , court , claimant ,defendant ,title}=req.body;
    const newcase = new Case({
        number , description , created ,type , court , claimant ,defendant ,title,
        owner : req.user
    })
    try{
        await newcase.save();
        return res.send({
            message : 'the case added successfully' 
        })
    }catch(e){
        return res.status(401).send({
            error :'Please try again to add case !!'
        });
    }
}

caseController.fetchCases= async (req , res , next)=>{
    const {user} = req;
    const {archive}=req.params
    const query ={
        owner : user._id,
        archive
    };
    try{
        const cases = await Case.find(query).sort({created : 'desc'});
        return res.send({
            cases : cases
        });
    }catch(e){
        return res.status(401).send({
            error :'fetching failed , try again !!'
        });
    }
}

caseController.deleteCase= async (req , res , next)=>{
    try{
        await Case.deleteOne({ _id : req.params._id});
        return res.send({
            message : 'the case deleted successfully'
        });
    }catch(e){
        return res.status(401).send({
            error :'Please try again to delete the case !!'
        });
    }
}

caseController.updateCase= async (req , res , next)=>{
   const {claimant, defendant, court,type, number ,title} = req.body;
    try{
        await Case.updateOne(
        { _id : req.params._id} ,
        {claimant, defendant, court,type, number ,title},
            );
        return res.send({
            message:'the case updated successfully'
        });
    }catch(e){
        return res.status(401).send({
            error :'Please try again to update the case !!'
        });
    }
}

caseController.archiveCase= async (req , res , next)=>{
     try{
         await Case.updateOne(
             { _id : req.params._id} ,
             {archive : 1 },
              );
         return res.send({
             message:'the case archived successfully'
         });
     }catch(e){
        return res.status(401).send({
            error :'Please try again to archive the case !!'
        });
     }
 }

module.exports = caseController;