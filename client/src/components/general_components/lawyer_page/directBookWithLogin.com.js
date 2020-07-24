import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {bookWithLogin } from '../../../actions/book.action.js';
class DirectBookWithLogin extends Component {
    _handleFormSubmit = (values, bag) => {
        if (values) {
            const {bookWithLogin} =this.props;
            const id=this.props.match.params.time_id 
            bookWithLogin(values , id).then(()=>this.props.history.push('/my_books'))
        }
        else {
            bag.isSubmitting(false)
        }
    }
    componentDidMount(){
        document.title='AFokado | Book With Login'
    }
    render() {
        return (
            <div className='bg mt'>
                <div className='container'>
                    <div className='formPage'>
                        <h3 className='formHeader'>Direct Book with Login</h3>
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
                                    <div>
                                        <FormGroup className='field'>
                                            <Label>Email <span className='star'>*</span></Label>
                                            <Input
                                                placeholder="Type Your Email"
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
                                            <Label>Password <span className='star'>*</span></Label>
                                            <Input
                                                placeholder="Type Your password"
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
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(null, { bookWithLogin})(DirectBookWithLogin);
