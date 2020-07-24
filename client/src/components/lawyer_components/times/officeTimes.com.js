import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik } from 'formik';
import { officeTimes} from '../../../actions/time.action.js';


class StartEndTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }
    _handleFormSubmit = (values, bag) => {
        if (values) {
            //
            console.log('times', values.startTime ,values.endTime)
            //apiOfficeTimes(values)
            this.props.officeTimes(values);
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
                <Button className='btnL addTwo add' onClick={this.toggle}  >Office Times</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Add office Times</ModalHeader>
                    <ModalBody>
                            <div>
                                <h3 className='formHeader'>Start and End Time</h3>
                                <Formik
                                    initialValues={{ startTime:this.props.profile.startTime , endTime:this.props.profile.endTime }}
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
                                                    <Label>Start Time</Label>
                                                    <Input
                                                        placeholder="Enter Satrt Time"
                                                        invalid={errors.startTime && touched.startTime && errors.startTime}
                                                        type="time"
                                                        name="startTime"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.startTime}
                                                    />
                                                    {errors.startTime && touched.startTime ? (<FormFeedback>{errors.startTime}</FormFeedback>) : null}
                                                </FormGroup >
                                                                                                <FormGroup>
                                                    <Label>End Time</Label>
                                                    <Input
                                                        placeholder="Enter End Time"
                                                        invalid={errors.endTime && touched.endTime && errors.endTime}
                                                        type="time"
                                                        name="endTime"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.endTime}
                                                    />
                                                    {errors.endTime && touched.endTime ? (<FormFeedback>{errors.endTime}</FormFeedback>) : null}
                                                </FormGroup >
                                                <ModalFooter>
                                                    <Button className='modelBtn' type="submit" disabled={isSubmitting || !isValid} onClick={handleSubmit}>
                                                        Add times
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
export default connect(mapStateToProps, { officeTimes })(StartEndTime);