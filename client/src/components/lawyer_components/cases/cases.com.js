import React, { Component } from 'react';
import AddCase from './addCase.com.js';
import AddTask from '../agenda/addTask.com.js';
import UpdateCase from './updateCase.com.js';
import { fetchCases, deleteCase, archievCase } from '../../../actions/case.action';
import { connect } from 'react-redux';
import { Button , ButtonGroup} from 'reactstrap';
import moment from 'moment';
import Spinner from '../../general_components/spinner_com/spinner.com.js';
import EmptyMessage from '../../general_components/empty.com.js';
import { Link } from 'react-router-dom';
import CaseSearch from './caseSearch.com.js';

class CasesList extends Component {
    componentDidMount() {
        const { fetchCases ,cases}  = this.props;
        if(cases.length === 0){
            
            fetchCases({archive:'em' , type:'em'})
        }
        
    }
    emptyCase(){
        const { cases } = this.props
        const message=`oops! you still don't have any case !?`
        if(cases.length===0){
            return (
                <EmptyMessage message={message} />
            )
        }
    }
    render() {
        const { fetching, cases } = this.props
        if (fetching) {
            return <Spinner size={50} />
        }
        return (
            <div>
                <CaseSearch />
                <AddCase  />
                <h3>My Cases</h3>
                
                <hr />
                {this.emptyCase()}
                {cases.map((item) => (

                    <div key={item._id} style={{ overflow: 'hidden' }}>
                        <div className='conatiner' style={{ overflow: 'hidden', marginBottom: 50 }}>

                            <div className='caseData' style={{ float: 'left', width: '40%' }}>
                             
                                <h3>{item.title}</h3>
                                <p>Claimant :{item.claimant}, Defendant :{item.defendant} </p>
                                <p>Type :{item.type}, Court :{item.court},  Number :{item.number}</p>
                            
                                <span >{moment(item.created).format('LL')}</span>
                                <Link to={'/casepage/' + item._id}>Details of Case</Link>
                            </div>
                            <div className='Btns' style={{ float: 'left', width: '40%' }}>
                        
                                <ButtonGroup>
                                    <UpdateCase oneCase={item} />
                                    <Button onClick={() => this.props.deleteCase(item._id)}>Delete</Button>
                                    <Button onClick={() => this.props.archievCase(item._id)}>Archive</Button>
                                    <AddTask caseId={item._id}/>
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

const mapStateToProps = ({ cases,fetch }) => {
    return {
        fetching: fetch.fetching,
        cases: cases.cases,
    }
}
export default connect(mapStateToProps, { fetchCases, deleteCase, archievCase })(CasesList);