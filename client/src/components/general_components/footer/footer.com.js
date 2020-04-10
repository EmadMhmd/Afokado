import React , {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './footer.com.css';

class Footer extends Component{
    render(){
        return(
            <div className='footer'>
                <div className='about'>
                    <NavLink className='title' to='/'>Afo<span>kado</span></NavLink>
                    <div className='links'>
                        <NavLink className='link' to='/conatct'>Contact Us</NavLink>
                        <NavLink className='link' to='/about'>About US</NavLink>
                        <NavLink className='link' to='/team'>Our Team</NavLink>
                    </div>
                    
                </div>
                <div className='footer-search'>
                    <p>Search By</p>
                    <NavLink className='link' to=''>Specialties</NavLink>
                    <NavLink className='link' to=''>Area</NavLink>
                    <NavLink className='link' to=''>Name</NavLink>
                </div>
            </div>
        )
    }
}
export default Footer;