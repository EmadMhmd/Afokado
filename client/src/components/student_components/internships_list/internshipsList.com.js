import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchInternships } from '../../../actions/internalship.action';
import Spinner from '../../general_components/spinner_com/spinner.com.js';
//import HeaderSearch from '../book_search_header/bookHeader.com.js';
import { Link } from 'react-router-dom';
import './lawyerList.style.css';
//import lm from './lawm.png';

class Internships extends Component {
    componentDidMount(){
        const {fetchInternships} =this.props;
        fetchInternships()
    }
    render() {
        const { fetching, internships } = this.props
        if (fetching) {
            return <Spinner size={50} />
        }
        return (
            <div className="list">
                
                <div className='conatiner'>
                <div className='sort'>
                        <p className='count'>
                            <span className='spec'> Matching </span>
                            <span> {internships.length} </span>
                            Internships
                        </p>
                        <div className='btn'>
                            <label>Sorting :</label>
                            <select name='sort'>
                                <option selected>Best Match</option>
                                <option>Top Rate</option>
                                <option>Price (Low to High)</option>
                                <option>Price (High To Low)</option>
                            </select>
                        </div>
                 </div>
       
                <div className='lawyers'>
                    {internships.map((item) => (
                        <div className='lawyer' key={item._id}>
                            <div style={{ overflow: 'hidden' }}>
                                <div className='mainInfo' >
                                    <Link className='degName' to={'/lawyerpage/' + item._id}>{item.description}</Link>
                                    <p>{item.count}</p>
                                    <p>{item.paid}</p>
                                    <p><Link to={'/applypage/' + item._id}>Details</Link></p>
                                    <p><Link to={'/applypage/' + item._id}>Apply Now</Link></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
               
            </div>
        )
    }
}

const mapStateToProps = ({ internship ,fetch}) => {
    return {
        internships: internship.internships,
        fetching: fetch.fetching
    }
}
export default connect(mapStateToProps, { fetchInternships })(Internships);