import React, { Component } from 'react';
import AddTask from './addTask.com.js';
import { connect } from 'react-redux';
import { Button , ButtonGroup} from 'reactstrap';
import moment from 'moment';
import Spinner from '../../general_components/spinner_com/spinner.com.js';
import TaskSearch from './taskSearch.com'
import UpdateTask from './updateTask.com.js';
import { fetchTasks ,deleteTask } from '../../../actions/task.action';
import EmptyMessage from '../../general_components/empty.com';
import FloatBtn from '../../general_components/float_btn/floatBtn.com';
class Agenda extends Component {
    componentDidMount() {
        const { fetchTasks , tasks} = this.props;
        if(tasks.length===0){
            fetchTasks({dateline:'em' ,subLawyer:'em'})
        }
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
        const { fetching, tasks ,fetchTasks} = this.props
        if (fetching) {
            return <Spinner size={50} />
        }
        return (
            <div>
                <FloatBtn />
                <TaskSearch />
                <h3>My Agenda</h3>
                <Button >Yesterday</Button>
                <Button onClick={()=>fetchTasks({dateline:moment().add(6,'days'), subLawyer:'em'})}>Today</Button>
                <Button>Tomorrow</Button>
                <AddTask
                 />
                <hr />
                {this.emptyCase()}
                {tasks.map((item) => (

                    <div key={item._id} style={{ overflow: 'hidden' }}>
                        <div className='conatiner' style={{ overflow: 'hidden', marginBottom: 50 }}>

                            <div className='caseData' style={{ float: 'left', width: '40%' }}>
                             
                                <h3>{item.title}</h3>
                                <p>description :{item.description}</p>
                                <p>Notes :{item.notes}</p>
                                <p>subLawyer :{item.subLawyer}</p>
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