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
        const {count, description, paid,title,startDate,duration,role, salary} =this.props.internship;
        return(
          <div>
            <Button className='mainBtn btnN'  onClick={this.toggle}>Internship Update</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} >
              <ModalHeader toggle={this.toggle}>Update Internship</ModalHeader>
              <ModalBody>
                    <div>
                        <h3 className='formHeader'>Update Internalship</h3>
                        <Formik
                            initialValues={{ count, description, paid,title,startDate,duration,role, salary }}
                            validationSchema={Yup.object().shape({
                                paid: Yup.string().required(),
                                description: Yup.string().required(),
                                title: Yup.string().required(),
                                count: Yup.number().positive().moreThan(0).required(),
                                duration: Yup.number().positive().moreThan(0),
                                startDate:Yup.date().min(new Date() ,`Invalid Date , Please date later than ${moment().format('DD-MM-YY dddd')} `).required(),
                                role:Yup.string(),
                                salary: Yup.number().positive(),
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
                                            <Label>Title <span className='star'>*</span></Label>
                                            <Input
                                                placeholder="Type title"
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
                                            <Label>description <span className='star'>*</span></Label>
                                            <Input
                                                placeholder="Type description"
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
                                            <Label>Role</Label>
                                            <Input
                                                placeholder="Type Role"
                                                invalid={errors.role && touched.role && errors.role}
                                                type="text"
                                                name="role"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.role}
                                            />
                                            {errors.role && touched.role ? (<FormFeedback>{errors.role}</FormFeedback>) : null}
                                        </FormGroup >
                                        <FormGroup>
                                            <Label>Start Date <span className='star'>*</span></Label>
                                            <Input
                                                placeholder="Type Start Date"
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
                                            <Label>Duration in Days </Label>
                                            <Input
                                                placeholder="Type Duration in days"
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
                                            <Label>paid <span className='star'>*</span></Label>
                                            <Input
                                                invalid={errors.paid && touched.paid && errors.paid}
                                                type="select"
                                                name="paid"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.paid}
                                            >
                                                <option>Select paid/unpaid</option>
                                                <option value='paid'>Paid</option>
                                                <option value='unpaid'>UnPaid</option>
                                                </Input>

                                            {errors.paid && touched.paid ? (<FormFeedback>{errors.paid}</FormFeedback>) : null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Salary</Label>
                                            <Input
                                                placeholder="Type Salary"
                                                invalid={errors.salary && touched.salary && errors.salary}
                                                type="number"
                                                name="salary"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.salary}
                                            />
                                            {errors.salary && touched.salary ? (<FormFeedback>{errors.salary}</FormFeedback>) : null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Vacancies <span className='star'>*</span></Label>
                                            <Input
                                                placeholder="Type count Vacancies"
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