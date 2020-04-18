import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';
import {fetchApplicationRequests , rejectApplication ,acceptApplication} from '../../../actions/apply.action.js';
import EmptyMessage from '../../general_components/empty.com.js';
import Spinner from '../../general_components/spinner_com/spinner.com.js';

class AppRequests extends Component{
    componentDidMount(){
        const {fetchApplicationRequests}=this.props;
        fetchApplicationRequests()
    }
    emptyCase(){
        const { applications } = this.props
        const message=`great! you haven't any apply notification !?`
        if(applications.length===0){
            return (
                <EmptyMessage message={message} />
            )
        }
    } 
    render(){
        const {applications,fetching , rejectApplication ,acceptApplication}=this.props;
        if (fetching) {
            return <Spinner size={50} />
        }
        return(
            <div>
                <h2>Applications Requests</h2>
                {this.emptyCase()}
                { applications.map(app=>(
                    <div key={app._id}>
                        <p>{app.no}</p>
                        <Button onClick={()=>rejectApplication(app._id)}>Reject</Button>
                        <Button onClick={()=>acceptApplication(app._id)}>Accept</Button>
                    </div>
                ) )}
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
export default connect(mapStateToProps,{fetchApplicationRequests , rejectApplication ,acceptApplication})(AppRequests);