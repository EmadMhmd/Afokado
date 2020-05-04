import React, { Component } from 'react';
import AddTask from '../agenda/addTask.com.js';
import UpdateTask from '../agenda/updateTask.com.js';
import { connect } from 'react-redux';
import { Button , ButtonGroup} from 'reactstrap';
import moment from 'moment';
import Spinner from '../../general_components/spinner_com/spinner.com.js';

import {fetchTasksForCase , deleteTask} from '../../../actions/task.action';
import EmptyMessage from '../../general_components/empty.com';

class CasePage extends Component {
    componentDidMount() {
        const {fetchTasksForCase}=this.props
        const {id}=this.props.match.params
        fetchTasksForCase(id)
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
        const {id}=this.props.match.params
        if (fetching) {
            return <Spinner size={50} />
        }
        return (
            <div>
                
                <h3>Taks</h3>
                <AddTask caseId={id}/>
                <hr />
                {this.emptyCase()}
                {tasks.map((item) => (

                    <div key={item._id} style={{ overflow: 'hidden' }}>
                        <div className='conatiner' style={{ overflow: 'hidden', marginBottom: 50 }}>

                            <div className='caseData' style={{ float: 'left', width: '40%' }}>
                             
                                <h3>{item.title}</h3>
                                <p>description :{item.description}</p>
                                <p>Notes :{item.notes}</p>
                                <p>Decision :{item.decision}</p>
                            
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

export default connect(mapStateToProps, { fetchTasksForCase, deleteTask })(CasePage);