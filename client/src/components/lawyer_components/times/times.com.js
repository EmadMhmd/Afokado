import React, { Component } from 'react';
import { fetchTimes, deleteTime } from '../../../actions/time.action';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import moment from 'moment';
import AddTime from './addTime.com.js';
import Spinner from '../../general_components/spinner_com/spinner.com.js';
import EmptyMessage from '../../general_components/empty.com.js';


class TimesList extends Component {
    componentDidMount() {
        const { fetchTimes, profile: { _id } } = this.props;
        fetchTimes(_id)
    }
    emptyCase() {
        const { times } = this.props
        const message = `oops! you still don't have any time !?`
        if (times.length === 0) {
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
                <div className='bg items'>
                    <div className='listConatiner'>
                        <div cleas='headBar'>
                            <h3 className='header'>My Times</h3>
                            <AddTime />
                        </div>

                        {times.map((item) => (
                            <div key={item._id} className='item'>
                                <div className='itemBody' >
                                    <pre className='bodyPara' >time       : {moment(item.time).format('DD-MM-YY dddd ')}</pre>
                                    <abbr title='Delete the Time'><Button className='del' onClick={() => this.props.deleteTime(item)}><i className='fa fa-trash fas' /></Button></abbr>
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


const mapStateToProps = ({ time, fetch, auth }) => {
    return {
        fetching: fetch.fetching,
        times: time.times,
        profile: auth.profile
    }
}

export default connect(mapStateToProps, { fetchTimes, deleteTime })(TimesList);