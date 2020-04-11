import React , {Component} from  'react';
import {connect} from 'react-redux';
import {fetchApplications ,deleteApplication ,updateApplication} from '../../../actions/apply.action.js';
import { Button } from 'reactstrap';
import EmptyMessage from '../../general_components/empty.com.js';

class MyApp extends Component{
    componentDidMount(){
        const {fetchApplications } =this.props;
        fetchApplications()
    }
    emptyCase(){
        const { applications } = this.props
        const data='application'
        if(applications.length===0){
            return (
                <EmptyMessage data={data} />
            )
        }
    } 
    render(){
        const {applications}=this.props;
        return(
            <div>
                <h3>My Applications</h3>
                {this.emptyCase()}
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