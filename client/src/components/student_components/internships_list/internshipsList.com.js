import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchInternshipsForApply } from '../../../actions/internalship.action';
import { apply } from '../../../actions/apply.action.js';
import Spinner from '../../general_components/spinner_com/spinner.com.js';
import HeaderSearch from '../apply_search_header/applyHeader.com.js';
import { Link } from 'react-router-dom';
import {Button} from 'reactstrap';
import './lawyerList.style.css';
import EmptyMessage from '../../general_components/empty.com.js';
//import lm from './lawm.png';

class Internships extends Component {
  componentDidMount(){
      const {internships}=this.props;
      if(internships.length ===0){
          const {fetchInternshipsForApply}=this.props;
          const query={
              spec: "",
              city:"",
              paid:""
          }
          fetchInternshipsForApply(query)
      }
  }
    emptyCase(){
        const { internships } = this.props
        const message=`oops! your search  don't match any internship !?`
        if(internships.length===0){
            return (
                <EmptyMessage message={message} />
            )
        }
    } 
    applied=(id)=>{
        const {apply}=this.props
        apply(id)
        this.props.history.push('/my_app')
    }
    render() {
        const { fetching, internships } = this.props
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
                 {this.emptyCase()}
                <div className='lawyers'>
                    {internships.map((item) => (
                        <div className='lawyer' key={item._id}>
                            <div style={{ overflow: 'hidden' }}>
                                <div className='mainInfo' >
                                    <Link className='degName' to={'/lawyerpage/' + item._id}>{item.description}</Link>
                                    <p>{item.count}</p>
                                    <p>{item.paid}</p>
                                    <Button onClick={()=>this.applied(item._id)} >Apply Direct</Button>
                                    <Button><Link to={'/applypage/' + item._id}>Details First</Link></Button>
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
          
export default connect(mapStateToProps,{fetchInternshipsForApply , apply})(Internships);