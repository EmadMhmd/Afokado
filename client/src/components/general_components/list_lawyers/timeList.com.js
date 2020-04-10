import React, { Component } from 'react';
import { connect } from 'react-redux';

class TimeList extends Component {

    
    
    _renderTimes() {
        const { times } = this.props
        if (times) {
            return (
                <div>
                    {times.map((onetime) => (
                        <div key={onetime._id}>
                            <p>{onetime.time}</p>
                        </div>
                    ))}
                </div>
            )
        }
        else {
            return (
                <></>
            )
        }

    }
    render() {

        return (
            <div>
                {this._renderTimes()}
            </div>
        )
    }
}

const mapStateToProps = ({time }) => {
    return {
        getting: time.fetching,
        times: time.times
    }
}
export default connect(mapStateToProps)(TimeList);