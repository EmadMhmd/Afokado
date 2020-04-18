import React , {Component} from  'react';
import {connect} from 'react-redux';
import {fetchApplications ,deleteApplication ,updateApplication} from '../../../actions/apply.action.js';
import { Button } from 'reactstrap';
import EmptyMessage from '../../general_components/empty.com.js';
import Spinner from '../../general_components/spinner_com/spinner.com.js';

class MyApp extends Component{
    componentDidMount(){
        const {fetchApplications } =this.props;
        fetchApplications()
    }
    emptyCase(){
        const { applications } = this.props
        const message=`oops! you still don't have any application !?`
        if(applications.length===0){
            return (
                <EmptyMessage message={message} />
            )
        }
    } 
    /*
    chech(type,app){
        if(app.lenght < 0){
            return <h2>{type} Applicatons</h2>
        }
    }
    renderPendingApp(){
        const {applications}=this.props;
        let filterApp;
        return(
            <div>
                {filterApp=applications.filter(app=>app.status==='accept')}
                
                {filterApp.map(app=>(
                <div key={app._id}>
                <p>no : {app.no}</p>
                <p>status : {app.status}</p>
                <Button onClick={()=>this.props.deleteApplication(app._id)}>Cancel</Button>
                <Button onClick={()=>this.props.updateApplication(app._id)}>Confirm</Button>
                </div>
                ))}
            </div>
        )
        
    }
    */
    renderBtns(type , id){
        if(type==='pending'){
            return(
                <div>
                    <Button onClick={()=>this.props.deleteApplication(id)}>Cancel</Button>
                    <Button onClick={()=>this.props.updateApplication(id)}>Confirm</Button>
                </div>
            )
        }else if(type === 'accept'){
            return <Button onClick={()=>this.props.deleteApplication(id)}>Cancel</Button>
        }
        return <></>
    }
    render(){
        const { fetching ,applications}=this.props;
        if (fetching) {
            return <Spinner size={50} />
        }
        
        return(
            <div>
                <h3>My Applications</h3>
                {this.emptyCase()}
                <div>
                    {applications.map(app=>(
                    <div key={app._id}>
                    <p>no : {app.no}</p>
                    <p>status : {app.status}</p>
                    {this.renderBtns(app.status , app._id)}
                    </div>
                    ))}
                </div>
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