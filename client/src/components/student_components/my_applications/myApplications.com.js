import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchApplications, deleteApplication, updateApplication } from '../../../actions/apply.action.js';
import { Button } from 'reactstrap';
import EmptyMessage from '../../general_components/empty.com.js';
import Spinner from '../../general_components/spinner_com/spinner.com.js';
import moment from 'moment';

class MyApp extends Component {
    componentDidMount() {
        const { fetchApplications } = this.props;
        fetchApplications()
    }
    emptyCase() {
        const { applications } = this.props
        const message = `oops! you still don't have any application !?`
        if (applications.length === 0) {
            return (
                <EmptyMessage message={message} />
            )
        }
    }

    renderBtns(app) {
        if (app.status === 'pending') {
            
            if (app.confirmed === 0) {
                return (
                    <div>
                        <hr />
                        <Button className='mainBtn btnL' onClick={() => this.props.deleteApplication(app._id)}>Cancel</Button>
                        <Button className='mainBtn btnR' onClick={() => this.props.updateApplication(app._id)}>Confirm</Button>
                    </div>
                )
            } else {
                return (
                    <div>
                        <hr />
                        <Button className='mainBtn btnN' onClick={() => this.props.deleteApplication(app._id)}>Cancel</Button>
                    </div>
                )
            }
        } else if (app.status === 'accept') {
            
            return(
            <div>
                <hr />
                <Button className='mainBtn btnN' onClick={() => this.props.deleteApplication(app._id)}>Cancel</Button>
            </div>
             )
        }
        return <></>
    }
    render() {
        const { fetching, applications } = this.props;
        if (fetching) {
            return <Spinner size={50} />
        }

        return (

            <div>
                <div className='bg items'>
                    <div className='listConatiner'>

                        <div cleas='headBar'>
                            <h3 className='header'>My App</h3>
                            <Button className='add'>Apply Now</Button>
                        </div>

                        {applications.map((item) => (

                            <div key={item._id} className='item'>
                                <h3 className='itemHeader'>{item.internshipId.title}</h3>
                                <div class='itemBody'>
                                    <pre className='bodyPara'>Status             : {item.status}</pre>
                                    <pre className='bodyPara'>Description        :</pre>
                                    <p className='bodyPara txt'>{item.internshipId.description}</p>
                                    <pre className='bodyPara'>Duration           : {item.internshipId.duration}</pre>
                                    <pre className='bodyPara'>Paid               : {item.internshipId.paid}</pre>
                                    <pre className='bodyPara'>apply time         : {moment(item.created).format(' DD-MM-YYYY  dddd')}</pre>
                                    <abbr title='Cancel the Application'><Button className='del' onClick={() => this.props.deleteApplication(item._id)}><i className='fa fa-trash fas' /></Button></abbr>
                                </div>
                                
                                {this.renderBtns(item)}
                            </div>
                        ))}

                    </div>
                </div>
                {this.emptyCase()}
            </div>

        )
    }
}
const mapStateToProps = ({ apply, fetch }) => {
    return {
        applications: apply.applications,
        fetching: fetch.fetching
    }
}

export default connect(mapStateToProps, { fetchApplications, deleteApplication, updateApplication })(MyApp);