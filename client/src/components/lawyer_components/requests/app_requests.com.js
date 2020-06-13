import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { fetchApplicationRequests, rejectApplication, acceptApplication } from '../../../actions/apply.action.js';
import EmptyMessage from '../../general_components/empty.com.js';
import Spinner from '../../general_components/spinner_com/spinner.com.js';
import moment from 'moment';

class AppRequests extends Component {
    componentDidMount() {
        const { fetchApplicationRequests } = this.props;
        fetchApplicationRequests()
    }
    emptyCase() {
        const { applications } = this.props
        const message = `great! you haven't any apply notification !?`
        if (applications.length === 0) {
            return (
                <EmptyMessage message={message} />
            )
        }
    }
    renderBtn = (app) => {
        const { rejectApplication, acceptApplication } = this.props;
        if (app.status === 'pending') {
            return (
                <Fragment>
                    <hr />
                    <Button className='mainBtn btnL' onClick={() => rejectApplication(app._id)}>Reject</Button>
                    <Button className='mainBtn btnR' onClick={() => acceptApplication(app._id)}>Accept</Button>
                </Fragment>
            )
        } else {
            return <></>
        }
    }
    render() {
        const { applications, fetching } = this.props;
        if (fetching) {
            return <Spinner size={50} />
        }
        return (
            <div>
                <div className='bg items'>
                    <div className='listConatiner'>


                        <div cleas='headBar'>
                            <h3 className='header' style={{width:'350px'}}>Internships Requests</h3>
                        </div>

                        {applications.map(app => (
                            <div key={app._id} className='item'>
                                <h4 className='itemHeader'>{app.internshipId.title}</h4>
                                <div className='itemBody'>
                                    <pre className='bodyPara'>Name            : {app.trainee.userName}</pre>
                                    <pre className='bodyPara'>gender          : {app.trainee.gender}</pre>
                                    <pre className='bodyPara'>age             : {app.trainee.age}</pre>
                                    <pre className='bodyPara'>uni             : {app.trainee.uni}</pre>
                                    <pre className='bodyPara'>Graduation Year : {moment(app.trainee.level).format('MM-YYYY')}</pre>
                                    <pre className='bodyPara'>Email           : {app.trainee.email}</pre>
                                    <pre className='bodyPara'>Mobile          : {app.trainee.mobile}</pre>
                                </div>
                                {this.renderBtn(app)}
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
export default connect(mapStateToProps, { fetchApplicationRequests, rejectApplication, acceptApplication })(AppRequests);