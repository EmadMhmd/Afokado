import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './addTime.style.css';
import { addTime} from '../../../actions/time.action.js';


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
                <Button onClick={this.toggle} style={{ position: 'fixed', top: 100, right: 50 }} >Add New Time</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Add New Case</ModalHeader>
                    <ModalBody>
                        <div className=''>
                            <div className='case'>
                                <h3>Add New Case</h3>
                                <Formik
                                    initialValues={{ time:'' }}
                                    validationSchema={Yup.object().shape({
                                        time: Yup.date().required(),
                                      
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
                                                    <Label>Time</Label>
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
                                                


                                                <ModalFooter>
                                                    <Button type="submit" disabled={isSubmitting || !isValid} onClick={handleSubmit}>
                                                        Add New time
                                            </Button>
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
const mapStateToProps = ({ auth}) => {
    return {
        profile:auth.profile
    }
}
export default connect(mapStateToProps, { addTime })(AddTimePage);