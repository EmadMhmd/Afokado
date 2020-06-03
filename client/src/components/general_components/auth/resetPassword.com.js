import React, { Component } from 'react';
import {NavLink , withRouter} from 'react-router-dom';
import { Button, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { apiResetPassword } from '../../../api/auth.api.js';

class ResetPassword extends Component {
    _handleFormSubmit = (values, bag) => {
        apiResetPassword(values ,this.props.match.params.token).then(()=>{ this.props.history.push('/auth') })
        this.bag = bag; 
    }
    render() {
        return (
            <div className='bg mt'>
                <div className='container'>
                    <div className='formPage'>
                        <h3 className='formHeader'>Reset Password</h3>
                        <hr />
                        <Formik
                            initialValues={{ password: '' }}
                            validationSchema={Yup.object().shape({
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
                                            <Label>New Password</Label>
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
                                        <Button className='formBtn' type="submit"  disabled={isSubmitting} onClick={handleSubmit || !isValid}>
                                            Reset
                                        </Button>
                                    </div>
                                )}
                        </Formik>
                    </div>
                </div>
            </div>
        )
    }
}

const LoginWithRouter=withRouter(ResetPassword)
export default LoginWithRouter;
