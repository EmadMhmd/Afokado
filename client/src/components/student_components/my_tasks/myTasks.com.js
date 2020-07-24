import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup } from 'reactstrap';
import moment from 'moment';
import Spinner from '../../general_components/spinner_com/spinner.com.js';
import UpdateTask from '../../lawyer_components/agenda/updateTask.com.js';
import { fetchTaskRequsts } from '../../../actions/task.action';
import { openStudentTaskNotifications ,openTaskNotifications } from '../../../actions/notify.action';
import EmptyMessage from '../../general_components/empty.com';

class MyTasks extends Component {
    componentDidMount() {
        const { fetchTaskRequsts,openStudentTaskNotifications ,openTaskNotifications , profile } = this.props;
        fetchTaskRequsts()
        if(profile.type===2){
            openTaskNotifications()
        }
        if(profile.type===3){
            openStudentTaskNotifications()
        }
        document.title='AFokado | Agenda'
    }
    emptyCase() {
        const { tasks } = this.props
        const message = `ooops !! You still don't have any a task !?`
        if (tasks.length === 0) {
            return (
                <EmptyMessage message={message} />
            )
        }
    }
    render() {
        const { fetching, tasks } = this.props
        if (fetching) {
            return <Spinner size={50} />
        }
        return (
            <div>
                <div className='bg items'>
                    <div className='listConatiner'>
                        <div cleas='headBar'>
                            <h3 className='header'>Agenda</h3>
                        </div>
                        {tasks.map((item) => (
                            <div key={item._id} className='item'>
                                <h3 className='itemHeader'>{item.title}</h3>
                                <div className='itemBody'>
                                    {item.session === 0 ? <pre className='desc'    >Type       : Task</pre> : <pre className='desc'>Type       : Session</pre>}
                                    <pre className='desc'>description</pre>
                                    <p className='bodyPara txt'>{item.description}</p>
                                    <pre className='bodyPara'                      >DateLine   : {moment(item.dateline).format('LL')}</pre>
                                    {item.caseId        ? <pre className='bodyParaWithoutUpper'>Case       : {item.caseId.title} | {item.caseId.number} | {item.caseId.court}</pre> : <></>}
                                    {item.notes         ? <pre className='bodyPara'>Notes      : {item.notes}</pre> : <></>}
                                    {item.decision      ? <pre className='bodyPara'>decision   : {item.decision}</pre> : <></>}
                                    <pre className='bodyPara'                      >Created    : {moment(item.created).format('LL')} </pre>
                                 </div>
                                <hr />
                                <div>
                                    <ButtonGroup>
                                        <UpdateTask task={item} />
                                    </ButtonGroup>
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
const mapStateToProps = ({ task, fetch ,auth}) => {
    return {
        fetching: fetch.fetching,
        tasks: task.tasks,
        profile:auth.profile
    }
}

export default connect(mapStateToProps, { fetchTaskRequsts,openStudentTaskNotifications ,openTaskNotifications  })(MyTasks);