import React, { Component,  } from 'react';
import { fetchUserCases} from '../../../actions/case.action';
import { connect } from 'react-redux';
import { Button} from 'reactstrap';
import moment from 'moment';
import Spinner from '../../general_components/spinner_com/spinner.com.js';
import EmptyMessage from '../../general_components/empty.com.js';
import { Link } from 'react-router-dom';
class CasesList extends Component {
    componentDidMount() {
        const { fetchUserCases} = this.props;
        fetchUserCases()
        document.title='AFokado | my Cases'
    }
    emptyCase() {
        const { cases } = this.props
        const message = `oops !! You still don't have any a assigned case late !?`
        if (cases.length === 0) {
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
                <div className='bg items'>
                    <div className='listConatiner'>
                        <div cleas='headBar'>
                            <h3 className='header'>My Cases</h3>
                        </div>
                        {cases.map((item) => (
                            <div key={item._id} className='item'>
                                <h3 className='itemHeader'>{item.title}</h3>
                                <div class='itemBody'>
                                    <pre className='desc'>description :</pre>
                                    <p className='bodyPara txt'>{item.description}</p>
                                    <pre className='bodyPara'>Number         : {item.number}</pre>
                                    <pre className='bodyPara'>Claimant       : {item.claimant}</pre>
                                    <pre className='bodyPara'>Defendant      : {item.defendant} </pre>
                                    <pre className='bodyPara'>Court          : {item.court}</pre>
                                    <pre className='bodyPara'>Type           : {item.type}</pre>
                                    {item.finalDecision? <pre className='bodyPara'>Final Decision : {item.finalDecision}</pre> : <></>}
                                    <pre className='bodyPara'>Created        : {moment(item.created).format('LL')}</pre>
                                    <pre className='bodyParaWithoutUpper'>Lawyer         : {item.owner.userName} | {item.owner.mobile} | {item.owner.email}</pre>
                                </div>
                                <hr/>
                                <Button className='mainBtn btnN'><Link className='btnLink' to={'/casepage/' + item._id}>Case Details</Link></Button>
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
        cases: cases.cases
    }
}
export default connect(mapStateToProps, { fetchUserCases })(CasesList);