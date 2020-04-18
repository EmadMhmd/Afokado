const notifyController={};
const Book =require('../models/book.model');
const Apply =require('../models/apply.model');

notifyController.lawyerNotificationsCount= async (req ,res ,next)=>{
    const {user} =req;
    try{
        const books=await Book.find({notify:0 ,  confirmed :1, lawyer:user._id , deleted:0})
        const bookDeletes= await Book.find({notify:1 , confirmed :1,lawyer:user._id , deleted:1})
        const appDeletes= await Apply.find({notify:1 , confirmed :1,lawyer:user._id , deleted:1})
        const applications=  await Apply.find({notify:0 ,  confirmed :1, lawyer:user._id , deleted:0})
        const booksCount=books.length
        const BookDeletesCount=bookDeletes.length
        const AppDeletesCount=appDeletes.length
        const applicationsCount=applications.length
        return res.send({
            booksCount,
            BookDeletesCount,
            applicationsCount,
            AppDeletesCount
        })
    }catch(e){
        return res.status(401).send({
            error :'fetching problem'
        });
    }
}
notifyController.openLawyerNotifications=async(req ,res ,next)=>{
    const {user} =req
    const {type}=req.params
    try{
        if(type==="app"){
            await Apply.deleteMany({lawyer:user._id ,deleted:1})
            await Apply.updateMany({lawyer:user._id , deleted:0 , confirmed:1} , {notify:1})
        }
        if(type==="book"){
            await Book.updateMany({lawyer:user._id , deleted:0, confirmed:1} , {notify:1})
            await Book.deleteMany({lawyer:user._id ,deleted:1})
        }
        return res.send({
           message:'Opened successfully'
            
        })
    }catch(e){
        return res.status(401).send({
            error :'open notification failed'
        });
    }
}


notifyController.studentNotificationsCount= async (req ,res ,next)=>{
    const {user} =req;
    try{
        const rejects= await Apply.find({status:'reject' ,stuNotify:0 , trainee:user._id})
        const accepts=  await Apply.find({status:'accept',stuNotify:0 , trainee:user._id })
        const rejectsCount=rejects.length
        const acceptsCount=accepts.length
        return res.send({
            rejectsCount ,
            acceptsCount
        })
    }catch(e){
        return res.status(401).send({
            error :'fetching problem'
        });
    }
}
notifyController.openStudentNotifications=async(req ,res ,next)=>{
    const {user} =req
    try{
        
        //await Apply.deleteMany({trainee:user._id ,deleted:1 })
        await Apply.updateMany({trainee:user._id , stuNotify:0 ,status:'accept'} , {stuNotify:1})
        await Apply.updateMany({trainee:user._id , stuNotify:0 ,status:'reject'} , {stuNotify:1})
        return res.send({
           message:'Opened successfully'
            
        })
    }catch(e){
        return res.status(401).send({
            error :'open notification failed'
        });
    }
}


module.exports=notifyController;