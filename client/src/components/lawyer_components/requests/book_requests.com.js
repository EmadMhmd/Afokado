import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchBookRequests} from '../../../actions/book.action.js';

class BookRequests extends Component{
    componentDidMount(){
        const {fetchBookRequests}=this.props;
        fetchBookRequests()

    }
    render(){
        const {books}=this.props;
        return(
            <div>
                <h2>Book Requests</h2>
                { books.map(book=>(
                    <div key={book._id}>
                        <p>{book.no}</p>
                    </div>
                ) )}
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
export default connect(mapStateToProps,{fetchBookRequests})(BookRequests);