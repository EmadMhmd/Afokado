import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLawyers } from '../../../actions/lawyer.action';
import Spinner from '../spinner_com/spinner.com.js';
import HeaderSearch from '../book_search_header/bookHeader.com.js';
import { Link } from 'react-router-dom';
import './lawyerList.style.css';
import lm from './lawm.png';
import EmptyMessage from '../../general_components/empty.com.js';

class LawyerList extends Component {
    emptyCase(){
        const { lawyers } = this.props
        const data='lawyers'
        if(lawyers.length===0){
            return (
                <EmptyMessage data={data} />
            )
        }
    }
    render() {
        const { fetching, lawyers } = this.props
        if (fetching) {
            return <Spinner size={50} />
        }
        return (
            <div className="list">
                <HeaderSearch />
                <div className='conatiner'>
                <div className='sort'>
                        <p className='count'>
                            <span className='spec'> Matching </span>
                            <span> {lawyers.length} </span>
                            Lawyers
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
                 {this.emptyCase()}
                <div className='lawyers'>
                    {lawyers.map((item) => (
                        <div className='lawyer' key={item._id}>
                            <div style={{ overflow: 'hidden' }}>

                                <div className='img'>
                                    <img src={lm} alt='lawyer-img'/>
                                </div>

                                <div className='mainInfo' >
                                    <Link className='degName' to={'/lawyerpage/' + item._id}>{item.gender} <span className='name'>{item.userName}</span></Link>
                                    <p>{item.address} , {item.city} ,{item.state}</p>
                                     <p>Speciality in:{item.spec}</p>
                                    <p><Link to={'/lawyerpage/' + item._id}>Book Now</Link></p>
                                </div>
                                <div className='secInfo' >
                                    
                                        <p>Ovarall Rating : 4.5/5</p>
                                        <p>Rating</p>
                                        <p>Rating of : 100 Booker</p>
                                        <Link className='bookBtn' to={'/lawyerpage/' + item._id}>Book</Link>
                                 
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

const mapStateToProps = ({ lawyer ,fetch}) => {
    return {
        lawyers: lawyer.lawyers,
        fetching: fetch.fetching
    }
}
export default connect(mapStateToProps, { fetchLawyers })(LawyerList);