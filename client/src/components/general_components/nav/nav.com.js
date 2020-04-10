import React, { Component,Fragment} from 'react';
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
      share(){
          const {logUserOut}=this.props;
          return(
            <Fragment>
            <NavLink className="link" to='/profile'>Profile</NavLink>
            <p className="link" onClick={()=>logUserOut()}>Logout</p>
        </Fragment>
          )
      }
    _renderLinks() {
        const { isAuth, profile  ,booksCount ,applicationsCount ,deletesCount} = this.props;
        if (isAuth) {
            if (profile.type === 1) {
                return (
                    <div>
                        
                        <NavLink className="link" to='/my_books'>My Books</NavLink>
                        <NavLink className="link" to='/list'>Book</NavLink>
                        {this.share()}
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
                          <Badge color="dark"> {applicationsCount} </Badge>
                        </NavLink>
                        <NavLink className="link" to='/agenda'>Agenda</NavLink>
                        {this.share()}
                    </div>
                )
            }
            if (profile.type === 3) {
                return (
                    <div>
                        <NavLink className="link" to='/'>Apply</NavLink>
                        <NavLink className="link" to='/my_app'>My App</NavLink>
                        {this.share()}
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
        deletesCount:notify.deletesCount,
        applicationsCount:notify.applicationsCount

    }
}
export default connect(mapStateToProps, { logUserOut })(NavBar);