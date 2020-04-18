import React , {Component} from  'react';
import {connect} from 'react-redux';
import {fetchBooks ,deleteBook ,updateBook} from '../../../actions/book.action.js';
import { Button } from 'reactstrap';
import EmptyMessage from '../../general_components/empty.com.js';
import Spinner from '../../general_components/spinner_com/spinner.com.js';

class MyBook extends Component{
    componentDidMount(){
        const {fetchBooks } =this.props;
        fetchBooks()
    }
    emptyCase(){
        const { books } = this.props
        const message=`oops! you still don't have any book !?`
        if(books.length===0){
            return (
                <EmptyMessage message={message} />
            )
        }
    } 
    render(){
        const {books ,fetching}=this.props;
        if (fetching) {
            return <Spinner size={50} />
        }
        return(
            <div>
                <h3>My Books</h3>
                {this.emptyCase()}
                {books.map(book=>(
                    <div key={book._id}>
                        <p>{book.no}</p>
                        <Button onClick={()=>this.props.deleteBook(book._id)}>Cancel</Button>
                        <Button onClick={()=>this.props.updateBook(book._id)}>Confirm</Button>
                    </div>
                ))}
            </div>
        )
    }
}
const mapStateToProps=({book ,fetch})=>{
    return{
        books:book.books,
        fetching:fetch.fetching
    }
}

export default connect(mapStateToProps,{fetchBooks,deleteBook,updateBook})(MyBook);