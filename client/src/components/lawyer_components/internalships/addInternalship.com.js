import {connect} from 'react-redux';
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {addInternship} from '../../../actions/internalship.action.js';

class AddInternshipPage extends Component{
    constructor(props){
        super(props);
        this.state={
            modal:false
        }
        this.toggle=this.toggle.bind(this);
    }
    _handleFormSubmit = (values, bag) => {
        if (values) {
            this.props.addInternship(values);
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
        return(
          <div>
            <Button className='add' onClick={this.toggle}>Add Internship</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} >
              <ModalHeader toggle={this.toggle}>Add New Internalship</ModalHeader>
              <ModalBody>
                    <div>
                        <h3 className='formHeader'>Add New Internalship</h3>
                        <Formik
                            initialValues={{ count: '', paid: '', description: '' , title :'' , startDate:'' , duration:''}}
                            validationSchema={Yup.object().shape({
                                paid: Yup.number().required(),
                                description: Yup.string().required(),
                                title: Yup.string().required(),
                                count: Yup.number().required(),
                                duration: Yup.number(),
                            
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
                                            <Label>Title</Label>
                                            <Input
                                                placeholder="Enter title"
                                                invalid={errors.title && touched.title && errors.title}
                                                type="text"
                                                name="title"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.title}
                                            />

                                            {errors.title && touched.title ? (<FormFeedback>{errors.title}</FormFeedback>) : null}
                                        </FormGroup >
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
                                            <Label>Start Date</Label>
                                            <Input
                                                placeholder="Enter Start Date"
                                                invalid={errors.startDate && touched.startDate && errors.startDate}
                                                type="date"
                                                name="startDate"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.startDate}
                                            />

                                            {errors.startDate && touched.startDate ? (<FormFeedback>{errors.startDate}</FormFeedback>) : null}
                                        </FormGroup >
                                        <FormGroup>
                                            <Label>Duration in Days</Label>
                                            <Input
                                                placeholder="Enter Duration in days"
                                                invalid={errors.duration && touched.duration && errors.duration}
                                                type="number"
                                                name="duration"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.duration}
                                            />

                                            {errors.duration && touched.duration ? (<FormFeedback>{errors.duration}</FormFeedback>) : null}
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
                                                Add New Internship
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
export default connect(null,{addInternship })(AddInternshipPage);