import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup } from 'reactstrap';
import moment from 'moment';
import lm from '../../../images/lawm.png';
import { getRate } from '../../../actions/rate.action.js';
import { upgradeUser } from '../../../actions/auth.actions.js';
import UpdateLawyer from './updateLawyer.com';
import UploadImg from './uploadImg.com';
import UpdateStudent from './updateStudent.com';
import UpdateUser from './updateUser.com';
import Upgrade from './checkUpgrade.com';


class Profile extends Component {
    componentDidMount() {
        document.title='AFokado | My Profile'
    }

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
                            <pre className='bodyParaWithoutUpper'>email     : {profile.email}</pre>
                            <pre className='bodyPara'>mobile    : 0{profile.mobile}</pre>
                        </div>

                    </div>
                </Fragment>
            )
        } else if (profile.type === 2) {
            return (
                <Fragment>

                    <div className='item'>
                        <h3 className='itemHeader'>Personal Info</h3>
                        <div className='bodyImgSec'>
                            <img src={profile.img ? require(`../../../images/${profile.img.filename}`) : lm} className='bodyImg' alt='lawyer-img' />

                        </div>
                        <div className='itemBody bodyInfoSec' >
                            <pre className='desc'>Name : {profile.userName}</pre>
                            <pre className='desc'><i className="fa fa-map-marker-alt" />  :</pre>
                            <p className='bodyPara txt'>{profile.address} , {profile.city} ,{profile.state}</p>
                            <pre className='desc'><i className="fa fa-gavel" />  : <span className='bodyPara'>{profile.spec}</span></pre>
                            <pre className='bodyPara'>Gender : {profile.gender} , Age  : {profile.age}</pre>
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
                            <pre className='bodyParaWithoutUpper'>email     : {profile.email}</pre>
                            <pre className='bodyPara'>mobile    : 0{profile.mobile}</pre>
                            <pre className='bodyPara'>specialty : {profile.spec} | {profile.sspec}</pre>
                            <pre className='bodyPara'>gender    : {profile.gender}</pre>
                            <pre className='bodyPara'>age       : {profile.age}</pre>
                            <pre className='bodyPara'>degree    : Lawyer</pre>
                            <pre className='bodyPara'>joined    :{moment(profile.joined).format(' DD-MM-YYYY  dddd')}</pre>
                            <pre className='bodyPara'>Office Times : from {profile.startTime} To {profile.endTime}</pre>
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
                            <pre className='bodyParaWithoutUpper'>email     : {profile.email}</pre>
                            <pre className='bodyPara'>mobile    : 0{profile.mobile}</pre>
                            <pre className='bodyPara'>adderss   : </pre>
                            <p className='bodyPara txt'>{profile.address} , {profile.city} , {profile.state}</p>
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
                        <pre className='bodyPara'>University       : {profile.uni}</pre>
                            <pre className='bodyPara'>Level     : {profile.level}</pre>
                            <pre className='bodyPara'>GPA       : {profile.gpa}</pre>
                            <pre className='bodyPara'>Gender    : {profile.gender}</pre>
                            <pre className='bodyPara'>Age       : {profile.age}</pre>
                            <pre className='bodyPara'>Degree    : Student</pre>
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