import React, { Component } from 'react';
import { getOffice, deleteFromOffice, outFromOffice, rejectOffice, acceptOffice } from '../../../actions/office.action';
import { connect } from 'react-redux';
import { Button, ButtonGroup } from 'reactstrap';
import AddToOffice from './addToOffice.com.js';
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
        const { office, deleteFromOffice, myOffice, outFromOffice, rejectOffice, acceptOffice } = this.props

        return (
            <div>
                <div className='bg items'>
                    <div className='listConatiner'>
                        <div cleas='headBar'>
                            {office.length === 0 ? <></> :
                                <h3 className='header'>My Office</h3>
                            }
                            <AddToOffice />
                        </div>



                        {office.map((item) => (
                            <div key={item._id} className='item'>
                                <div className='itemBody' >
                                    <pre className='bodyPara' >{item.subLawyer.userName}</pre>
                                    {item.status === 'pending' ? <pre classname=''>status:{item.status}</pre> : <></>}
                                    <abbr title='Delete the Time'><Button className='del' onClick={() => deleteFromOffice(item._id)}><i className='fa fa-trash fas' /></Button></abbr>
                                </div>
                            </div>
                        ))}

                        {myOffice.length === 0 ? <></> :
                            <div cleas='headBar'>
                                <h3 className='header'>External Office</h3>
                            </div>
                        }
                        {myOffice.map((item) => (
                            <div key={item._id} className='item'>
                                <div className='itemBody' >
                                    <pre className='bodyPara' >name    :{item.mainLawyer.userName}</pre>
                                    <pre className='bodyPara' >spec    :{item.mainLawyer.spec}</pre>
                                    <pre className='bodyPara' >address :{item.mainLawyer.address}</pre>
                                    <pre className='bodyPara' >city    :{item.mainLawyer.city} , state   :{item.mainLawyer.state}</pre>

                                    {item.status === 'accept' ? <abbr title='Out from Ofiice'><Button className='del' onClick={() => outFromOffice(item._id)}><i className='fa fa-trash fas' /></Button></abbr> : <></>}
                                </div>


                                {item.status === 'accept' ? <></> :
                                    <div>
                                        <hr />
                                        <ButtonGroup>
                                            <Button className='mainBtn btnL' onClick={() => acceptOffice(item._id)}>Accept</Button>
                                            <Button className='mainBtn btnR' onClick={() => rejectOffice(item._id)}>Reject</Button>
                                        </ButtonGroup>
                                    </div>
                                }

                                {/* <Button className={`mainBtn  ${item.status==="accept"?'btnN': 'btnR'} `} onClick={() => rejectOffice(item._id)}>Reject</Button> */}

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
        myOffice: office.myOffice,
    }
}
export default connect(mapStateToProps, { getOffice, deleteFromOffice, outFromOffice, rejectOffice, acceptOffice })(Office);