import React, { useEffect, useState } from 'react';
import { Button, FormGroup, Input, Row, Col } from 'reactstrap'
import { connect } from 'react-redux';
import { book } from '../../../actions/book.action';
import AddReview from '../rate/addReview.com.js';
import HeaderSearch from '../book_search_header/bookHeader.com.js';
import moment from 'moment';
import StarCom from '../stars/star.com.js';
import { apiGetLawyer } from '../../../api/lawyer.api';
import { apiFetchRates } from '../../../api/rate.api';
import { apiFetchTimes } from '../../../api/times.api';
import lm from '../../../images/lawm.png';


const LawyerPage = (props) => {
    const [rateing, setRateing] = useState(0)
    const [time, setTime] = useState('')
    const [times, setTimes] = useState([])
    const [lawyer, setLawyer] = useState({})
    const [rates, setRates] = useState([])

    useEffect( async () => {
        const { id } = props.match.params;
        const { data: { lawyers } } = await apiGetLawyer(id)
        const { data: { rates } } = await apiFetchRates(id)
        const { data: { times } } = await apiFetchTimes(id)
        setLawyer(lawyers)
        setTimes(times)
        setRates(rates)
       
    }, [])


    const rateCal = () => {
        
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
        const renderImg=()=>{
        const { img } = lawyer
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



    return (
        <div className='bg items'>
            <HeaderSearch />
            <div className='listConatiner'>


                <div className='item'>
                    <h3 className='itemHeader'>Book Now</h3>
                    <Row >
                        <Col md={8}>
                            <FormGroup>
                                <Input style={{ marginLeft: '10px' }} type="select" name="select" onChange={handleChange} >
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
                    {renderImg()}
                    <div className='itemBody bodyInfoSec' >
                        {/* <pre className='bodyStar'><StarCom stars={rateing} /></pre>  */}
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
const mapStateToProps = ({ auth, fetch }) => {
    return {
        fetching: fetch.fetching,
        isAuth: auth.isAuth,

    }
}

export default connect(mapStateToProps, { book })(LawyerPage);