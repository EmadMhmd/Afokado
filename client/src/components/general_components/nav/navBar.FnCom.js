import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
//import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logUserOut } from '../../../actions/auth.actions.js';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Badge
} from 'reactstrap';


const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const out = () => {
        this.props.logUserOut().then(() => {
            this.props.history.push('/')
        })

    }

    const renderLinks = () => {
        const { isAuth, profile, booksCount, applicationsCount, BookDeletesCount, AppDeletesCount, rejectsCount, acceptsCount , tasksCount, logUserOut } = props;
        if (isAuth) {
            if (profile.type === 1) {
                return (
                    <div>
                        <Navbar className='nav' light expand="md">
                            <NavbarBrand className='logo'> <NavLink className="title" to='/'>Afo<span>kado</span></NavLink></NavbarBrand>
                            <NavbarToggler onClick={toggle} />
                            <Collapse isOpen={isOpen} navbar>
                                <Nav className="mr-auto" navbar>
                                    <NavItem>
                                        <NavLink className='navLink' to='/my_books'>My Books</NavLink>
                                    </NavItem>
                                    <NavItem><NavLink className='navLink' to="/profile">profile</NavLink></NavItem>
                                </Nav>
                                <NavbarText onClick={() => logUserOut()}><p className='navLink'>Logout</p></NavbarText>

                            </Collapse>
                        </Navbar>

                    </div>
                )
            } else if (profile.type === 2) {
                return (
                    <div>
                        <Navbar className='nav' light expand="xl">
                            <NavbarBrand className='logo'> <NavLink className="title" to='/'>Afo<span>kado</span></NavLink></NavbarBrand>
                            <NavbarToggler onClick={toggle} />
                            <Collapse isOpen={isOpen} navbar>
                                <Nav className="mr-auto" navbar>
                                    <NavItem>
                                        <NavLink className='navLink' to="/">My Cases</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className='navLink' to="/office">Office</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className='navLink' to="/internalships">My Internships</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className='navLink' to="/times">Times</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className='navLink' to="/agenda">My Tasks</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className='navLink' to="/book_requests">Books
                                        <Badge color="danger"> {BookDeletesCount} </Badge>
                                            <Badge color="secondary"> {booksCount} </Badge>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className='navLink' to="/app_requests">
                                            Applications
                                            <Badge color="danger"> {AppDeletesCount} </Badge>
                                            <Badge color="secondary"> {applicationsCount} </Badge>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className='navLink' to="/my_tasks">Agenda<Badge color="secondary"> {tasksCount} </Badge></NavLink>
                                    </NavItem>
                                    <NavItem><NavLink className='navLink' to="/profile">profile</NavLink></NavItem>
                                </Nav>
                                <NavbarText onClick={() => logUserOut()}><p className='navLink'>Logout</p></NavbarText>

                            </Collapse>
                        </Navbar>

                    </div>
                )
            } else if (profile.type === 3) {
                return (
                    <div>
                        <Navbar className='nav' light expand="md">
                            <NavbarBrand className='logo'> <NavLink className="title" to='/'>Afo<span>kado</span></NavLink></NavbarBrand>
                            <NavbarToggler onClick={toggle} />
                            <Collapse isOpen={isOpen} navbar>
                                <Nav className="mr-auto" navbar>
                                    <NavItem>
                                        <NavLink className='navLink' to='/'>Apply</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className='navLink' to='/my_app'>
                                            My App
                                            <Badge color="danger"> {rejectsCount} </Badge>
                                            <Badge color="secondary"> {acceptsCount} </Badge>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className='navLink' to="/my_office">Office</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className='navLink' to="/my_tasks">Agenda <Badge color="secondary"> {tasksCount} </Badge></NavLink>
                                    </NavItem>
                                    <NavItem><NavLink className='navLink' to="/profile">profile</NavLink></NavItem>
                                </Nav>
                                <NavbarText onClick={() => logUserOut()}><p className='navLink'>Logout</p></NavbarText>

                            </Collapse>
                        </Navbar>

                    </div>
                )
            }
        } else {
            return (
                <div>
                    <Navbar className='nav' light expand="lg">
                        <NavbarBrand className='logo'> <NavLink className="title" to='/'>Afo<span>kado</span></NavLink></NavbarBrand>
                        <NavbarToggler className='navLink' onClick={toggle} />
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink className='navLink' to='/auth'>Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='navLink' to='/user_signup'>SignUp</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='navLink' to='/lawyer_signup'>Afokado For Lawyer</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className='navLink' to='/student_signup'>| Student</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>

                </div>
            )
        }
    }
    return (
        <div>
            {renderLinks()}
        </div>
    )
}

const mapStateToProps = ({ auth, book, internship, stuNotify , lawNotify }) => {
    return {
        isAuth: auth.isAuth,
        profile: auth.profile,
        internships: internship.internships,
        booksCount: lawNotify.booksCount,
        BookDeletesCount: lawNotify.BookDeletesCount,
        applicationsCount: lawNotify.applicationsCount,
        AppDeletesCount: lawNotify.AppDeletesCount,
        rejectsCount: stuNotify.rejectsCount,
        acceptsCount: stuNotify.acceptsCount,
        tasksCount: stuNotify.tasksCount
    }
}
export default connect(mapStateToProps, { logUserOut })(NavBar);