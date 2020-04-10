import React, { Component} from 'react';
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { logUserOut } from '../../../actions/auth.actions.js';
import { Badge} from 'reactstrap';
//import {fetchNotifications} from '../../../actions/notify.action';

import './nav.com.css';

class NavBar extends Component {

    /*componentDidMount(){
        const {fetchNotifications}=this.props;
        fetchNotifications();
    }*/
    out(){
        this.props.logUserOut()
        this.props.history.push('/')
      }
    _renderLinks() {
        const { isAuth, profile ,logUserOut  ,booksCount ,internshipsCount ,deletesCount} = this.props;
        if (isAuth) {
            if (profile.type === 1) {
                return (
                    <div>
                        
                        <NavLink className="link" to='/my_books'>My Books</NavLink>
                        <NavLink className="link" to='/user_profile'>{profile.userName} Profile</NavLink>
                        <NavLink className="link" to='/list'>Book</NavLink>
                        <p className="link">  welcome {profile.userName}</p>
                        <p className="link" onClick={()=>logUserOut()}>Logout</p>
                    </div>
                )
            }
            if (profile.type === 2) {
                
                return (
                    <div>
                        <NavLink className="link" to='/'>My Cases</NavLink>
                        <NavLink className="link" to='/internalships'>My Internalships</NavLink>
                        <NavLink className="link" to='/times'>Times</NavLink>
                        <NavLink className="link" to='/book_requests'>
                           Requests 
                           <Badge color="danger"> {deletesCount} </Badge>
                          <Badge color="secondary"> {booksCount} </Badge>
                        </NavLink>
                        <NavLink className="link" to='/agenda'>Agenda</NavLink>
                        <NavLink className="link" to='/lawyer_profile'>Profile</NavLink>
                        <p className="link" onClick={()=>logUserOut()}>Logout</p>
                    </div>
                )
            }
            if (profile.type === 3) {
                return (
                    <div>
                        <NavLink className="link" to='/apply'>Aplly</NavLink>
                        <NavLink className="link" to='/student_profile'>{profile.userName} Profile</NavLink>
                        <p className="link" onClick={()=>logUserOut()}>Logout</p>
                    </div>
                )
            }

        } else {
            return (
                <div>
                    
                    <NavLink className="link" to='/auth'>Login</NavLink>
                    <NavLink className="link" to='/user_signup'>SignUp</NavLink>
                    <NavLink className="link" to='/lawyer_signup'>Afokado For Lawyer</NavLink>
                    <NavLink className="link" to='/student_signup'>| Student</NavLink>
                    
                </div>
            )
        }
    }
    render() {
        return (
            <div className='nav'>
                <div className='logo'>
                    <NavLink className="title" to='/'>Afo<span>kado</span></NavLink>
                </div>
                <ul className='links'>
                    {this._renderLinks()}
                </ul>
            </div>
        )
    }
}
const mapStateToProps = ({ auth ,book,internship ,notify}) => {
    return {
        isAuth: auth.isAuth,
        profile: auth.profile,
        internships:internship.internships,
        booksCount:notify.booksCount,
        deletesCount:notify.deletesCount

    }
}
export default connect(mapStateToProps, { logUserOut })(NavBar);