import React, { Component, Fragment } from 'react';
import { getLawyer} from '../../../actions/lawyer.action.js';
import { Button ,FormGroup ,Input} from 'reactstrap'
import { connect } from 'react-redux';
import { apiBook } from '../../../api/book.api.js';
import AddReview from '../rate/addReview.com.js';
import HeaderSearch from '../book_search_header/bookHeader.com.js';
import lm from './lawm.png';
import './lawyerPage.style.css';

class LawyerPage extends Component {
    componentDidMount() {
        const { getLawyer } = this.props;
        const { id } = this.props.match.params;
        getLawyer(id);
    }
    constructor(props) {
        super(props);
        this.state = { value: 0 };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit() {
        const { isAuth } = this.props;
        if (isAuth) {
            apiBook(this.state.value)
            console.log('slected time ', this.state.value)
        } else {
            console.log('you are not auth')
            const data = { lawyer_id: this.props.match.params.id, time_id: this.state.value }
            this.props.history.push({
                pathname: '/login_book',
                search: '?query=abc',
                state: { detail: data }
            });
        }

    }
    checkAuthForReview() {
        const { isAuth } = this.props
        const lawyer_id = this.props.match.params.id;
        if (isAuth) {
            return (
                <AddReview id={lawyer_id} />
            )
        }
        return (
            <></>
        )
    }
    render() {
        const { lawyer, times, rates } = this.props;
        return (
            <div className='lawyerPage'>
                 <HeaderSearch />
                <div className=''>
                   
                    <div className='lawyer'>

                        <div className='lawyerInfo sec'>
                            <div className='img'>
                                <img src={lm} alt='lawyer-img' />
                            </div>
                            <div className='info' >
                                <p className='degName' to={'/lawyerpage/' + lawyer._id}>{lawyer.gender} <span className='name'>{lawyer.userName}</span></p>
                                <p>{lawyer.address} , {lawyer.city} ,{lawyer.state}</p>
                                <p>Speciality in:{lawyer.spec}</p>

                            </div>
                        </div>

                        <div className='lawyerAbout sec'>
                            <h3>bout Lawyer</h3>
                            <p>{lawyer.summary}</p>
                        </div>
                        <div className='lawyerReview sec'>
                            <h3>Lawyer Rates</h3>
                            {this.checkAuthForReview()}
                            {rates.map(rate => (
                                <Fragment key={rate._id} >
                                    <p>{rate.comment}</p>
                                    <p>{rate.stars}</p>
                                    <hr />
                                </Fragment>
                            ))}
                        </div>

                    </div>

                    <div className='lawyerBook'>
                        <h2>Book Now</h2>
                        <form>
                            
                                <FormGroup>
                                    <Input  type="select" name="select" onChange={this.handleChange}>
                                        
                                        <option disabled selected>Select Time</option>
                                        {times.map(onetime => (
                                            <Fragment key={Math.random()}>
                                                <option value={onetime._id}>{onetime.time}</option>
                                            </Fragment>
                                        ))}
                                    </Input>
                                </FormGroup>
                                <Button onClick={this.handleSubmit}>Book</Button>
                          
                        </form>

                    </div>


                </div>
            </div>
        )
    }
}
const mapStateToProps = ({ lawyer , auth,fetch ,time ,rate}) => {
    return {
        fetching: fetch.fetching,
        lawyer: lawyer.lawyer,
        times: time.times,
        rates: rate.rates,
        isAuth: auth.isAuth,

    }
}

export default connect(mapStateToProps, { getLawyer})(LawyerPage);