import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup } from 'reactstrap';
import moment from 'moment';
import lm from '../../../images/lawm.png';
import StarCom from '../stars/star.com.js';
import { getRate } from '../../../actions/rate.action.js';
import { upgradeUser } from '../../../actions/auth.actions.js';
import UpdateLawyer from './updateLawyer.com';
import UploadImg from './uploadImg.com';
import UpdateStudent from './updateStudent.com';
import UpdateUser from './updateUser.com';
import Upgrade from './checkUpgrade.com';


class Profile extends Component {
    /*componentDidMount() {
        const { getRate, profile } = this.props
        getRate(profile._id)
    }*/

    renderInfo = () => {
        const { profile } = this.props
        if (profile.type === 1) {
            return (
                <Fragment>
                    <UpdateUser />

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
        } else if (profile.type === 2) {
            const { stars } = this.props
            return (
                <Fragment>

                    <div className='item'>
                        <h3 className='itemHeader'>Personal Info</h3>
                        <div className='bodyImgSec'>
                            <img src={profile.img ? require(`../../../images/${profile.img.filename}`) : lm} className='bodyImg' alt='lawyer-img' />

                        </div>
                        <div className='itemBody bodyInfoSec' >
                            <pre className='desc'>Name :{profile.userName}</pre>
                            {/* <pre className='bodyStar'><StarCom stars={stars} /></pre>  */}
                            <pre className='desc'><i className="fa fa-map-marker-alt" />  :</pre>
                            <span className='bodyPara txt'>{profile.address} , {profile.city} ,{profile.state}</span>
                            <pre className='desc'><i className="fa fa-gavel" />  :<span className='bodyPara'>{profile.spec}</span></pre>
                            <pre className='bodyPara'>Gender :{profile.gender} , Age  :{profile.age}</pre>
                            <hr />
                            <ButtonGroup>
                                <UploadImg />
                                <UpdateLawyer />
                            </ButtonGroup>
                        </div>



                    </div>

                    <div className='item'>
                        <h3 className='itemHeader'>Main Info</h3>
                        <div className='itemBody'>
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
        } else if (profile.type === 3) {
            return (
                <Fragment>

                    <div className='item'>
                        <h3 className='itemHeader'>Personal Info</h3>
                        <div className='bodyImgSec'>
                            <img src={profile.img ? require(`../../../images/${profile.img.filename}`) : lm} className='bodyImg' alt='lawyer-img' />
                        </div>
                        <div className='itemBody bodyInfoSec' >
                        <pre className='desc'>name    : {profile.userName}</pre>
                            <pre className='bodyPara'>email     : {profile.email}</pre>
                            <pre className='bodyPara'>mobile    : 0{profile.mobile}</pre>
                            <pre className='bodyPara'>adderss   : {profile.address}</pre>
                            <pre className='bodyPara'>city      : {profile.city}</pre>
                            <pre className='bodyPara'>state     : {profile.state}</pre>
                            <pre className='bodyPara'>joined    :{moment(profile.joined).format(' DD-MM-YYYY  dddd')}</pre>
                            <hr />
                            <ButtonGroup>
                                <UploadImg />
                                <UpdateStudent />
                                <Upgrade />
                            </ButtonGroup>
                        </div>
                    </div>

                    
                    <div className='item'>
                        <h3 className='itemHeader'>Main Info</h3>
                        <div className='itemBody'>
                        <pre className='bodyPara'>uni       : {profile.uni}</pre>
                            <pre className='bodyPara'>level     : {profile.level}</pre>
                            <pre className='bodyPara'>Gpa       : {profile.gpa}</pre>
                            <pre className='bodyPara'>gender    : {profile.gender}</pre>
                            <pre className='bodyPara'>age       : {profile.age}</pre>
                            <pre className='bodyPara'>degree    : Student</pre>
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
const mapStateTpProps = ({ auth, star }) => {
    return {
        profile: auth.profile,
        stars: star.stars
    }
}
export default connect(mapStateTpProps, { getRate, upgradeUser })(Profile);