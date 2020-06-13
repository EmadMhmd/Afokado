import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addRate} from '../../../actions/rate.action.js';

class AddReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }
    _handleFormSubmit = (values, bag) => {
        if (values) {
            values.id=this.props.id;
            this.props.addRate(values);
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
                <abbr title='Add Review'><Button className='del' onClick={this.toggle}><i className='fa fa-plus fas' /></Button></abbr>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Add New Review</ModalHeader>
                    <ModalBody>
                            <div >
                                <h3 className='formHeader'>Review</h3>
                                <Formik
                                    initialValues={{ comment: '', stars: 3 }}
                                    validationSchema={Yup.object().shape({
                                        comment: Yup.string().required(),
                                        stars: Yup.number().max(5).min(1)
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
                                                    <Label>Review</Label>
                                                    <Input
                                                        placeholder="Enter Comment"
                                                        invalid={errors.comment && touched.comment && errors.comment}
                                                        type="text"
                                                        name="comment"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.comment}
                                                    />

                                                    {errors.comment && touched.comment ? (<FormFeedback>{errors.comment}</FormFeedback>) : null}
                                                </FormGroup >
                                                <FormGroup>
                                                    <Label>Rate</Label>
                                                    <Input
                                                        placeholder="Enter rate"
                                                        invalid={errors.stars && touched.stars && errors.stars}
                                                        type="number"
                                                        name="stars"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.stars}
                                                    />

                                                    {errors.stars && touched.stars ? (<FormFeedback>{errors.stars}</FormFeedback>) : null}
                                                </FormGroup >
                                                <ModalFooter>
                                                    <Button className='modelBtn' type="submit" disabled={isSubmitting || !isValid} onClick={handleSubmit}>
                                                        Review
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

export default connect(null, { addRate})(AddReview);