import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBookRequests } from '../../../actions/book.action.js';
import { Badge } from 'reactstrap';
import EmptyMessage from '../../general_components/empty.com.js';
import Spinner from '../../general_components/spinner_com/spinner.com.js';
import moment from 'moment'

class BookRequests extends Component {
    componentDidMount() {
        const { fetchBookRequests } = this.props;
        fetchBookRequests()

    }
    emptyCase() {
        const { books } = this.props
        const message = `great! you haven't any notification !?`
        if (books.length === 0) {
            return (
                <EmptyMessage message={message} />
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





                        <div cleas='headBar'>
                            <h3 className='header'>Book Requests</h3>
                        </div>

                        {books.map(book => (
                            <div key={book._id} className='item'>
                                <div className='itemBody'>
                                    <pre className='bodyPara'>Time        : {moment(book.time).format('DD-MM-YY dddd ')}</pre>
                                    {/* <pre className='bodyPara'>Books Count : {book.count}</pre>
                                  
                                    <abbr title='Books Count'><Button className='del'>{book.count}</Button></abbr> */}
                                    <p className="delN bodyPara" style={{borderRadius:'0' , border:'none'}} to='/book_requests'>
                                        Count <Badge color="secondary"> {book.count} </Badge>
                                    </p>
                                </div>

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
export default connect(mapStateToProps, { fetchBookRequests })(BookRequests);