import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks, deleteBook, updateBook } from '../../../actions/book.action.js';
import { Button } from 'reactstrap';
import EmptyMessage from '../../general_components/empty.com.js';
import Spinner from '../../general_components/spinner_com/spinner.com.js';
import moment from 'moment';
import {Link} from 'react-router-dom';

class MyBook extends Component {
    state = {
        completeBookData: []
    }
    componentDidMount() {
        const { fetchBooks } = this.props;
        fetchBooks()
        document.title='AFokado | My Books'
    }
    emptyCase() {
        const { books } = this.props
        const message = `oops !! You still don't have any a book late !?`
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
                            <h3 className='header'>My Books</h3>
                            <Button className='add'><Link className='btnLink' to='/'>Book Now</Link></Button>
                        </div>
                        {books.map((item) => (
                            <div key={item._id} className='item'>
                                <div class='itemBodyNoHeader'>
                                    <pre className='bodyPara'>book Date          :{moment(item.timeId.time).format(' DD-MM-YYYY  dddd')}</pre>
                                    <pre className='bodyPara'>Book Times         : from {item.timeId.start} To {item.timeId.end}</pre>
                                    <pre className='bodyPara'>lawyer Name        : {item.lawyer.userName}</pre>
                                    <pre className='bodyPara'>lawyer Mobile      : 0{item.lawyer.mobile}</pre>
                                    <pre className='bodyPara'>address            :</pre>
                                    <p className='bodyPara txt'>{item.lawyer.address} , {item.lawyer.city} , {item.lawyer.state}</p>
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

