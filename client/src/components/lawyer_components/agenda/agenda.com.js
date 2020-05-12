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
        const { fetchTasks, tasks } = this.props;
        if (tasks.length === 0) {
            fetchTasks({ dateline: 'em', subLawyer: 'em' })
        }
    }
    emptyCase() {
        const { tasks } = this.props
        const message = `oops! you still don't have any task !?`
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
                            <h3 className='header'>Agenda</h3>
                            <AddTask />
                        </div>

                        {tasks.map((item) => (

                            <div key={item._id} className='item'>
                                <h3 className='itemHeader'>{item.title}</h3>
                                <div className='itemBody'>
                                    <p>description :{item.description}</p>
                                    <p>Notes :{item.notes}</p>
                                    <p>subLawyer :{item.subLawyer}</p>
                                    <p >{moment(item.dateline).format('LL')}</p>
                                    <p>decision : {item.decision}</p>
                                    <p>Created :{item.created} </p>
                                    <abbr title='Delete the task'><Button className='del' onClick={() => this.props.deleteTask(item._id)}><i className='fa fa-trash fas' /></Button></abbr>
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


const mapStateToProps = ({ task, fetch }) => {
    return {
        fetching: fetch.fetching,
        tasks: task.tasks
    }
}

export default connect(mapStateToProps, { fetchTasks, deleteTask })(Agenda);