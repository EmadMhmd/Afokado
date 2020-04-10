import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddReview from './addReview.com.js';
import { FetchRates } from '../../../actions/rate.action.js';

//delete
class Rate extends Component {
    renderRates = () => {
        const { rates } = this.props;
        return (
            <div>
                <h2>Lawyer Rates</h2>
                <AddReview />
                {rates.map(rate => (
                    <div key={rate._id} >
                        <p>{rate.comment}</p>
                        <p>{rate.stars}</p>
                    </div>
                ))}
            </div>
        )

    }
    render() {

        return (

            <div>
                {this.renderRates()}
            </div>
        )
    }
}


const mapStateToProps = ({ rate }) => {
    return {
        rates: rate.rates
    }
}
export default connect(mapStateToProps)(Rate);