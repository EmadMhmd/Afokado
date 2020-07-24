import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

class Contact extends Component {
    componentDidUpdate() {
        document.title='AFokado | Contact'  
    }
    _handleFormSubmit = (values, bag) => {
       console.log('contact successfully')
    }
    render() {
        return (
            <div className='bg mt'>
                <div className='container'>
                    <div className='formPage'>
                        <h3 className='formHeader'>Contact</h3>
                        <hr />
                        <Formik
                            initialValues={{ email: '', message: '' }}
                            validationSchema={Yup.object().shape({
                                email: Yup.string().email().required(),
                                message: Yup.string().required()
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
                                        <FormGroup>
                                            <Label>massage <span className='star'>*</span></Label>
                                            <Input
                                                placeholder="Type Your message"
                                                invalid={errors.message && touched.message && errors.message}
                                                type="textarea"
                                                name="message"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.message}
                                            />
                                            {errors.message && touched.message ? (<FormFeedback>{errors.message}</FormFeedback>) : null}
                                        </FormGroup>
                                        <Button className='formBtn' type="submit"  disabled={isSubmitting} onClick={handleSubmit || !isValid}>
                                            Contact
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
export default Contact;
