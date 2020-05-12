import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { bookWithSign } from '../../../actions/book.action.js';

class DirectBookWithSign extends Component {
    _handleFormSubmit = (values, bag) => {
        if (values) {
            const user={...values ,type:1}
            const { bookWithSign } = this.props;
            const id = this.props.location.state.detail.time_id
            bookWithSign(user, id).then(()=>this.props.history.push('/my_books'))
            
            
        }
        else {
            bag.isSubmitting(false)
        }
    }
    render() {
        return (
            <div className='bg'>
                <div className='container'>
                    <div className='formPage'>
                        <h3 className='formHeader'>Direct Book with SignUp</h3>
                        <Formik
                            initialValues={{ userName: '', email: '', password: '', mobile: '' }}
                            validationSchema={Yup.object().shape({
                                userName: Yup.string().required(),
                                email: Yup.string().email().required(),
                                password: Yup.string().min(6).required(),
                                mobile: Yup.number().min(11).required(),

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
                                    <div>
                                        <FormGroup className='field'>
                                            <Label>User Name</Label>
                                            <Input
                                                placeholder="Enter Your user Name"
                                                invalid={errors.userName && touched.userName && errors.userName}
                                                type="text"
                                                name="userName"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.userName}
                                            />
                                            {errors.userName && touched.userName ? (<FormFeedback>{errors.userName}</FormFeedback>) : null}
                                        </FormGroup >
                                        <FormGroup className='field'>
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
                                        <FormGroup className='field'>
                                            <Label>Mobile Number</Label>
                                            <Input
                                                placeholder="Enter Your Number"
                                                invalid={errors.mobile && touched.mobile && errors.mobile}
                                                type="tel"
                                                name="mobile"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.mobile}
                                            />

                                            {errors.mobile && touched.mobile ? (<FormFeedback>{errors.mobile}</FormFeedback>) : null}
                                        </FormGroup>
                                        <FormGroup className='field'>
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

                                        <Button className='formBtn' type="submit" disabled={isSubmitting || !isValid} onClick={handleSubmit}>
                                            Book
                                        </Button>
                                    </div>
                                )}

                        </Formik>
                        <div >
                            <p className='checkPara'>Already have account in Afokado ?</p>
                            <NavLink to={'/book_login/' + this.props.location.state.detail.time_id}>Direct Book with Login</NavLink>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

export default connect(null, { bookWithSign })(DirectBookWithSign);
