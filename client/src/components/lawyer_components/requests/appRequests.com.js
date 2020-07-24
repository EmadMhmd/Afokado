import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { fetchInternshipsForLawyer } from '../../../actions/internalship.action.js';
import { Badge ,Button} from 'reactstrap';
import EmptyMessage from '../../general_components/empty.com.js';
import Spinner from '../../general_components/spinner_com/spinner.com.js';

class AppRequests extends Component {
    componentDidMount() {
        const { fetchInternshipsForLawyer } = this.props;
        fetchInternshipsForLawyer()
        document.title='AFokado | App Requests'
    }
    emptyCase() {
        const { internships } = this.props
        const message = `oops !! There no offer late  !?`
        if (internships.length === 0) {
            return (
                <EmptyMessage message={message} />
            )
        }
    }
    render() {
        const { internships, fetching } = this.props;
        if (fetching) {
            return <Spinner size={50} />
        }
        return (
            <div>
                <div className='bg items'>
                    <div className='listConatiner'>

                        <div cleas='headBar'>
                            <h3 className='header'>App Requests</h3>
                        </div>

                        {internships.map(intern => (
                            <div key={intern._id} className='item'>
                                <div className='itemBody'>
                                    
                                    {intern.job===1 ? <pre className='bodyPara'> Job   : {intern.title}</pre> : <pre className='bodyPara'> Internship   : {intern.title}</pre>}
                                    <p className="delN bodyPara" style={{borderRadius:'0' , border:'none'}} to='/book_requests'>
                                        Count <Badge color="secondary"> {intern.appCount} </Badge>
                                    </p>
                                    <hr/>
                                    <Button className='mainBtn btnN'><Link className='btnLink' to={'/applications/' + intern._id}>All Applications</Link></Button>
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



const mapStateToProps = ({ internship, fetch }) => {
    return {
        fetching: fetch.fetching,
        internships: internship.internships
    }
}
export default connect(mapStateToProps, { fetchInternshipsForLawyer })(AppRequests);