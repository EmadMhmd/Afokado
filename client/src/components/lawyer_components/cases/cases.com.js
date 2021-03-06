import React, { Component, Fragment } from 'react';
import AddCase from './addCase.com.js';
import UpdateCase from './updateCase.com.js';
import { fetchCases, deleteCase, archievCase } from '../../../actions/case.action';
import { connect } from 'react-redux';
import { Button, ButtonGroup } from 'reactstrap';
import moment from 'moment';
import Spinner from '../../general_components/spinner_com/spinner.com.js';
import EmptyMessage from '../../general_components/empty.com.js';
import { Link } from 'react-router-dom';
import CaseSearch from './caseSearch.com.js';
import AddTask from '../agenda/addTask.com.js';
import AddSession from '../agenda/addSession.com.js';
import CaseOwner from './updateCaseOwner.com.js';
import Archive from './archiveCase.com.js';

class CasesList extends Component {
    componentDidMount() {
        this.props.fetchCases({ archive: 'em', type: 'em' })
        document.title='AFokado | My Cases'
    }
    emptyCase() {
        const { cases } = this.props
        const message = `ooops !! You still don't have any a case !?`
        if (cases.length === 0) {
            return (
                <EmptyMessage message={message} />
            )
        }
    }
    renderBtns(item) {
        if (item.archive === 1) {
            return <Button className='mainBtn btnN'><Link className='btnLink' to={'/casepage/' + item._id}>Case Details</Link></Button>
        }
        return <Fragment>
            <hr />
            <div>
                <ButtonGroup>
                    <Button className='mainBtn btnL'><Link className='btnLink' to={'/casepage/' + item._id}>Case Details</Link></Button>
                    <UpdateCase oneCase={item} />
                    <AddTask caseId={item._id}/>
                    <AddSession caseId={item._id}/>
                    <CaseOwner caseId={item._id}/>
                    <Archive caseId={item._id}/>
                </ButtonGroup>
            </div>
        </Fragment>
    }
    render() {
        const { fetching, cases } = this.props
        if (fetching) {
            return <Spinner size={50} />
        }
        return (
            <div>
                <div className='bg items'>
                    <CaseSearch />
                    <div className='listConatiner'>
                        <div cleas='headBar'>
                            <h3 className='header'>My Cases</h3>
                            <AddCase />
                        </div>
                        {cases.map((item) => (

                            <div key={item._id} className='item'>
                                <h3 className='itemHeader'>{item.title}</h3>
                                <div class='itemBody'>
                                    <pre className='desc'>description :</pre>
                                    <p className='bodyPara txt'>{item.description}</p>
                                    <pre className='bodyPara'>Claimant  : {item.claimant}</pre>
                                    <pre className='bodyPara'>Defendant : {item.defendant} </pre>
                                    <pre className='bodyPara'>Court     : {item.court}</pre>
                                    <pre className='bodyPara'>Type      : {item.type}</pre>
                                    <pre className='bodyPara'>Number    : {item.number}</pre>
                                    {item.finalDecision ? <pre className='bodyPara'>Decsion   : {item.finalDecision}</pre> : <></>}
                                    {item.notes         ? <pre className='bodyPara'>Notes     : {item.notes}</pre> : <></>}
                                    {item.caseOwner     ? <pre className='bodyParaWithoutUpper'>Owner     : {item.caseOwner.userName} | {item.caseOwner.email} | {item.caseOwner.mobile} </pre> : <></>}
                                    <pre className='bodyPara'>Created   : {moment(item.created).format('LL')}</pre>
                                    <abbr title='Delete the Case'><Button className='del' onClick={() => this.props.deleteCase(item._id)}><i className='fa fa-trash fas' /></Button></abbr>

                                </div>
                                {this.renderBtns(item)}
                            </div>


                        ))}

                    </div>
                </div>
                {this.emptyCase()}
            </div>
        )
    }
}

const mapStateToProps = ({ cases, fetch,auth }) => {
    return {
        fetching: fetch.fetching,
        cases: cases.cases,
        profile:auth.profile
    }
}
export default connect(mapStateToProps, { fetchCases, deleteCase, archievCase })(CasesList);