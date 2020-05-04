const taskController={};
const Task = require('../models/task.model');
const Moment = require('moment');

taskController.addTask= async (req ,res ,next)=>{
    const {user}=req;
    const {description , caseId , dateline ,notes ,subLawyer}=req.body;
    
    try{
        if(Moment() < Moment(dateline)){
            const newTask=new Task({
            description , caseId , dateline ,notes,subLawyer,
            owner:user._id
            })
            await newTask.save()
            return res.send({
                message:'the task added ssuccessfully'
            })
       }else{
        return res.status(401).send({
            error :'please Select time from new time'
        });
       }
    }catch(e){
        return res.status(401).send({
            error :'please try again to add your task'
        });
    }
}

taskController.deleteTask =async(req , res ,next)=>{
    const {_id}=req.params;
    try{
        await Task.deleteOne({_id});
        return res.send({
            message:'the task deleted successfully'
        })
    }catch(e){
        return res.status(401).send({
            error :'please try again to delete the task'
        });
    }
}

taskController.fetchTasks=async (req ,res,next)=>{
    let query
    const {user}=req;
    const {dateline , subLawyer}=req.params
    if(dateline && subLawyer){
        if(dateline !=='em' && subLawyer !== 'em'){
            query={
                owner:user._id,
                dateline,
                subLawyer
            }
        }else if(dateline !=='em' && subLawyer === 'em'){
                query={
                    owner:user._id,
                    dateline,
                }
        }else if(dateline ==='em' && subLawyer !== 'em'){
            query={
                owner:user._id,
                subLawyer,
            }
        }
    }else{
        const time =Moment(new Date())
        query={
            owner:user._id,
            //dateline:time
        }
    }
    try{
        const tasks = await Task.find(query);
        return res.send({
            tasks
        })
    }catch(e){
        return res.status(401).send({
            error :'fetching failed'
        });
    }
}

taskController.fetchTasksForCase=async (req ,res,next)=>{
    const {user}=req;
    const {_id}=req.params;
    try{
        const tasks = await Task.find({owner:user._id , caseId:_id });
        return res.send({
            tasks
        })
    }catch(e){
        return res.status(401).send({
            error :'fetching failed'
        });
    }
}

taskController.updateTask=async (req ,res , next)=>{
    const {decision}=req.body;
    const {_id}=req.params;
    try{
        await Task.updateOne(
            {_id},
            {decision }
        )
        return res.send({
            message:'the task updated successfully'
        })
    }catch(e){
        return res.status(401).send({
            error :'please try again to update the task'
        });
    }
}
module.exports=taskController