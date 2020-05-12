const bookController = {};
const Time = require('../models/time.model.js');
const Book = require('../models/book.model.js');
const User = require('../models/user.model.js');
const nodemailer = require('nodemailer');

bookController.book = async (req, res, next) => {
    const { user } = req;
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "afokadolawyer@gmail.com",
            pass: "emad1998"
        },
        tls:{
            rejectUnauthorized : false
        }
    });
    var mailOption = {
        from:'afokadolawyer@gmail.com',
        to : user.email,
        subject :'Book  Confirmation Email',
        text : `Confrim your book please  http://localhost:3000/my_books `   
    }
    try {
        const Book_time = await Time.findOne({ _id: req.params._id })
        const queryCkeckExisting ={
            booker: user._id,
            timeId: req.params._id,
            lawyer: Book_time.owner
        }
        const existOrNot = await Book.find(queryCkeckExisting)
        if (existOrNot.length===0) {
            const Books = await Book.find()
            const newBook = new Book({
                booker: user._id,
                no: Books.length + 1,
                timeId: req.params._id,
                time: Book_time.time,
                lawyer: Book_time.owner
            }
            )
            await newBook.save();
            transporter.sendMail(mailOption , (err , info )=>{
                if(err){
                    return res.status(401).send({
                        error :'email sended failed !!'
                    });
                }
                else{
                    return res.send({
                        message: 'Booked successfully , please check ypur email to confirm your book',
                        
                    })
                }
            })
        }else
            return res.status(401).send({
                error :'Already Booked !!'
            });
    } catch (e) {
        return res.status(401).send({
            error :'Please try again to book !!'
        });
    }

}
/*
bookController.book = async (req, res, next) => {

    const { user } = req;

    try {
        if (1) {
            const Book_time = await Time.findOne({ _id: req.params._id })
            const Books = await Book.find()
            const newBook = new Book({
                booker: user._id,
                no: Books.length + 1,
                timeId: req.params._id,
                time: Book_time.time,
                lawyer: Book_time.owner
            })
            await newBook.save();
            return res.send({
                message: 'Booked successfully , please confirm your book Now to alert the lawyer',
            })
        }else
            return res.status(401).send({
                error :'Already Booked !!'
            });
    } catch (e) {
        return res.status(401).send({
            error :'Please try again to book !!'
        });
    }

}
*/
bookController.fetchBooks = async (req, res, next) => {
    const { user } = req;
    const query={
        booker: user._id ,
        deleted:0,
        }
    try {
        
        const books =await Book.find(query).populate('lawyer timeId')
        return res.send({
            books
        });
    } catch (e) {
        return res.status(401).send({
            error :'fetching falied , try again !!'
        });

    }
}
/*
bookController.booksyarab = async (req, res, next) => {
    const { user } = req;
    const query={
        booker: user._id ,
        deleted:0,
        }
    try {

        var completeBookData = await Book.find(query);
        console.log('books befor' , completeBookData)
        var cbooks=[...completeBookData]
        console.log('books mid' , cbooks)
        var books=[]
        books = [...cbooks.map(async book => {
                var lawyer=await User.find(book.lawyer)
                //console.log('lawyer ' , lawyer)
                //var newBook={}
                //newBook.book=book
                //newBook.lawyer=lawyer
                //console.log('new book' , newBook)
               
                //books[books.length]=newBook
                //books.push({...book, ...lawyer})
                //(books = books || []).push({});
                //books = (books || []).push(newBook);
                //books.push(newBook)
                var lawyerInfo={...lawyer}
                book["lawyerInfo"]=lawyerInfo
            })]
        
        var books =[]
        //const books =await Book.find(query).populate('lawyer') // multiple path names in one requires mongoose >= 3.6
        //const books =await Book.find(query)
        .exec(function(err, usersDocuments) {
            if(err){
                return res.status(401).send({
                    error :'fetching falied , try again !!'
                });
            }else{
               console.log('usersDocuments' ,usersDocuments)
               books=[...usersDocuments]
               console.log('books in' , books)
            }
            // console.log('usersDocuments' ,booksDocuments)
            // books=[...booksDocuments]
            
        });
      const books =Book.aggregate(
          {$match : {booker:user._id ,deleted:0}},
          {$group :{_id:"$_id" , lawyers : {$push : User.find(book.lawyer)}}}
        )
     console.log('books ' , books)
     return res.send({
         books
      });
       
    } catch (e) {
        return res.status(401).send({
            error :'fetching falied , try again !!'
        });

    
    }
}*/

/*
bookController.fetchBookRequests = async (req, res, next) => {
    const { user } = req;
    try {
        const books = await Book.find({ lawyer: user._id ,deleted:0 , confirmed :1});
        return res.send({
            books
        });
    } catch (e) {
        return res.status(401).send({
            error :'fetching failed , try again !!'
        });

    }
}
*/
bookController.fetchBookRequests = async (req, res, next) => {
    const { user } = req;
    try {
        const books = await Time.find({ owner: user._id , count:{$gt:0}});
        return res.send({
            books
        });
    } catch (e) {
        return res.status(401).send({
            error :'fetching failed , try again !!'
        });

    }
}

bookController.deleteBook = async (req, res, next) => {
    try {
        const book=await Book.findOne({ _id: req.params._id })
        const timeCount=await Time.findOne({ _id: book.timeId })
        const newCount=timeCount.count - 1
        await Time.updateOne({ _id: book.timeId } ,{count:newCount})
        
        if(book.notify === 0){
            await Book.deleteOne({ _id: req.params._id })
            return res.send({
                message: 'your book Deleted successfully'
            })
        }
        await Book.updateOne({ _id: req.params._id } ,{deleted:1})

       
       

        return res.send({
            message: 'your book Deleted successfully'
        })
    } catch (e) {
        return res.status(401).send({
            error :'please try again to cancel book !!'
        });
    }
}
bookController.confiremBook = async (req, res, next) => {
    try {
        await Book.updateOne({ _id: req.params._id } ,{confirmed:1})
        const timeId =await Book.findOne({ _id: req.params._id })
        const timeCount=await Time.findOne({ _id: timeId.timeId })
        const newCount=timeCount.count + 1
        await Time.updateOne({ _id: timeId.timeId } ,{count:newCount})
        return res.send({
            message: 'you confirmed your book successfull book',
        })
    } catch (e) {
        return res.status(401).send({
            error :'please try again to confirm your book !!'
        });
    }
}

module.exports = bookController;