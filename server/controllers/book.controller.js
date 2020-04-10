const bookController = {};
const Time = require('../models/time.model.js');
const Book = require('../models/book.model.js');

bookController.book = async (req, res, next) => {

    const { user } = req;
    /*const check = await Book.find({booker: user._id ,timeId:req.params.id})
    console.log('check' , check);*/
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

bookController.fetchBooks = async (req, res, next) => {
    const { user } = req;
    const query={
        booker: user._id ,
        deleted:0,
        }
    try {
        const books = await Book.find(query);
        return res.send({
            books
        });
    } catch (e) {
        return res.status(401).send({
            error :'fetching falied , try again !!'
        });

    }
}

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

bookController.deleteBook = async (req, res, next) => {
    try {
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