import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { } from '../../../actions/auth.actions.js';
import {apiForgetPassword } from '../../../api/auth.api.js';


class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }
    _handleFormSubmit = (values, bag) => {
        if (values) {
            apiForgetPassword(values);
            this.toggle();
            this.bag = bag;
        }
        else {
            bag.isSubmitting(false)
        }
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }
    render() {
        return (
            <div>
                <Button className='mainBtn btnN' onClick={this.toggle}  >Forget Password ?</Button>  
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Forget Password</ModalHeader>
                    <ModalBody>
                            <div>
                                <h3 className='formHeader'>Reset Password With Email</h3>
                                <Formik
                                    initialValues={{ email:'' }}
                                    validationSchema={Yup.object().shape({
                                        email: Yup.string().email().required(),
                                      
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
                                                <FormGroup>
                                                    <Label>Email</Label>
                                                    <Input
                                                        placeholder="Type your email"
                                                        invalid={errors.email && touched.email && errors.email}
                                                        type="email"
                                                        name="email"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.email}
                                                    />
                                                    {errors.email && touched.email ? (<FormFeedback>{errors.email}</FormFeedback>) : null}
                                                </FormGroup >
                                                <ModalFooter>
                                                    <Button className='modelBtn' type="submit" disabled={isSubmitting || !isValid} onClick={handleSubmit}>
                                                        Send mail
                                            </Button>
                                                    <Button className='modelBtn' color="secondary" onClick={this.toggle}>Cancel</Button>
                                                </ModalFooter>
                                            </div>
                                        )}

                                </Formik>
                            </div>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}

export default connect(null, {  })(ForgetPassword);