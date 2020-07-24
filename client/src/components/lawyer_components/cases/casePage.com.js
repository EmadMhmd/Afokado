import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import moment from 'moment';
import Spinner from '../../general_components/spinner_com/spinner.com.js';
import { getCase } from '../../../actions/case.action';
import { fetchTasksForCase } from '../../../actions/task.action';
import EmptyMessage from '../../general_components/empty.com';

class CasePage extends Component {
    state = { type: 'task' }
    componentDidMount() {
        const { fetchTasksForCase, getCase } = this.props
        const { id } = this.props.match.params
        fetchTasksForCase(id)
        getCase(id)
        document.title = 'AFokado | Case Page'
    }
    emptyCase() {
        const { tasks } = this.props
        const message = `oops! You still don't have any task !?`
        if (tasks.length === 0) {
            return (
                <EmptyMessage message={message} />
            )
        }
    }
    renderTasks() {
        const { tasks } = this.props
        if (this.state.type === 'task') {
            return (
                <Fragment>
                    {tasks.filter(task => task.session === 0).map(item => (
                        <div key={item._id} className='item'>
                            <h3 className='itemHeader'>{item.title}</h3>
                            <div className='itemBody'>
                                <pre className='desc'>description</pre>
                                <p className='bodyPara txt'>{item.description}</p>
                                <pre className='bodyPara'                      >DateLine   : {moment(item.dateline).format('LL')}</pre>
                                {item.subLawyer ? <pre className='bodyParaWithoutUpper'>Sub Lawyer : {item.subLawyer.userName} | {item.subLawyer.mobile} | {item.subLawyer.email}</pre> : <></>}
                                {item.notes ? <pre className='bodyPara'>Notes      : {item.notes}</pre> : <></>}
                                {item.decision ? <pre className='bodyPara'>decision   : {item.decision}</pre> : <></>}
                                <pre className='bodyPara'                      >Created    : {moment(item.created).format('LL')} </pre>
                            </div>
                            <hr />
                            {item.decision ? <pre className='bodyPara'>status  : Done</pre> : <></>}
                            {item.notify === 1 && !item.decision ? <pre className='bodyPara'>status  : Viewd</pre> : <></>}
                            {item.notify === 0 && !item.decision ? <pre className='bodyPara'>status  : Assigned</pre> : <></>}
                        </div>
                    ))}
                </Fragment>
            )
        }
        if (this.state.type === 'session') {
            return (
                <Fragment>
                    {tasks.filter(task => task.session === 1).map(item => (
                        <div key={item._id} className='item'>
                            <h3 className='itemHeader'>{item.title}</h3>
                            <div className='itemBody'>
                                <pre className='desc'>description</pre>
                                <p className='bodyPara txt'>{item.description}</p>
                                <pre className='bodyPara'                      >DateLine   : {moment(item.dateline).format('LL')}</pre>
                                {item.subLawyer ? <pre className='bodyParaWithoutUpper'>Sub Lawyer : {item.subLawyer.userName} | {item.subLawyer.mobile} | {item.subLawyer.email}</pre> : <></>}
                                {item.notes ? <pre className='bodyPara'>Notes      : {item.notes}</pre> : <></>}
                                {item.decision ? <pre className='bodyPara'>decision   : {item.decision}</pre> : <></>}
                                <pre className='bodyPara'                      >Created    : {moment(item.created).format('LL')} </pre>
                            </div>
                            <hr />
                            {item.decision ? <pre className='bodyPara'>status  : Done</pre> : <></>}
                            {item.notify === 1 && !item.decision ? <pre className='bodyPara'>status  : Viewd</pre> : <></>}
                            {item.notify === 0 && !item.decision ? <pre className='bodyPara'>status  : Assigned</pre> : <></>}
                        </div>
                    ))}
                </Fragment>
            )
        }
    }
    changeTaskType = (type) => {
        this.setState({ type })
    }
    render() {
        const { fetching, cases } = this.props
        //const { id } = this.props.match.params
        if (fetching) {
            return <Spinner size={50} />
        }
        return (
            <div >
                <div className='bg items'>
                    <div className='listConatiner'>
                        <div className='item' style={{ marginTop: '50px' }}>
                            <h3 className='itemHeader'>{cases.title}</h3>
                            <div class='itemBody'>
                                <pre className='desc'>description :</pre>
                                <p className='bodyPara txt'>{cases.description}</p>
                                <pre className='bodyPara'>Claimant  : {cases.claimant}</pre>
                                <pre className='bodyPara'>Defendant : {cases.defendant} </pre>
                                <pre className='bodyPara'>Court     : {cases.court}</pre>
                                <pre className='bodyPara'>Type      : {cases.type}</pre>
                                <pre className='bodyPara'>Number    : {cases.number}</pre>
                                {cases.finalDecision ? <pre className='bodyPara'>Decsion   : {cases.finalDecision}</pre> : <></>}
                                {cases.notes ? <pre className='bodyPara'>Notes     : {cases.notes}</pre> : <></>}
                                {cases.caseOwner ? <pre className='bodyParaWithoutUpper'>Owner     : {cases.caseOwner.userName} | {cases.caseOwner.email} | {cases.caseOwner.mobile} </pre> : <></>}
                                <pre className='bodyPara'>Created   : {moment(cases.created).format('LL')}</pre>
                            </div>
                        </div>

                        <div cleas='headBar'>
                            {this.state.type === 'task' ? <h3 className='header'>My Tasks</h3> : <h3 className='header'>My Sessions</h3>}
                            {this.state.type === 'task' ? <Button className='add' onClick={() => this.changeTaskType('session')}>My Session</Button> : <Button className='add' onClick={() => this.changeTaskType('task')}>My Tasks</Button>}

                        </div>

                        {this.renderTasks()}

                    </div>
                </div>
                {this.emptyCase()}
            </div>
        )
    }
}

const mapStateToProps = ({ task, fetch, cases }) => {
    return {
        fetching: fetch.fetching,
        tasks: task.tasks,
        cases: cases.oneCase
    }
}

export default connect(mapStateToProps, { fetchTasksForCase, getCase })(CasePage);