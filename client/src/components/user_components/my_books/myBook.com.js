import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks, deleteBook, updateBook } from '../../../actions/book.action.js';
import { Button } from 'reactstrap';
import EmptyMessage from '../../general_components/empty.com.js';
import Spinner from '../../general_components/spinner_com/spinner.com.js';
import moment from 'moment';

class MyBook extends Component {
    state = {
        completeBookData: []
    }
    componentDidMount() {
        const { fetchBooks } = this.props;
        //bookData()
        fetchBooks()
        //  setTimeout(()=>{
        //      const {books}=this.props
        //      this.setState({completeBookData:books})
        //   },1500)  



    }
    /*setBooks(){
        const {books , bookData}=this.props
        let completeBookData=[]
        console.log('books before ' ,books)
        books.map(book=>{
            const {data : {lawyers}}= apiGetLawyer(book.owner)
            //const lawyers=returnedData.data.lawyers
            console.log('lawyers:' ,lawyers)
            const newBook={...book , lawyers}
            completeBookData.push(newBook)
            
        })
        books.forEach(book => {
            const {data : {lawyers}}= apiGetLawyer(book.lawyer)
            const newBook={...book , lawyers}
            completeBookData.push(newBook)
        });
     for(let i=0 ; i < books.length-1 ; i ++){
        const {data : {lawyers}}= apiGetLawyer(books[i].lawyer)
        console.log('book no ' , i , books[i])
        const newBook={...books[i] , lawyers}
        completeBookData.push(newBook)
        console.log('all:' , completeBookData)
     }
        this.setState({completeBookData})
        console.log('books after', completeBookData)
    }*/
    emptyCase() {
        const { books } = this.props
        const message = `oops! you still don't have any book !?`
        if (books.length === 0) {
            return (
                <EmptyMessage message={message} />
            )
        }
    }
    renderBtn = (book) => {
        if (book.confirmed === 1) {
            return <></>
        } else {
            return (
                <div>
                    <hr />
                    <Button className='mainBtn btnN' onClick={() => this.props.updateBook(book._id)}>Confirm</Button>
                </div>
            )
        }


    }
    render() {
        const { books, fetching } = this.props;
        if (fetching) {
            return <Spinner size={50} />
        }
        return (
            <div>
                <div className='bg items'>
                    <div className='listConatiner'>

                        <div cleasName='headBar'>
                            <h3 className='header'>My Book</h3>
                            <Button className='add'>Book Now</Button>
                        </div>

                        {books.map((item) => (

                            <div key={item._id} className='item'>

                                <div class='itemBodyNoHeader'>
                                    <pre>book Time          : {moment(item.timeId.time).format(' DD-MM-YYYY  dddd')}</pre>
                                    <pre>lawyer Name        : {item.lawyer.userName}</pre>
                                    <pre>lawyer Mobile      : 0{item.lawyer.mobile}</pre>
                                    <pre>address            : {item.lawyer.address}</pre>
                                    <pre>city               : {item.lawyer.city}</pre>
                                    <pre>state              :{item.lawyer.state}</pre>
                                    <abbr title='Delete the Book'><Button className='del' onClick={() => this.props.deleteBook(item._id)}><i className='fa fa-trash fas' /></Button></abbr>
                                </div>
                                {this.renderBtn(item)}
                            </div>
                        ))}

                    </div>
                </div>
                {this.emptyCase()}
            </div>


        )
    }
}
const mapStateToProps = ({ book, fetch }) => {
    return {
        books: book.books,
        fetching: fetch.fetching
    }
}

export default connect(mapStateToProps, { fetchBooks, deleteBook, updateBook })(MyBook);

