import React, { Component } from 'react';
import { fetchTimes, deleteTime } from '../../../actions/time.action';
import { connect } from 'react-redux';
import { Button , ButtonGroup} from 'reactstrap';
import moment from 'moment';
import AddTime  from './addTime.com.js';
import Spinner from '../../general_components/spinner_com/spinner.com.js';
import EmptyMessage from '../../general_components/empty.com.js';


class TimesList extends Component {
    componentDidMount() {
        const { fetchTimes ,profile:{_id}} = this.props;
        fetchTimes(_id)
    }
    emptyCase(){
        const { times } = this.props
        const message=`oops! you still don't have any time !?`
        if(times.length===0){
            return (
                <EmptyMessage message={message} />
            )
        }
    } 
    render() {
        const { fetching, times } = this.props
        if (fetching) {
            return <Spinner size={50} />
        }
        return (
            <div>
               <AddTime />
               
                <h3>My Times</h3>
                <hr />
                {this.emptyCase()}
                {times.map((item) => (

                    <div key={item._id} style={{ overflow: 'hidden' }}>
                        <div className='conatiner' style={{ overflow: 'hidden', marginBottom: 50 }}>

                            <div className='caseData' style={{ float: 'left', width: '40%' }}>
                                <p>time :{moment(item.time).format('DD-MM-YY dddd ')}</p>
                            </div>
                            <div className='Btns' style={{ float: 'left', width: '40%' }}>
                        
                                <ButtonGroup>
                                    <Button onClick={() => this.props.deleteTime(item)}>Delete</Button>
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


const mapStateToProps = ({ time ,fetch , auth}) => {
    return {
        fetching: fetch.fetching,
        times: time.times,
        profile:auth.profile
    }
}

export default connect(mapStateToProps, { fetchTimes, deleteTime})(TimesList);