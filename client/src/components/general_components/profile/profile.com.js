import React ,{Component}  from 'react';
import './profile.style.css';
import {connect} from 'react-redux';



class Profile extends Component{
    render(){
        return(
            <div>
                <h3>{this.props.profile.userName}</h3>
                <p>{this.props.profile.email}</p>
                <p>{this.props.profile.mobile}</p>
                <p>{this.props.profile.spec}</p>
                <p>{this.props.profile.address}</p>
                <p>{this.props.profile.city}</p>
                <p>{this.props.profile.state}</p>
               
            </div>
        )
    }
}
const mapStateTpProps=({auth})=>{
    return{
        profile:auth.profile
    }
}
export default connect(mapStateTpProps)(Profile);