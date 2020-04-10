import React , {Component} from  'react';
import {connect} from 'react-redux';
import {fetchBooks ,deleteBook ,updateBook} from '../../../actions/book.action.js';
import { Button } from 'reactstrap';

class MyBook extends Component{
    componentDidMount(){
        const {fetchBooks } =this.props;
        fetchBooks()
    }
 
    render(){
        const {books}=this.props;
        return(
            <div>
                <h3>My Books</h3>
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