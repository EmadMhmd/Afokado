import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logUserOut } from '../../../actions/auth.actions.js';
import {Badge} from 'reactstrap';

import './nav.com.css';


//Delete it
class NavBar extends Component {
    out() {
        this.props.logUserOut()
        this.props.history.push('/')
    }
    share() {
        const { logUserOut } = this.props;
        return (
            <Fragment>
                <NavLink className="link" to='/profile'>Profile</NavLink>
                <p className="link" onClick={() => logUserOut()}>Logout</p>
            </Fragment>
        )
    }
    _renderLinks() {
        const { isAuth, profile, booksCount, applicationsCount, BookDeletesCount, AppDeletesCount, rejectsCount, acceptsCount } = this.props;
        if (isAuth) {
            if (profile.type === 1) {
                return (
                    <div>

                        <NavLink className="link" to='/my_books'>My Books</NavLink>
                        <NavLink className="link" to='/user_cases'>My Cases</NavLink>
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
                            Books
                           <Badge color="danger"> {BookDeletesCount} </Badge>
                            <Badge color="secondary"> {booksCount} </Badge>
                        </NavLink>
                        <NavLink className="link" to='/app_requests'>
                            Applications
                           <Badge color="danger"> {AppDeletesCount} </Badge>
                            <Badge color="secondary"> {applicationsCount} </Badge>
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
                        <NavLink className="link" to='/my_app'>
                            My App
                            <Badge color="danger"> {rejectsCount} </Badge>
                            <Badge color="secondary"> {acceptsCount} </Badge>
                        </NavLink>
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
const mapStateToProps = ({ auth, book, internship, notify }) => {
    return {
        isAuth: auth.isAuth,
        profile: auth.profile,
        internships: internship.internships,
        booksCount: notify.booksCount,
        BookDeletesCount: notify.BookDeletesCount,
        applicationsCount: notify.applicationsCount,
        AppDeletesCount: notify.AppDeletesCount,
        rejectsCount: notify.rejectsCount,
        acceptsCount: notify.acceptsCount
    }
}
export default connect(mapStateToProps, { logUserOut })(NavBar);