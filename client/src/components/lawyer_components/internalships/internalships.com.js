import React, { Component } from 'react';
import AddInternalship from './addInternalship.com.js';
import UpdateInternalship from './updateInternalship.com.js';
import { fetchInternshipsForLawyer, deleteInternship } from '../../../actions/internalship.action';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import moment from 'moment';
import EmptyMessage from '../../general_components/empty.com.js';
import Spinner from '../../general_components/spinner_com/spinner.com.js';


//Delete it
class InternalshipsList extends Component {
    componentDidMount() {
        const { fetchInternshipsForLawyer } = this.props;
        fetchInternshipsForLawyer()
        document.title='AFokado |Internships'
    }
    emptyCase() {
        const { internships } = this.props
        const message = `oops! you still don't have any internship !?`
        if (internships.length === 0) {
            return (
                <EmptyMessage message={message} />
            )
        }
    }
    render() {
        const { fetching, internships } = this.props
        if (fetching) {
            return <Spinner size={50} />
        }
        return (
            <div>
                <div className='bg items'>
                    <div className='listConatiner'>

                        


                        <div cleas='headBar'>
                            <h3 className='header'>My internships</h3>
                            <AddInternalship />
                        </div>
                        {internships.filter(intern => intern.job === 0).map((item) => (
                            <div key={item._id} className='item'>
                                <h3 className='itemHeader'>{item.title}</h3>
                                <div className='itemBody'>
                                    <p className="desc">Description :</p>
                                    <p className='txt bodyPara'> {item.description}</p>
                                    <pre className='bodyPara'>Type           : Internshop</pre>
                                    <pre className='bodyPara'>Start Date     :{moment(item.startDate).format(' DD-MM-YYYY  dddd')}</pre>
                                    <pre className='bodyPara'>count          : {item.count}</pre>
                                    <pre className='bodyPara'>paid           : {item.paid}</pre>
                                    <pre className='bodyPara'>created time   : {moment(item.created).format('LL')}</pre>
                                    <abbr title='Delete the Case'><Button className='del' onClick={() => this.props.deleteInternship(item._id)}><i className='fa fa-trash fas' /></Button></abbr>
                                </div>
                                <hr />
                                <UpdateInternalship internship={item} />
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
        internships: internship.internships
    }
}

export default connect(mapStateToProps, { fetchInternshipsForLawyer, deleteInternship })(InternalshipsList);