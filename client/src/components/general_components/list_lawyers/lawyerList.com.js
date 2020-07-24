import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchLawyers } from '../../../actions/lawyer.action';
import Spinner from '../spinner_com/spinner.com.js';
import HeaderSearch from '../book_search_header/bookHeader.com';
import { Link } from 'react-router-dom';
import EmptyMessage from '../../general_components/empty.com.js';
import { Button } from 'reactstrap';
import lm from '../../../images/lawm.png';

class LawyerList extends Component {
    emptyCase() {
        const { lawyers } = this.props
        const message = `oops!! Your search don't match any lawyer , Please search again `
        if (lawyers.length === 0) {
            return (
                <EmptyMessage message={message} />
            )
        }
    }
    componentDidMount() {
        document.title = 'Afokado | Lawyers List'
    }
    dataRender() {
        const { fetching, lawyers } = this.props
        if (fetching) {
            return <Spinner size={70} />
        } else {
            return (
                <Fragment>
                    <h3 className='header' style={{ width: '320px' }}>
                            <span className=''> Matching </span>
                            <span> {lawyers.length} </span>
                            Lawyer
                    </h3>
                    {lawyers.map((item) => (
                        <div className='item' key={item._id}>
                            <h3 className='itemHeader'>{item.userName}</h3>
                            <div className='bodyImgSec'>
                                <img src={item.img ? require(`../../../images/${item.img.filename}`) : lm} className='bodyImg' alt='lawyer-img' />
                            </div>
                            <div className='itemBody bodyInfoSec' >
                                <pre className='desc'><i className="fa fa-map-marker-alt" />  :</pre>
                                <p className='bodyPara txt'>{item.address} , {item.city} ,{item.state}</p>
                                <pre className='desc'><i className="fa fa-gavel" />  :<span className='bodyPara'>{item.spec}</span></pre>
                                <pre className='bodyPara'>Gender : {item.gender} , Age  : {item.age}</pre>
                                <pre className='bodyPara'></pre>
                                <hr />
                                <Button className='mainBtn btnN btnT'><Link className='btnLink' to={'/lawyerpage/' + item._id}>Book</Link></Button>

                            </div>
                        </div>
                    ))}
                </Fragment>
            )
        }
    }
    render() {
        return (
            <div>
                <div className="items bg">
                    <HeaderSearch />
                    <div className='listConatiner'>
                        {this.dataRender()}
                    </div>
                </div>
                {this.emptyCase()}
            </div>
        )
    }
}

const mapStateToProps = ({ lawyer, fetch }) => {
    return {

        lawyers: lawyer.lawyers,
        fetching: fetch.fetching
    }
}
export default connect(mapStateToProps, { fetchLawyers })(LawyerList);