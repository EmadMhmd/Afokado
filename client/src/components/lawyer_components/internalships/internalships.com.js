import React, { Component } from 'react';
import AddInternalship from './addInternalship.com.js';
import UpdateInternalship from './updateInternalship.com.js';
import { fetchInternshipsForLawyer, deleteInternship } from '../../../actions/internalship.action';
import { connect } from 'react-redux';
import { Button ,ButtonGroup} from 'reactstrap';
import moment from 'moment';
import EmptyMessage from '../../general_components/empty.com.js';
import Spinner from '../../general_components/spinner_com/spinner.com.js';

class InternalshipsList extends Component {
    componentDidMount() {
        const { fetchInternshipsForLawyer } = this.props;
        fetchInternshipsForLawyer()
    }
    emptyCase(){
        const { internships } = this.props
        const message=`oops! you still don't have any internship !?`
        if(internships.length===0){
            return (
                <EmptyMessage message={message} />
            )
        }
    }
    render() {
        const { fetching, internships } = this.props
        if (fetching) {
            return <Spinner size={50} />
        }
        return (
            <div>
                
                <AddInternalship />
                <h3>My internships</h3>
                <hr />
                {this.emptyCase()}
                {internships.map((item) => (
                    <div key={item._id} style={{ overflow: 'hidden' }}>
                        <div className='conatiner' style={{ overflow: 'hidden', marginBottom: 50 }}>

                            <div className='caseData' style={{ float: 'left', width: '40%' }}>
                                <span >{moment(item.created).format('LL')}</span>
                                <span >{item.description}</span>

                            </div>
                            <div className='Btns' style={{ float: 'left', width: '40%' }}>

                                <ButtonGroup>
                                    <UpdateInternalship internship={item} />
                                    <Button onClick={() => this.props.deleteInternship(item._id)}>Delete</Button>
                                </ButtonGroup>
                            </div>
                        </div>
                        <hr />
                    </div>
                   
               
               ))}


            </div>
        )
    }
}


const mapStateToProps = ({ internship ,fetch}) => {
    return {
        fetching: fetch.fetching,
        internships: internship.internships
    }
}

export default connect(mapStateToProps, { fetchInternshipsForLawyer, deleteInternship })(InternalshipsList);