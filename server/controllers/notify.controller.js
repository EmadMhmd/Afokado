const notifyController={};
const Book =require('../models/book.model');
const Internship =require('../models/internship.model');

notifyController.NotificationsCount= async (req ,res ,next)=>{
    const {user} =req;
    try{
        const books=await Book.find({notify:0 ,  confirmed :1, lawyer:user._id , deleted:0})
        const deletes= await Book.find({notify:0 , confirmed :1,lawyer:user._id , deleted:1})
        //const internships=  await Internship.find()
        const booksCount=books.length
        const deletesCount=deletes.length
        //const internshipsCount=internships.length
        return res.send({
            booksCount,
            deletesCount,
        })
    }catch(e){
        return res.status(401).send({
            error :'fetching problem'
        });
    }
}
notifyController.openNotifications=async(req ,res ,next)=>{
    const {user} =req;
    try{
        await Book.updateMany({lawyer:user._id } , {notify:1})
        await Book.deleteMany({lawyer:user._id ,deleted:1})
        await Internship.updateMany({owner:user._id} , {notify:1})
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