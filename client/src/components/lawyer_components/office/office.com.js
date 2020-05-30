import React, { Component } from 'react';
import { getOffice, deleteFromOffice } from '../../../actions/office.action';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import AddToOffice from './addToOffice.com.js';
import Spinner from '../../general_components/spinner_com/spinner.com.js';
import EmptyMessage from '../../general_components/empty.com.js';


class Office extends Component {
    componentDidMount() {
        this.props.getOffice()
    }
    emptyCase() {
        const { office } = this.props
        const message = `oops! you still don't have any Lawyer or student in your office !?`
        if (office.length === 0) {
            return (
                <EmptyMessage message={message} />
            )
        }
    }
    render() {
        const { office , deleteFromOffice } = this.props
       
        return (
            <div>
                <div className='bg items'>
                    <div className='listConatiner'>
                        <div cleas='headBar'>
                            <h3 className='header'>Office</h3>
                            <AddToOffice />
                        </div>

                        {office.map((item) => (
                            <div key={item._id} className='item'>
                                <div className='itemBody' >
                                    <pre className='bodyPara' >{item.subLawyer.userName}</pre>
                                    {item.status ==='pending' ? <pre classname=''>status:{item.status}</pre> : <></> }
                                    <abbr title='Delete the Time'><Button className='del' onClick={() => deleteFromOffice(item._id)}><i className='fa fa-trash fas' /></Button></abbr>
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

const mapStateToProps = ({ office }) => {
    return {
        office: office.office,
    }
}

export default connect(mapStateToProps, { getOffice, deleteFromOffice })(Office);