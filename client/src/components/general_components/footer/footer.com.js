import React , {Component , Fragment} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import LogoImg from '../../../images/all white.png';
import './footer.com.css';

class Footer extends Component{
    renderSecondSection(){
        const {profile:{type}}=this.props
        if(type === 2 || type === 3 ){
            return (
                <Fragment>
                    <div className='footer-search'>
                            <p>Apply</p>
                            <NavLink className='link' to='/intern_list'>Internship</NavLink>
                            <NavLink className='link' to='/jobs_list'>Job</NavLink>
                            <NavLink className='link' to='/my_app'>My Application</NavLink>
                        </div>
                </Fragment>
                ) 
        }else{
            return (
                <Fragment>
                    <div className='footer-search'>
                            <p>Search By</p>
                            <NavLink className='link' to='/list'>Specialties</NavLink>
                            <NavLink className='link' to='/lsit'>Area</NavLink>
                            <NavLink className='link' to='/list'>Name</NavLink>
                        </div>
                </Fragment>
            )
        }
    }
    render(){
        return(
            <div className='footer'>
                <div className='about'>
                    <NavLink className="title" to='/'><img alt='logo_image' className='foot_img' src={LogoImg}/></NavLink>
                    <div className='links'>
                        <NavLink className='link' to='/contact'>Contact Us</NavLink>
                        <NavLink className='link' to='/about'>About US</NavLink>
                        <NavLink className='link' to='/our_team'>Our Team</NavLink> 
                    </div>
                </div>
                {this.renderSecondSection()}
            </div>
        )
    }
}
const mapStateToProps=({auth})=>{
    return{
        isAuth: auth.isAuth,
        profile: auth.profile,
    }
}
export default connect(mapStateToProps)(Footer);