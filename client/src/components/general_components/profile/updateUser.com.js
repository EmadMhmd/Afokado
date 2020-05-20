import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { updateUser } from '../../../actions/auth.actions.js';


class UpdateUser extends Component {
    _handleFormSubmit = (values, bag) => {
        if (values) {
            const { updateUser } = this.props;
            values.type = 1;
            updateUser(values);
            this.toggle();

        }
        else {
            bag.isSubmitting(false)

        }
    }
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }

    
    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    render() {
        const { userName, mobile, email ,password} = this.props.profile;
        return (
            <div>
                <Button className='add' onClick={this.toggle}>Update Student</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Update Student</ModalHeader>
                    <ModalBody>
                        <div>
                            <h3 className='formHeader'>Update Student</h3>
                            <Formik
                                initialValues={{ userName, mobile, email, password }}
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
                                                <Label>Name <span className='star'>*</span></Label>
                                                <Input
                                                    placeholder="Enter Your Name"
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
                                                <Label>Email <span className='star'>*</span></Label>
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
                                                <Label>Mobile Number <span className='star'>*</span></Label>
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
                                                <Label>Password <span className='star'>*</span></Label>
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
                                            <ModalFooter>
                                                <Button className='modelBtn' type="submit" disabled={isSubmitting || !isValid} onClick={handleSubmit}>
                                                    Update
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
const mapStateToProps = ({ auth }) => {
    return {
        profile: auth.profile,
    }
}
export default connect(mapStateToProps, { updateUser })(UpdateUser);