import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import moment from 'moment';
import Spinner from '../../general_components/spinner_com/spinner.com.js';

import { getCase } from '../../../actions/case.action';
import { fetchTasksForCase} from '../../../actions/task.action';
import EmptyMessage from '../../general_components/empty.com';

class CasePage extends Component {
    componentDidMount() {
        const { fetchTasksForCase ,getCase} = this.props
        const { id } = this.props.match.params
        fetchTasksForCase(id)
        getCase(id)
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
        const { fetching, tasks ,cases} = this.props
        const { id } = this.props.match.params
        if (fetching) {
            return <Spinner size={50} />
        }
        return (
            <div >
                <div className='bg items'>
                    <div className='listConatiner'>

                         
                        
                        <div  className='item' style={{marginTop:'50px'}}>
                                <h3 className='itemHeader'>{cases.title}</h3>
                                <div class='itemBody'>
                                    <p>description :{cases.description}</p>
                                    <p>Claimant :{cases.claimant}, Defendant :{cases.defendant} </p>
                                    <p>Type :{cases.type}, Court :{cases.court},  Number :{cases.number}</p>
                                    <span >{moment(cases.created).format('LL')}</span>
                                </div>
                        </div>

                        <div cleas='headBar'>
                            <h3 className='header'>My tasks</h3>
                        </div>

                        {tasks.map((item) => (
                            <div key={item._id} className='item'>
                                <h3 className='itemHeader'>{item.title}</h3>
                                <div className='itemBody'>
                                    <h3>{item.title}</h3>
                                    <p>description :{item.description}</p>
                                    <p>Notes :{item.notes}</p>
                                    <p>Decision :{item.decision}</p>
                                    <span >{moment(item.dateline).format('LL')}</span>
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


const mapStateToProps = ({ task, fetch ,cases}) => {
    return {
        fetching: fetch.fetching,
        tasks: task.tasks,
        cases:cases.oneCase
    }
}

export default connect(mapStateToProps, { fetchTasksForCase ,getCase})(CasePage);