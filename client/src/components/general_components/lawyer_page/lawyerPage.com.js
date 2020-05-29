import React, { Component } from 'react';
import { getLawyer } from '../../../actions/lawyer.action.js';
import { Button, FormGroup, Input, Row, Col } from 'reactstrap'
import { connect } from 'react-redux';
import { book } from '../../../actions/book.action';
import AddReview from '../rate/addReview.com.js';
import HeaderSearch from '../book_search_header/bookHeader.com.js';
import moment from 'moment';
import lm from '../../../images/lawm.png';
import StarCom from '../stars/star.com.js';

class LawyerPage extends Component {


    componentDidMount() {
        const { getLawyer } = this.props;
        const { id } = this.props.match.params;
        getLawyer(id)
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
        const { isAuth, book } = this.props;
        if (isAuth) {
            book(this.state.value).then(() => this.props.history.push('/my_books'))
        } else {
            const data = { lawyer_id: this.props.match.params.id, time_id: this.state.value }
            this.props.history.push({
                pathname: '/book_sign',
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
    renderBio = (bio) => {
        if (bio) {
            return (
                <div className='item'>
                    <h3 className='itemHeader'>About Lawyer</h3>
                    <p>{bio}</p>
                </div>
            )
        }
        return <></>
    }
    renderImg() {
        const { lawyer: { img } } = this.props;
        if(img){
            return (
                <div className='bodyImgSec'>
                    <img src={require(`../../../images/${img.filename}`)} className='bodyImg' alt='lawyer-img' />
                </div>
            )
        }else{
            return (
                <div className='bodyImgSec'>
                    <img src={lm} className='bodyImg' alt='lawyer-img' />
                </div>
            )
        }
        
    }
    render() {
        const { lawyer, times, rates, star } = this.props;
        return (
            <div className='bg items'>
                <HeaderSearch />
                <div className='listConatiner'>


                    <div className='item'>
                        <h3 className='itemHeader'>Book Now</h3>
                        <Row >
                            <Col md={9}>
                                <FormGroup>
                                    <Input style={{ marginLeft: '25px' }} type="select" name="select" onChange={this.handleChange}>
                                        <option>Select Time</option>
                                        {times.map(onetime => (
                                            <option key={onetime._id} value={onetime._id}> {moment(onetime.time).format(' DD-MM-YYYY  dddd')}</option>
                                        ))}

                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <Button style={{ marginTop: '0' }} className='mainBtn btnN' onClick={this.handleSubmit}>Book</Button>
                            </Col>
                        </Row>
                    </div>


                    <div className='item'>
                        <h3 className='itemHeader'>{lawyer.userName}</h3>
                        {this.renderImg()}
                        <div className='itemBody bodyInfoSec' >
                            <pre className='bodyStar'><StarCom stars={lawyer.overall} /></pre>
                            <pre className='desc'><i className="fa fa-map-marker-alt" />  :<span className='txt'>{lawyer.address} , {lawyer.city} ,{lawyer.state}</span></pre>
                            <pre className='desc'><i className="fa fa-gavel" />  :<span className='txt'>{lawyer.spec}</span></pre>
                            <pre className='bodyPara'>Gender :{lawyer.gender} , Age  :{lawyer.age}</pre>
                            <pre className='bodyPara'></pre>
                        </div>

                    </div>


                    {this.renderBio(lawyer.bio)}

                    <div className='item' >
                        <h3 className='itemHeader'>Lawyer Rates</h3>
                        {this.checkAuthForReview()}
                        {rates.map(rate => (
                            <div className='review' key={rate._id} >
                                <pre className='rater'><i className='fa fa-user-circle' />{rate.rater.userName}</pre>
                                <StarCom stars={rate.stars} />
                                <p className='comment'>{rate.comment}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        )
    }
}
const mapStateToProps = ({ lawyer, auth, fetch, time, rate, star }) => {
    return {
        fetching: fetch.fetching,
        lawyer: lawyer.lawyer,
        times: time.times,
        rates: rate.rates,
        isAuth: auth.isAuth,
        star: star.stars
    }
}

export default connect(mapStateToProps, { getLawyer, book })(LawyerPage);