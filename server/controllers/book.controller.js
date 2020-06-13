const bookController = {};
const Time = require('../models/time.model.js');
const Book = require('../models/book.model.js');
const emailController = require('./email.controller')


bookController.book = async (req, res, next) => {
    const { user } = req;

    try {
        const Book_time = await Time.findOne({ _id: req.params._id })
        const queryCkeckExisting = {
            booker: user._id,
            timeId: req.params._id,
            lawyer: Book_time.owner
        }
        const existOrNot = await Book.find(queryCkeckExisting)
        if (existOrNot.length === 0) {
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
            emailController.sendNewMail(user.email, 'Confrim your book please  http://localhost:3000/my_books', 'Book Confirmation Email')
            return res.send({
                message: 'Booked successfully',
            })
        } else
            return res.status(401).send({
                error: 'Already Booked !!'
            });
    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to book !!'
        });
    }

}

bookController.fetchBooks = async (req, res, next) => {
    const { user } = req;
    const query = {
        booker: user._id,
        deleted: 0,
    }
    try {
        const books = await Book.find(query).populate('lawyer timeId')
        return res.send({
            books
        });
    } catch (e) {
        return res.status(401).send({
            error: 'fetching falied , try again !!'
        });
    }
}

bookController.fetchBookRequests = async (req, res, next) => {
    const { user } = req;
    try {
        const books = await Time.find({ owner: user._id, count: { $gt: 0 } });
        return res.send({
            books
        });
    } catch (e) {
        return res.status(401).send({
            error: 'fetching failed , try again !!'
        });

    }
}

bookController.deleteBook = async (req, res, next) => {
    try {
       
        const book = await Book.findOne({ _id: req.params._id })
        if(book.confirmed===1){
            const timeCount = await Time.findOne({ _id: book.timeId })
            await Time.updateOne({ _id: book.timeId }, { count: timeCount.count - 1 }) 
        }
        if (book.notify === 0) {
            await Book.deleteOne({ _id: req.params._id })
            return res.send({
                message: 'your book Deleted successfully'
            })
        }
        await Book.updateOne({ _id: req.params._id }, { deleted: 1 })
        return res.send({
            message: 'your book Deleted successfully'
        })
    } catch (e) {
        return res.status(401).send({
            error: 'please try again to cancel book !!'
        });
    }
}
bookController.confiremBook = async (req, res, next) => {
    try {
        const {user}=req
        await Book.updateOne({ _id: req.params._id }, { confirmed: 1 })
        const timeId = await (await Book.findOne({ _id: req.params._id }))
        const timeCount = await Time.findOne({ _id: timeId.timeId }).populate('owner')
        await Time.updateOne({ _id: timeId.timeId }, { count: timeCount.count + 1})
        emailController.sendNewMail(user.email, `book time is ${timeCount.time} and lawyer address is ${timeCount.owner.address},${timeCount.owner.state},${timeCount.owner.city}`, 'Book Confirmed successfull')
        return res.send({
            message: 'you confirmed your book successfull book',
        })
    } catch (e) {
        return res.status(401).send({
            error: 'please try again to confirm your book !!'
        });
    }
}

module.exports = bookController;