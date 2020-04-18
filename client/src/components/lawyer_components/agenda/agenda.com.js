import React, { Component } from 'react';
import AddTask from './addTask.com.js';
import { connect } from 'react-redux';
import { Button , ButtonGroup} from 'reactstrap';
import moment from 'moment';
import Spinner from '../../general_components/spinner_com/spinner.com.js';

import UpdateTask from './updateTask.com.js';
import { fetchTasks ,deleteTask } from '../../../actions/task.action';
import EmptyMessage from '../../general_components/empty.com';

class Agenda extends Component {
    componentDidMount() {
        const { fetchTasks , tasks} = this.props;
        fetchTasks()
        console.log('task ',tasks)
    }
    emptyCase(){
        const { tasks } = this.props
        const message=`oops! you still don't have any task !?`
        if(tasks.length===0){
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
                
                <h3>My Agenda</h3>
                <AddTask />
                <hr />
                {this.emptyCase()}
                {tasks.map((item) => (

                    <div key={item._id} style={{ overflow: 'hidden' }}>
                        <div className='conatiner' style={{ overflow: 'hidden', marginBottom: 50 }}>

                            <div className='caseData' style={{ float: 'left', width: '40%' }}>
                             
                                <h3>{item.title}</h3>
                                <p>description :{item.description}</p>
                                <p>Notes :{item.notes}</p>
                            
                                <span >{moment(item.dateline).format('LL')}</span>
                            </div>
                            <div className='Btns' style={{ float: 'left', width: '40%' }}>
                        
                                <ButtonGroup>
                                    <Button onClick={() => this.props.deleteTask(item._id)}>Delete</Button>
                                    <UpdateTask id={item._id} />
                                </ButtonGroup>
                            </div>
                        </div>
                        <hr/>
                    </div>


                ))}


            </div>
        )
    }
}


const mapStateToProps = ({ task,fetch }) => {
    return {
        fetching: fetch.fetching,
        tasks: task.tasks
    }
}

export default connect(mapStateToProps, { fetchTasks, deleteTask })(Agenda);