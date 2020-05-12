import React, { Component ,Fragment} from 'react';
import './profile.style.css';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import moment from 'moment';


class Profile extends Component {
    renderInfo = () => {
        const { profile } = this.props
        if (profile.type === 1) {
            return (
                <Fragment>
                    <Button className='add'>Update</Button>
    
                    <div className='item'>
                        <h3 className='itemHeader'>Main Info</h3>
                        <div className='itemBody'>
                            <pre className='desc'>name    : {profile.userName}</pre>
                            <pre className='bodyPara'>email     : {profile.email}</pre>
                            <pre className='bodyPara'>mobile    : 0{profile.mobile}</pre>
                        </div>
    
                    </div>
                </Fragment>
            )
        }else if(profile.type ===2){
            return (
                <Fragment>
                    <Button className='add'>Update</Button>
    
                    <div className='item'>
                        <h3 className='itemHeader'>{profile.userName}</h3>
                        <div className='itemBody'>
                            <pre className='desc'>name    : {profile.userName}</pre>
                            <pre className='bodyPara'>email     : {profile.email}</pre>
                            <pre className='bodyPara'>mobile    : 0{profile.mobile}</pre>
                            <pre className='bodyPara'>spec      : {profile.spec}</pre>
                            <pre className='bodyPara'>spec      : {profile.sspec}</pre>
                            <pre className='bodyPara'>adderss   : {profile.address}</pre>
                            <pre className='bodyPara'>city      : {profile.city}</pre>
                            <pre className='bodyPara'>state     : {profile.state}</pre>
                            <pre className='bodyPara'>gender    : {profile.gender}</pre>
                            <pre className='bodyPara'>age       : {profile.age}</pre>
                            <pre className='bodyPara'>degree    : Lawyer</pre>
                            <pre className='bodyPara'>joined    :{moment(profile.joined).format(' DD-MM-YYYY  dddd')}</pre>
                        </div>
    
                    </div>
                </Fragment>
            )
        }else if(profile.type === 3){
            return (
                <Fragment>
                    <Button className='add'>Update</Button>
    
                    <div className='item'>
                        <h3 className='itemHeader'>{profile.userName}</h3>
                        <div className='itemBody'>
                            <pre className='desc'>name    : {profile.userName}</pre>
                            <pre className='bodyPara'>email     : {profile.email}</pre>
                            <pre className='bodyPara'>mobile    : 0{profile.mobile}</pre>
                            <pre className='bodyPara'>uni       : {profile.uni}</pre>
                            <pre className='bodyPara'>level     : {profile.level}</pre>
                            <pre className='bodyPara'>gender    : {profile.gender}</pre>
                            <pre className='bodyPara'>age       : {profile.age}</pre>
                            <pre className='bodyPara'>degree    : Student</pre>
                            <pre className='bodyPara'>adderss   : {profile.address}</pre>
                            <pre className='bodyPara'>city      : {profile.city}</pre>
                            <pre className='bodyPara'>state     : {profile.state}</pre>
                            <pre className='bodyPara'>joined    :{moment(profile.joined).format(' DD-MM-YYYY  dddd')}</pre>
                        </div>
    
                    </div>
                </Fragment>
            )
        }
    }
    render() {
        return (
            <div className='bg items'>
                <div className='listConatiner'>

                    <h3 className='header'>My Profile</h3>

                     {this.renderInfo()}

                    

                </div>
            </div>
        )
    }
}
const mapStateTpProps = ({ auth }) => {
    return {
        profile: auth.profile
    }
}
export default connect(mapStateTpProps)(Profile);