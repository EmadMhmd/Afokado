import React , {Component} from  'react';
import {connect} from 'react-redux';
import {fetchApplications ,deleteApplication ,updateApplication} from '../../../actions/apply.action.js';
import { Button } from 'reactstrap';

class MyApp extends Component{
    componentDidMount(){
        const {fetchApplications } =this.props;
        fetchApplications()
    }
 
    render(){
        const {applications}=this.props;
        return(
            <div>
                <h3>My Books</h3>
                {applications.map(app=>(
                    <div key={app._id}>
                        <p>{app.no}</p>
                        <Button onClick={()=>this.props.deleteApplication(app._id)}>Cancel</Button>
                        <Button onClick={()=>this.props.updateApplication(app._id)}>Confirm</Button>
                    </div>
                ))}
            </div>
        )
    }
}
const mapStateToProps=({apply ,fetch})=>{
    return{
        applications:apply.applications,
        fetching:fetch.fetching
    }
}

export default connect(mapStateToProps,{fetchApplications,deleteApplication,updateApplication})(MyApp);