import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addTime} from '../../../actions/time.action.js';
import moment from 'moment';


class AddTimePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }
    _handleFormSubmit = (values, bag) => {
        if (values) {
            const {profile:{_id}}=this.props;
            values.owner=_id
            this.props.addTime(values);
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
                <Button className='btnR add' onClick={this.toggle}  >Add Date</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Add New Date</ModalHeader>
                    <ModalBody>
                            <div>
                                <h3 className='formHeader'>Add Date</h3>
                                <Formik
                                    initialValues={{ time:'' , start:this.props.profile.startTime , end:this.props.profile.endTime}}
                                    validationSchema={Yup.object().shape({
                                        time: Yup.date().min(new Date() , `Invalid Date , Please date later than ${moment().format('DD-MM-YY dddd')} `).required(),
                                      
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
                                                    <Label>Day</Label>
                                                    <Input
                                                        placeholder="Enter Time"
                                                        invalid={errors.time && touched.time && errors.time}
                                                        type="date"
                                                        name="time"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.time}
                                                    />
                                                    {errors.time && touched.time ? (<FormFeedback>{errors.time}</FormFeedback>) : null}
                                                </FormGroup >
                                                <FormGroup>
                                                    <Label>Start Time</Label>
                                                    <Input
                                                        placeholder="Enter Satrt Time"
                                                        invalid={errors.start && touched.start && errors.start}
                                                        type="time"
                                                        name="start"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.start}
                                                    />
                                                    {errors.start && touched.start ? (<FormFeedback>{errors.start}</FormFeedback>) : null}
                                                </FormGroup >
                                                <FormGroup>
                                                    <Label>End Time</Label>
                                                    <Input
                                                        placeholder="Enter End Time"
                                                        invalid={errors.end && touched.end && errors.end}
                                                        type="time"
                                                        name="end"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.end}
                                                    />
                                                    {errors.end && touched.end ? (<FormFeedback>{errors.end}</FormFeedback>) : null}
                                                </FormGroup >
                                                <ModalFooter>
                                                    <Button className='modelBtn' type="submit" disabled={isSubmitting || !isValid} onClick={handleSubmit}>
                                                        Add New Date
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
const mapStateToProps = ({ auth}) => {
    return {
        profile:auth.profile
    }
}
export default connect(mapStateToProps, { addTime })(AddTimePage);