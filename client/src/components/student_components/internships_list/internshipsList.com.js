import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchInternshipsForApply } from '../../../actions/internalship.action';
import { apply } from '../../../actions/apply.action.js';
import Spinner from '../../general_components/spinner_com/spinner.com.js';
import {Button, Badge} from 'reactstrap';
import EmptyMessage from '../../general_components/empty.com.js';
import moment from 'moment';

class Internships extends Component {
  componentDidMount(){
          const {fetchInternshipsForApply}=this.props;
          const query={
              spec: "",
              city:"",
              paid:""
          }
          fetchInternshipsForApply(query)
          document.title='AFokado | Internship Offers'
  }
    emptyCase(){
        const { internships } = this.props
        const message=`oops !! There no Internship Now !?`
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
                <div className='listConatiner'>
         
                <h3 className='header' style={{width:'360px'}}> 
                            <span className='spec'> Matching </span>
                            <span> {internships.filter(job => job.job === 0).length} </span>
                            Internships
               </h3>
                
                    {internships.filter(intern => intern.job === 0).map((item) => (
                        <div className='item' key={item._id}>
                            <div>
                                <h3 className='itemHeaderWithSub'>{item.title} <p className='itemSubHeader'>{moment(item.created).fromNow()}</p></h3>
                                
                                <div className='itemBody' >
                                    <pre className='desc'>Description :</pre>
                                    <p className='bodyPara txt'>{item.description}</p>
                                    <pre className='bodyPara'>Vacancies      : {item.count}</pre>
                                    {item.role ?  <pre className='bodyPara'>Role           : {item.role}</pre> : <></>}
                                    {item.salary?<pre className='bodyPara'>Salary         : {item.count}</pre> : <></> }
                                    {item.paid? <pre className='bodyPara'>paid           : {item.paid}</pre> :<></>}
                                    <pre className='bodyPara'>Duration       : {item.duration}</pre>
                                    <pre className='bodyPara'>Start Date     :{moment(item.startDate).format(' DD-MM-YYYY  dddd')}</pre>
                                    <pre className='bodyPara'>Lawyer/Office  : {item.owner.userName} | {item.owner.spec} , {item.owner.sspec}</pre>
                                    <pre className='bodyPara'>Office Address : {item.owner.address} , {item.owner.city} , {item.owner.state}</pre>

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