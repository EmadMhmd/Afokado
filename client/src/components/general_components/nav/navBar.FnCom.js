import React, {  useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoImg from '../../../images/all white.png';
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
    Badge,
} from 'reactstrap';
import lm from '../../../images/lawm.png';


const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);


    const renderLinks = () => {
        const { isAuth, profile, booksCount, applicationsCount, BookDeletesCount, AppDeletesCount, rejectsCount, acceptsCount, tasksCount, logUserOut ,StuTasksCount} = props;
        if (isAuth) {
            if (profile.type === 1) {
                return (
                    <div>
                        <Navbar className='nav' light expand="md">
                        <NavbarBrand className='logo'> <NavLink className="title" to='/'><img alt='Logo_Img' src={LogoImg}/></NavLink></NavbarBrand>
                            <NavbarToggler onClick={toggle} />
                            <Collapse isOpen={isOpen} navbar>
                                <Nav className="mr-auto" navbar>
                                    <NavItem>
                                        <NavLink className='navLink' to='/my_books'>My Books</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="navLink" to='/user_cases'>My Cases</NavLink>
                                    </NavItem>
                                    
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle caret className='dropLink' >
                                            profile
                                        </DropdownToggle>
                                        <DropdownMenu right className='navLink'>
                                            <DropdownItem >
                                                <NavItem><NavLink to="/profile">profile</NavLink></NavItem>
                                            </DropdownItem>
                                            <DropdownItem  />
                                            <DropdownItem>
                                                <NavItem onClick={() => logUserOut()}><p >Logout</p></NavItem>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                            </Collapse>
                        </Navbar>

                    </div>
                )
            } else if (profile.type === 2) {
                return (
                    <div>
                        <Navbar className='nav' light expand="xl">
                            <NavbarBrand className='logo'> <NavLink className="title" to='/'><img alt='Logo_Img' src={LogoImg}/></NavLink></NavbarBrand>
                            <NavbarToggler onClick={toggle} />
                            <Collapse isOpen={isOpen} navbar>
                                <Nav className="mr-auto" navbar>

                                    <UncontrolledDropdown nav inNavbar>

                                        <DropdownToggle caret className='dropLink'>Manager</DropdownToggle>

                                        <DropdownMenu right className='navLink'>
                                            <DropdownItem>
                                                <NavLink to="/">Cases</NavLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavLink to="/times">Times</NavLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavLink to="/office">Office</NavLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavLink to="/agenda">My Tasks</NavLink>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <NavLink to="/offer">Offer</NavLink>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
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
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle caret className='dropLink' >
                                            <img style={{width:'35px' ,height:'35px', marginLeft:'0' ,border:'none' , marginRight:'5px'}}  src={profile.img ? require(`../../../images/${profile.img.filename}`) : lm} className='bodyImg' alt='lawyer-img' /> 
                                        </DropdownToggle>
                                        <DropdownMenu right className='navLink'>
                                            <DropdownItem >
                                                <NavItem><NavLink to="/profile">profile</NavLink></NavItem>
                                            </DropdownItem>
                                            <DropdownItem  />
                                            <DropdownItem>
                                                <NavItem onClick={() => logUserOut()}><p >Logout</p></NavItem>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>





                            </Collapse>
                        </Navbar>

                    </div>
                )
            } else if (profile.type === 3) {
                return (
                    <div>
                        <Navbar className='nav' light expand="md">
                        <NavbarBrand className='logo'> <NavLink className="title" to='/'><img alt='Logo_Img' src={LogoImg}/></NavLink></NavbarBrand>
                            <NavbarToggler onClick={toggle} />
                            <Collapse isOpen={isOpen} navbar>
                                <Nav className="mr-auto" navbar>
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
                                        <NavLink className='navLink' to="/my_tasks">Agenda <Badge color="secondary"> {StuTasksCount} </Badge></NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle caret className='dropLink' >
                                            <img style={{width:'35px' ,height:'35px', marginLeft:'0' ,border:'none' , marginRight:'5px'}} src={profile.img ? require(`../../../images/${profile.img.filename}`) : lm} className='bodyImg' alt='lawyer-img' />
                                            profile
                                        </DropdownToggle>
                                        <DropdownMenu right className='navLink'>
                                            <DropdownItem >
                                                <NavItem><NavLink to="/profile">profile</NavLink></NavItem>
                                            </DropdownItem>
                                            <DropdownItem  />
                                            <DropdownItem>
                                                <NavItem onClick={() => logUserOut()}><p >Logout</p></NavItem>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>

                            </Collapse>
                        </Navbar>

                    </div>
                )
            }
        } else {
            return (
                <div>
                    <Navbar className='nav' light expand="lg">
                    <NavbarBrand className='logo'> <NavLink className="title" to='/'><img alt='Logo_Img' src={LogoImg}/></NavLink></NavbarBrand>
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
const mapStateToProps = ({ auth, book, internship, stuNotify, lawNotify }) => {
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
        StuTasksCount: stuNotify.tasksCount,
        tasksCount: lawNotify.tasksCount
    }

}
export default connect(mapStateToProps, { logUserOut })(NavBar);