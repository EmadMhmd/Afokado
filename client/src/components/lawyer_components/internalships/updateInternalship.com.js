import {connect} from 'react-redux';
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {updateInternship } from '../../../actions/internalship.action.js';
import moment from 'moment';

class UpdateInternshipPage extends Component{
    constructor(props){
        super(props);
        this.state={
            modal:false
        }
        this.toggle=this.toggle.bind(this);
    }
    _handleFormSubmit = (values, bag) => {
        if (values) {
            values._id=this.props.internship._id
            values.created=this.props.internship.created
            this.props.updateInternship(values);
            this.toggle();
            this.bag=bag;
        }
        else {
            bag.isSubmitting(false)
        }
    }
    toggle(){
        this.setState({
            modal:!this.state.modal
        })
    }
    render(){
        const {count, paid, description, title, startDate, duration} =this.props.internship;
        return(
          <div>
            <Button className='mainBtn btnN'  onClick={this.toggle}>Update</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} >
              <ModalHeader toggle={this.toggle}>Update Internship</ModalHeader>
              <ModalBody>
                    <div>
                        <h3 className='formHeader'>Update Internalship</h3>
                        <Formik
                            initialValues={{ count, paid, description, title, startDate, duration}}
                            validationSchema={Yup.object().shape({
                                paid: Yup.number().moreThan(-1 , 'paid must be zero or more').required(),
                                description: Yup.string().required(),
                                title: Yup.string().required(),
                                count: Yup.number().positive().moreThan(0).required(),
                                duration: Yup.number().positive().moreThan(0),
                                startDate:Yup.date().min(new Date() ,`Invalid Date , Please date later than ${moment().format('DD-MM-YY dddd')} `).required()
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
                                            <Label>description</Label>
                                            <Input
                                                placeholder="Enter description"
                                                invalid={errors.description && touched.description && errors.description}
                                                type="textarea"
                                                name="description"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.description}
                                            />
                                            {errors.description && touched.description ? (<FormFeedback>{errors.description}</FormFeedback>) : null}
                                        </FormGroup >
                                        <FormGroup>
                                            <Label>paid</Label>
                                            <Input
                                                placeholder="Enter paid"
                                                invalid={errors.paid && touched.paid && errors.paid}
                                                type="number"
                                                name="paid"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.paid}
                                            />
                                            {errors.paid && touched.paid ? (<FormFeedback>{errors.paid}</FormFeedback>) : null}
                                        </FormGroup>

                                        <FormGroup>
                                            <Label>count</Label>
                                            <Input
                                                placeholder="Enter count"
                                                invalid={errors.count && touched.count && errors.count}
                                                type="number"
                                                name="count"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.count}
                                            />
                                            {errors.count && touched.count ? (<FormFeedback>{errors.count}</FormFeedback>) : null}
                                        </FormGroup>
                                       


                                        <ModalFooter>
                                            <Button className='modelBtn' type="submit" disabled={isSubmitting || !isValid} onClick={handleSubmit}>
                                                Update Internship
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

export default connect(null,{updateInternship })(UpdateInternshipPage);