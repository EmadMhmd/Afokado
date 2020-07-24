import React, { Component ,Fragment} from 'react';
import AddJob from './addJob.com';
import AddInternship from '../internalships/addInternalship.com.js';
import UpdateJob from './updateJob.com.js';
import UpdateIntern from '../internalships/updateInternalship.com.js';
import { fetchInternshipsForLawyer, deleteInternship } from '../../../actions/internalship.action';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import moment from 'moment';
import EmptyMessage from '../../general_components/empty.com.js';
import Spinner from '../../general_components/spinner_com/spinner.com.js';

class Jobs extends Component {
    componentDidMount() {
        const { fetchInternshipsForLawyer } = this.props;
        fetchInternshipsForLawyer()
        document.title='AFokado | My Offers'
    }
    emptyCase() {
        const { jobs } = this.props
        const message = `ooops !! You still don't have any a offer !?`
        if (jobs.length === 0) {
            return (
                <EmptyMessage message={message} />
            )
        }
    }
    render() {
        const { fetching, jobs } = this.props
        if (fetching) {
            return <Spinner size={50} />
        }
        return (
            <div>
                <div className='bg items'>
                    <div className='listConatiner'>

                        


                        <div cleas='headBar'>
                            <h3 className='header'>My Offers</h3>
                            <AddJob />
                            <AddInternship />
                        </div>
                        {jobs.map((item) => (
                            <div key={item._id} className='item'>
                                <h3 className='itemHeader'>{item.title}</h3>
                                <div className='itemBody'>
                                    <pre className="desc">Description :</pre>
                                    <p className='txt bodyPara'> {item.description}</p>
                                    {item.job===1?<pre className='bodyPara'>Type           : Job</pre>:<pre className='bodyPara'>Type           : Internship</pre>}
                                    <pre className='bodyPara'>Vacancies      : {item.count}</pre>
                                    {item.role ?  <pre className='bodyPara'>Role           : {item.role}</pre> : <></>}
                                    {item.salary?<pre className='bodyPara'>Salary         : {item.count}</pre> : <></> }
                                    {item.job===0 ? <Fragment>
                                        {item.paid? <pre className='bodyPara'>paid           : {item.paid}</pre> :<></>}
                                        <pre className='bodyPara'>Duration       : {item.duration}</pre>
                                        <pre className='bodyPara'>Start Date     :{moment(item.startDate).format(' DD-MM-YYYY  dddd')}</pre>
                                    </Fragment> : <></>}
                                    {item.job===1 ? <Fragment>
                                        <pre className='bodyPara'>Job Type       : {item.jobType}</pre>
                                        {item.minExp && item.maxExp ? <pre className='bodyPara'>Experience     : from {item.minExp} to {item.maxExp} Year</pre> : <></>}
                                    </Fragment> : <></>}
                                    
                                    <pre className='bodyPara'>created time   : {moment(item.created).format('LL')}</pre>
                                    <abbr title='Delete the Offer'><Button className='del' onClick={() => this.props.deleteInternship(item._id)}><i className='fa fa-trash fas' /></Button></abbr>
                                </div>
                                <hr />
                                {item.job===1 ?  <UpdateJob job={item} /> : <UpdateIntern internship={item} /> }
                            </div>
                        ))}


                    </div>
                </div>
                {this.emptyCase()}
            </div>
        )
    }
}


const mapStateToProps = ({ internship, fetch }) => {
    return {
        fetching: fetch.fetching,
        jobs: internship.internships
    }
}

export default connect(mapStateToProps, { fetchInternshipsForLawyer, deleteInternship })(Jobs);