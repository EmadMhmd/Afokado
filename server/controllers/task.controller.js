const taskController={};
const Task = require('../models/task.model');
const Moment = require('moment');
const emailController = require('./email.controller')
const User=require('../models/user.model');

taskController.addTask= async (req ,res ,next)=>{
    const {user}=req;
    const {description , caseId , dateline ,notes ,subLawyer , title , session}=req.body;
    try{
        if(Moment() < Moment(dateline)){
            const newTask=new Task({
            description , caseId , dateline ,notes,subLawyer,title,session,
            owner:user._id
            })
            await newTask.save()
            const sub=await User.findOne({_id:subLawyer})
            emailController.sendNewMail(sub.email, 'Follow The Link To Task Details  http://localhost:3000/my_tasks', 'New Task Request')
            return res.send({
                message:'The task added ssuccessfully'
            })
       }else{
        return res.status(401).send({
            error :'Please Select time from new time'
        });
       }
    }catch(e){
        return res.status(401).send({
            error :'Please try again to add your task'
        });
    }
}

taskController.deleteTask =async(req , res ,next)=>{
    const {_id}=req.params;
    try{
        await Task.deleteOne({_id});
        return res.send({
            message:'The task deleted successfully'
        })
    }catch(e){
        return res.status(401).send({
            error :'Please try again to delete the task'
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
        }else{
            const time =Moment(new Date())
            query={
                owner:user._id
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
        const tasks = await Task.find(query).populate("subLawyer caseId");
        return res.send({
            tasks
        })
    }catch(e){
        return res.status(401).send({
            error :'Fetching failed'
        });
    }
}

taskController.fetchTasksForCase=async (req ,res,next)=>{
    const {user}=req;
    const {_id}=req.params;
    try{
        const tasks = await Task.find({caseId:_id }).populate('subLawyer');
        return res.send({
            tasks
        })
    }catch(e){
        return res.status(401).send({
            error :'Fetching failed'
        });
    }
}
taskController.fetchTaskRequests=async (req ,res,next)=>{
    const {user}=req;
    try{
        const tasks = await Task.find({subLawyer:user._id , dateline:{"$gte": new Date()}  }).populate('caseId');
        return res.send({
            tasks
        })
    }catch(e){
        return res.status(401).send({
            error :'Fetching failed'
        });
    }
}

taskController.updateTask=async (req ,res , next)=>{
    const {decision , notes}=req.body;
    const {_id}=req.params;
    try{
        await Task.updateOne(
            {_id},
            {decision,notes}
        )
        return res.send({
            message:'The task updated successfully'
        })
    }catch(e){
        return res.status(401).send({
            error :'Please try again to update the task'
        });
    }
}
module.exports=taskController