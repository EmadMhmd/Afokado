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
        fetchApplicationRequests(this.props.match.params.id)
        document.title='AFokado | Applications'
    }
    emptyCase() {
        const { applications } = this.props
        const message = `great !! There no application late !?`
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
                    <Button className='mainBtn btnL' onClick={() => rejectApplication(app._id , this.props.match.params.id)}>Reject</Button>
                    <Button className='mainBtn btnR' onClick={() => acceptApplication(app._id , this.props.match.params.id)}>Accept</Button>
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
                            <h3 className='header' style={{width:'350px'}}>My Applications</h3>
                        </div>

                        {applications.map(app => (
                            <div key={app._id} className='item'>
                                <h4 className='itemHeader'>{app.internshipId.title}</h4>
                                <div className='itemBody'>
                                    <pre className='bodyPara'>Name            : {app.trainee.userName}</pre>
                                    <pre className='bodyPara'>gender          : {app.trainee.gender}</pre>
                                    <pre className='bodyPara'>age             : {app.trainee.age}</pre>
                                    <pre className='bodyPara'>Email           : {app.trainee.email}</pre>
                                    <pre className='bodyPara'>Mobile          : {app.trainee.mobile}</pre>
                                    <pre className='bodyPara'>Adderss         :</pre>
                                    <p className='bodyPara txt'>{app.trainee.address} , {app.trainee.city} , {app.trainee.state}</p>

                                    {app.trainee.uni ? <pre className='bodyPara'  >University      : {app.trainee.uni}</pre> : <></>}
                                    {app.trainee.level ? <pre className='bodyPara'>Graduation Year : {moment(app.trainee.level).format('MM-YYYY')}</pre> : <></>}

                                    {app.trainee.spec ? <pre className='bodyPara'>Specialty          : {app.trainee.spec} , {app.trainee.sspec}</pre> : <></>}

                                    
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