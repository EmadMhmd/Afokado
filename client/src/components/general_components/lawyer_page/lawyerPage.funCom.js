import React, { useEffect, useState, useRef, useLayoutEffect ,useCallback} from 'react';
import { getLawyer } from '../../../actions/lawyer.action.js';
import { Button, FormGroup, Input, Row, Col } from 'reactstrap'
import { connect } from 'react-redux';
import { book } from '../../../actions/book.action';
import AddReview from '../rate/addReview.com.js';
import HeaderSearch from '../book_search_header/bookHeader.com.js';
import moment from 'moment';
import lm from '../../../images/lawm.png';
import StarCom from '../stars/star.com.js';

const LawyerPage = (props) => {
    const [rateing, setRateing] = useState(0)
    const [time, setTime] = useState('')
    //const rateRef=useRef()
    //
    useEffect(() => {
        const { getLawyer } = props;
        const { id } = props.match.params;
        getLawyer(id)
        setRateing(0)
    }, [])

    

    const rateCal = () => {
        const { rates } = props;
        var one, two, three, four, five, total = 0
        five = rates.reduce((total, rate, i, a) => {
            if (rate.stars === 5) {
                total += 1
            }
            return total
        }, 0);
        four = rates.reduce((total, rate, i, a) => {
            if (rate.stars === 4) {
                total += 1
            }

            return total

        }, 0);
        three = rates.reduce((total, rate, i, a) => {
            if (rate.stars === 3) {
                total += 1
            }

            return total

        }, 0);
        two = rates.reduce((total, rate, i, a) => {
            if (rate.stars === 2) {
                total += 1
            }

            return total

        }, 0)
        one = rates.reduce((total, rate, i, a) => {
            if (rate.stars === 1) {
                total += 1
            }

            return total

        }, 0);

        total = (one + 2 * two + 3 * three + 4 * four + 5 * five) / (one + two + three + four + five)
        console.log('rates in order', one, two, three, four, five, total, rates.length)
        setRateing(total)
    }
    //useLayoutEffect(() =>rateCal(), [])
    const handleChange = (event) => {
        setTime(event.target.value);
    }
    const handleSubmit = () => {
        const { isAuth, book } = props;
        if (isAuth) {
            book(time).then(() => props.history.push('/my_books'))
        } else {
            const data = { lawyer_id: props.match.params.id }
            props.history.push({
                pathname: '/book_sign',
                search: '?query=abc',
                state: { detail: data }
            });
        }
    }
    const checkAuthForReview = () => {
        const { isAuth } = props
        const lawyer_id = props.match.params.id;
        if (isAuth) {
            return (
                <AddReview id={lawyer_id} />
            )
        }
        return (
            <></>
        )
    }
    const renderBio = (bio) => {
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

    const { lawyer, times, rates, star } = props;
    
    return (
        <div className='bg items'>
            <HeaderSearch />
            <div className='listConatiner'>


                <div className='item'>
                    <h3 className='itemHeader'>Book Now</h3>
                    <Row >
                        <Col md={8}>
                            <FormGroup>
                                <Input  style={{ marginLeft: '10px' }}  type="select" name="select" onChange={handleChange} >
                                    <option>Select Time</option>
                                    {times.map(onetime => (
                                        <option key={onetime._id} value={onetime._id}> {moment(onetime.time).format(' DD-MM-YYYY  dddd')}</option>
                                    ))}

                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <Button style={{ marginTop: '0' }} className='mainBtn btnN' onClick={handleSubmit}>Book</Button>
                        </Col>
                    </Row>
                </div>


                <div className='item'>
                    <h3 className='itemHeader'>{lawyer.userName}</h3>
                    <div className='bodyImgSec'>
                        <img src={lm} className='bodyImg' alt='lawyer-img' />
                    </div>
                    <div className='itemBody bodyInfoSec' >
                        {/* <pre className='bodyStar'><StarCom stars={rateing} /></pre> */}
                        <pre className='desc'><i className="fa fa-map-marker-alt" />  :</pre>
                        <p className='bodyPara txt'>{lawyer.address} , {lawyer.city} ,{lawyer.state}</p>
                        <pre className='desc'><i className="fa fa-gavel" />  :<span className='txt'>{lawyer.spec}</span></pre>
                        <pre className='bodyPara'>Gender :{lawyer.gender} , Age  :{lawyer.age}</pre>
                        <pre className='bodyPara'></pre>
                    </div>

                </div>


                {renderBio(lawyer.bio)}

                <div className='item' >
                    <h3 className='itemHeader'>Lawyer Rates</h3>
                    {checkAuthForReview()}
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