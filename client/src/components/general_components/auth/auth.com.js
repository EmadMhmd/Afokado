import React, { Component } from 'react';
import {NavLink } from 'react-router-dom';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Formik } from 'formik';
import './auth.com.css';

import * as Yup from 'yup';
import { connect } from 'react-redux';
import { login } from '../../../actions/auth.actions.js';

class LoginPage extends Component {
    componentDidUpdate() {
        const {error} = this.props;
        if (error && this.bag) {
            this.bag.setSubmitting(false);
        }   
    }
    _handleFormSubmit = (values, bag) => {
        this.props.login(values);
        this.bag = bag; 
        this.props.history.push('/')   
    }
    render() {
        return (
            <div className='bg'>
                <div className='container'>
                    <div className='sign'>
                        <h3>Login IN</h3>
                        <hr />
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={Yup.object().shape({
                                email: Yup.string().email().required(),
                                password: Yup.string().min(6).required()
                            })}
                            onSubmit={this._handleFormSubmit.bind(this)}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                                isValid
                            }) => (
                                    <div >
                                        <FormGroup>
                                            <Label>Email</Label>
                                                <Input
                                                    placeholder="Enter Your Email"
                                                    invalid={errors.email && touched.email && errors.email}
                                                    type="email"
                                                    name="email"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.email}
                                                />
                                            {errors.email && touched.email ? (<FormFeedback>{errors.email}</FormFeedback>) : null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Password</Label>
                                            <Input
                                                placeholder="Enter Your password"
                                                invalid={errors.password && touched.password && errors.password}
                                                type="password"
                                                name="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />
                                            {errors.password && touched.password ? (<FormFeedback>{errors.password}</FormFeedback>) : null}
                                        </FormGroup>
                                        <div className='filed'>
                                            <Button type="submit" className='btn' disabled={isSubmitting} onClick={handleSubmit || !isValid}>
                                                Login
                                            </Button>
                                        </div>
                                    </div>
                                )}
                        </Formik>
                        <div className='sign'>
                            <p>Create New Account  in Afokado ?</p>
                            <NavLink to='/user_signup'>SignUp</NavLink>  
                            <br/>
                            <NavLink to='/lawyer_signup'>SignUp As Lawyer</NavLink>  
                            <br/>
                            <NavLink to='/student_signup'>SignUp As student</NavLink>                                                                                                                                      
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = ({ auth ,error}) => {
    return {
        attempting: auth.attempting,
        isAuth: auth.isAuth,
        error:error.err
    }
}
export default connect(mapStateToProps, { login })(LoginPage);
