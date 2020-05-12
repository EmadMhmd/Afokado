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

class CasesList extends Component {
    componentDidMount() {
        const { fetchCases, cases } = this.props;
        if (cases.length === 0) {

            fetchCases({ archive: 'em', type: 'em' })
        }

    }
    emptyCase() {
        const { cases } = this.props
        const message = `oops! you still don't have any case !?`
        if (cases.length === 0) {
            return (
                <EmptyMessage message={message} />
            )
        }
    }
    renderBtns(item) {
        if (item.archive === 1) {
            return <></>
        }
        return <Fragment>
            <hr />
            <div>
                <ButtonGroup>
                    <Button className='mainBtn btnL'><Link to={'/casepage/' + item._id}>Case Details</Link></Button>
                    <UpdateCase oneCase={item} />
                    <Button className='mainBtn btnR' onClick={() => this.props.archievCase(item._id)}>Archive</Button>

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
                                    <p>description :{item.description}</p>
                                    <p>Claimant :{item.claimant}, Defendant :{item.defendant} </p>
                                    <p>Type :{item.type}, Court :{item.court},  Number :{item.number}</p>
                                    <span >{moment(item.created).format('LL')}</span>
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

const mapStateToProps = ({ cases, fetch }) => {
    return {
        fetching: fetch.fetching,
        cases: cases.cases,
    }
}
export default connect(mapStateToProps, { fetchCases, deleteCase, archievCase })(CasesList);