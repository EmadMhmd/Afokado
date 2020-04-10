const taskController={};
const Task = require('../models/task.model');

taskController.addTask= async (req ,res ,next)=>{
    const {user}=req;
    const {description , caseId , dateline ,notes}=req.body;
    const newTask=new Task({
        description , caseId , dateline ,notes,
        owner:user._id
    })
    try{
        await newTask.save()
        return res.send({
            message:'the task added ssuccessfully'
        })
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
    const {user}=req;
    try{
        const tasks = await Task.find({owner:user._id});
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