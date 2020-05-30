import React, { Component } from 'react';
import { getMyOffice, outFromOffice, rejectOffice, acceptOffice } from '../../../actions/office.action';
import { connect } from 'react-redux';
import { Button, ButtonGroup } from 'reactstrap';
import Spinner from '../../general_components/spinner_com/spinner.com.js';
import EmptyMessage from '../../general_components/empty.com.js';


class MyOffice extends Component {
    componentDidMount() {
        this.props.getMyOffice()
    }
    emptyCase() {
        const { office } = this.props
        const message = `oops! you still don't exist in any office !?`
        if (office.length === 0) {
            return (
                <EmptyMessage message={message} />
            )
        }
    }

    render() {
        const { office, outFromOffice, rejectOffice, acceptOffice } = this.props

        return (
            <div>
                <div className='bg items'>
                    <div className='listConatiner'>
                        <div cleas='headBar'>
                            <h3 className='header'>My Office</h3>
                        </div>

                        {office.map((item) => (
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
    }
}

export default connect(mapStateToProps, { getMyOffice, outFromOffice, rejectOffice, acceptOffice })(MyOffice);