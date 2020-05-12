import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchInternshipsForApply } from '../../../actions/internalship.action';
import { apply } from '../../../actions/apply.action.js';
import Spinner from '../../general_components/spinner_com/spinner.com.js';
import HeaderSearch from '../apply_search_header/applyHeader.com.js';
import {Button, Badge} from 'reactstrap';
import EmptyMessage from '../../general_components/empty.com.js';
import moment from 'moment';

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
        apply(id).then(()=>{
            this.props.history.push('/my_app')
        })
        
    }
    render() {
        const { fetching, internships } = this.props
        if (fetching) {
            return <Spinner size={50} />
        }
        return (
            <div>
            <div className="bg items">
                <HeaderSearch />
                <div className='listConatiner'>
         
                <h3 className='secondHeader'> 
                            <span className='spec'> Matching </span>
                            <span> {internships.length} </span>
                            Internships
               </h3>
                
                    {internships.map((item) => (
                        <div className='item' key={item._id}>
                            <div>
                                <h3 className='itemHeaderWithSub'>{item.title} <p className='itemSubHeader'>{moment(item.created).fromNow()}</p></h3>
                                
                                <div className='itemBody' >
                                    <pre className='desc'>Description :</pre>
                                    <p className='txt'>{item.description}</p>
                                    <pre className='bodyPara'>Start Date     :{moment(item.startDate).format(' DD-MM-YYYY  dddd')}</pre>
                                    <pre className='bodyPara'>Duration       : {item.duration}</pre>
                                    <pre className='bodyPara'>count          : {item.count}</pre>
                                    <pre className='bodyPara'>paid           : {item.paid}</pre>
                                    <p className="delN bodyPara" style={{borderRadius:'0' , border:'none'}} to='/book_requests'>
                                    Requests <Badge color="secondary"> {item.appCount} </Badge>
                                    </p>
                                </div>
                                <hr />
                                <Button className='mainBtn btnN' onClick={()=>this.applied(item._id)} >Apply Now</Button>

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

const mapStateToProps = ({ internship ,fetch}) => {
    return {
        internships: internship.internships,
        fetching: fetch.fetching
    }
}
          
export default connect(mapStateToProps,{fetchInternshipsForApply , apply})(Internships);