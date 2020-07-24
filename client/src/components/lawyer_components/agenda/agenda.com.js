import React, { Component } from 'react';
import AddTask from './addTask.com.js';
import { connect } from 'react-redux';
import { Button, ButtonGroup } from 'reactstrap';
import moment from 'moment';
import Spinner from '../../general_components/spinner_com/spinner.com.js';
import TaskSearch from './taskSearch.com'
import UpdateTask from './updateTask.com.js';
import { fetchTasks, deleteTask } from '../../../actions/task.action';
import EmptyMessage from '../../general_components/empty.com';

class Agenda extends Component {
    componentDidMount() {
        const { fetchTasks } = this.props;
        fetchTasks({ dateline: 'em', subLawyer: 'em' })
        document.title = 'AFokado | My Tasks'
    }
    emptyCase() {
        const { tasks } = this.props
        const message = `oops! You still don't have any a task !?`
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
                    <TaskSearch />
                    <div className='listConatiner'>

                        <div cleas='headBar'>
                            <h3 className='header'>My Tasks</h3>
                            <AddTask btn='add' />
                        </div>

                        {tasks.filter(task => task.session === 0).map(item => (
                            <div key={item._id} className='item'>
                                <h3 className='itemHeader'>{item.title}</h3>
                                <div className='itemBody'>
                                    {item.session === 0 ? <pre className='desc'    >Type       : Task</pre> : <pre className='desc'>Type       : Session</pre>}
                                    <pre className='desc'>description</pre>
                                    <p className='bodyPara txt'>{item.description}</p>
                                    <pre className='bodyPara'                      >DateLine   : {moment(item.dateline).format('LL')}</pre>
                                    {item.caseId        ? <pre className='bodyPara'>Case       : {item.caseId.title} | {item.caseId.number} | {item.caseId.court}</pre> : <></>}
                                    {item.subLawyer     ? <pre className='bodyPara'>Sub Lawyer : {item.subLawyer.userName}</pre> : <></>}
                                    {item.notes         ? <pre className='bodyPara'>Notes      : {item.notes}</pre> : <></>}
                                    {item.decision      ? <pre className='bodyPara'>decision   : {item.decision}</pre> : <></>}
                                    <pre className='bodyPara'                      >Created    : {moment(item.created).format('LL')} </pre>
                                    <abbr title='Delete the task'><Button className='del' onClick={() => this.props.deleteTask(item._id)}><i className='fa fa-trash fas' /></Button></abbr>
                                </div>
                                <hr />
                                {item.decision ? <pre className='bodyPara'>status  : Done</pre> : <></>}
                                {item.notify===1 && !item.decision  ? <pre className='bodyPara'>status  : Viewd</pre>: <></>}
                                {item.notify===0 && !item.decision  ? <pre className='bodyPara'>status  : Assigned</pre>: <></>}
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


const mapStateToProps = ({ task, fetch }) => {
    return {
        fetching: fetch.fetching,
        tasks: task.tasks
    }
}

export default connect(mapStateToProps, { fetchTasks, deleteTask })(Agenda);