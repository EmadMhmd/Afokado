const internshipController ={};
const Internship = require('../models/internship.model.js');

internshipController.addInternship = async (req , res ,next)=>{
    const {count , description , created ,paid }=req.body;
    const newIntern = new Internship({
        count , description , created ,paid ,
        owner : req.user
    })
    try{
        await newIntern.save();
        return res.send({
            message:'the internship added successfully'
        })
    }catch(e){
        return res.status(401).send({
            error :'please try again to add new internship'
        });
    }
}
/*
internshipController.fetchInternships= async (req , res , next)=>{
    const {user} = req;
    const query ={
        owner : user._id,
    };
    try{
        const internalships = await Internship.find(query).sort({created : 'desc'});
        return res.send({
            internalships
        });
    }catch(e){
        return res.status(401).send({
            error :'fetching failed'
        });
    }
}
*/
internshipController.fetchInternships= async (req , res , next)=>{
    var query;
    if(req.params._id){
         query ={
            owner :req.params._id,
        };
    }else{ 
        query={} 
    }
    try{
        const internships = await Internship.find(query).sort({created : 'asc'});
        return res.send({
            internships 
        });
    }catch(e){
        return res.status(401).send({
            error :'fetching failed'
        });
    }
}
internshipController.deleteInternship= async (req , res , next)=>{   
    try{
        await Internship.deleteOne({ _id : req.params._id});
        return res.send({
            message:'the internship deleted successfully'
        });
    }catch(e){
        return res.status(401).send({
            error :'please try again to delete the internship'
        });
    }
    
}

internshipController.updateInternship= async (req , res , next)=>{
   const {count , description , created ,paid } = req.body;
    try{
       await Internship.updateOne(
            { _id : req.params._id} ,
            {count , description , created ,paid }
             );
        return res.send({
            message:'the internshi[p updated successfully'
        });
    }catch(e){
        return res.status(401).send({
            error :'please try again to update the internship'
        });
    }
}

module.exports = internshipController;