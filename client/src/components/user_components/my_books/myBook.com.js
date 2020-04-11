import React , {Component} from  'react';
import {connect} from 'react-redux';
import {fetchBooks ,deleteBook ,updateBook} from '../../../actions/book.action.js';
import { Button } from 'reactstrap';
import EmptyMessage from '../../general_components/empty.com.js';

class MyBook extends Component{
    componentDidMount(){
        const {fetchBooks } =this.props;
        fetchBooks()
    }
    emptyCase(){
        const { books } = this.props
        const data='book'
        if(books.length===0){
            return (
                <EmptyMessage data={data} />
            )
        }
    } 
    render(){
        const {books}=this.props;
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