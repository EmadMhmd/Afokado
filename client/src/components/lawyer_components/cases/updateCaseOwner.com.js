import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { apiCaseOwnerUpdate } from '../../../api/case.api.js';
import {getNewCaseOwner } from '../../../actions/case.action.js';



class AddTimePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }
    _handleFormSubmit = (values, bag ) => {
        this.props.getNewCaseOwner(values);
        this.bag = bag;
    }
    add(owner) {
        const { caseId } = this.props
        apiCaseOwnerUpdate(caseId,owner)
        this.toggle()
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }
    render() {
        return (
            <div>
                <Button className='mainBtn' onClick={this.toggle}  >Update Case Owner</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Update Case Owner</ModalHeader>
                    <ModalBody>
                        <div>
                            <h3 className='formHeader'>Search with email or mobile or both</h3>
                            <Formik
                                initialValues={{ email: '', mobile: '' }}
                                validationSchema={Yup.object().shape({
                                    email: Yup.string(),
                                    mobile: Yup.number().min(11)
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
                                                <Label className='label'>Mobile Number</Label>
                                                <Input
                                                    className='input'
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
                                            <FormGroup >
                                                <Label >Email</Label>
                                                <Input
                                                    className='input'
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
                                            <ModalFooter>
                                                <Button className='modelBtn' type="submit" disabled={isSubmitting || !isValid} onClick={handleSubmit}>
                                                    search
                                            </Button>
                                                <Button className='modelBtn' color="secondary" onClick={this.toggle}>Cancel</Button>
                                            </ModalFooter>


                                            <div className='bg items'>
                                                {this.props.owners.map((item) => (
                                                    <div key={item._id} className='item'>
                                                        <div className='itemBody' >
                                                            <pre className='bodyPara' >{item.userName}</pre>
                                                            <abbr title='Delete the Time'><Button className='del' onClick={() => this.add(item._id)}>Add</Button></abbr>
                                                        </div>
                                                    </div>
                                                ))}


                                            </div>
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
const mapStateToProps = ({ cases }) => {
    return {
        owners: cases.owners,

    }
}
export default connect(mapStateToProps, { getNewCaseOwner })(AddTimePage);