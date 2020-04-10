import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './addCase.style.css';
import { updateCase, fetchCases } from '../../../actions/case.action.js';


class UpdateCasePage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }
    componentDidUpdate() {
        /*const {updated} = this.props;
        const {modal} =this.state;
        //if saved id true and modal is open
        if(updated && modal){
            this.toggle();
            this.bag.resetForm();
        }*/
    }
    _handleFormSubmit = (values, bag) => {
        if (values) {
            const {_id} = this.props.oneCase;
            const one_case = { ...values,_id}
            this.props.updateCase(one_case);
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
        const { claimant, defendant, court, type, number, title } = this.props.oneCase;
        return (
            <div>
                <Button onClick={this.toggle}>Update</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Update Case</ModalHeader>
                    <ModalBody>
                        <div className=''>
                            <div className='case'>
                                <h3>Update Case</h3>
                                <Formik
                                    initialValues={{ claimant, defendant, court, type, number, title }}
                                    validationSchema={Yup.object().shape({
                                        claimant: Yup.string().required(),
                                        defendant: Yup.string().required(),
                                        court: Yup.string().required(),
                                        number: Yup.number().required(),
                                        type: Yup.string().required(),
                                        title: Yup.string().required()
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
                                        /* and other goodies */
                                    }) => (
                                            <div>
                                                <FormGroup className='field'>
                                                    <Label>Title</Label>
                                                    <Input
                                                        placeholder="Enter Title"
                                                        invalid={errors.title && touched.title && errors.title}
                                                        type="text"
                                                        name="title"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.title}
                                                    />

                                                    {errors.title && touched.title ? (<FormFeedback>{errors.title}</FormFeedback>) : null}
                                                </FormGroup >
                                                <FormGroup className='field'>
                                                    <Label>Claimant</Label>
                                                    <Input
                                                        placeholder="Enter claimant"
                                                        invalid={errors.claimant && touched.claimant && errors.claimant}
                                                        type="text"
                                                        name="claimant"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.claimant}
                                                    />

                                                    {errors.claimant && touched.claimant ? (<FormFeedback>{errors.claimant}</FormFeedback>) : null}
                                                </FormGroup >
                                                <FormGroup className='field'>
                                                    <Label>Defendant</Label>
                                                    <Input
                                                        placeholder="Enter Defendant"
                                                        invalid={errors.defendant && touched.defendant && errors.defendant}
                                                        type="text"
                                                        name="defendant"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.defendant}
                                                    />

                                                    {errors.defendant && touched.defendant ? (<FormFeedback>{errors.defendant}</FormFeedback>) : null}
                                                </FormGroup>

                                                <FormGroup className='field'>
                                                    <Label>court</Label>
                                                    <Input
                                                        placeholder="Enter court"
                                                        invalid={errors.court && touched.court && errors.court}
                                                        type="text"
                                                        name="court"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.court}
                                                    />
                                                    {errors.court && touched.court ? (<FormFeedback>{errors.court}</FormFeedback>) : null}
                                                </FormGroup>
                                                <FormGroup className="field">
                                                    <Label>Case No</Label>
                                                    <Input
                                                        placeholder="Enter Case No"
                                                        invalid={errors.number && touched.number && errors.number}
                                                        type="number"
                                                        name="number"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.number}
                                                    />
                                                    {errors.number && touched.number ? (<FormFeedback>{errors.number}</FormFeedback>) : null}
                                                </FormGroup>
                                                <FormGroup className='field'>
                                                    <Label>Case Type</Label>
                                                    <Input
                                                        placeholder="Enter Case Type"
                                                        invalid={errors.type && touched.type && errors.type}
                                                        type="text"
                                                        name="type"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.type}
                                                    />
                                                    {errors.type && touched.type ? (<FormFeedback>{errors.type}</FormFeedback>) : null}
                                                </FormGroup>


                                                <ModalFooter>
                                                    <Button type="submit" disabled={isSubmitting || !isValid} onClick={handleSubmit}>
                                                        Update Case
                                            </Button>{' '}
                                                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                                </ModalFooter>
                                            </div>
                                        )}

                                </Formik>
                            </div>


                        </div>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}
const mapStateToProps = ({ cases }) => {
    return {
        updated: cases.updated
    }
}
export default connect(mapStateToProps, { updateCase, fetchCases })(UpdateCasePage);