import {connect} from 'react-redux';
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {updateInternship } from '../../../actions/internalship.action.js';

class UpdateJob extends Component{
    constructor(props){
        super(props);
        this.state={
            modal:false
        }
        this.toggle=this.toggle.bind(this);
    }
    _handleFormSubmit = (values, bag) => {
        if (values) {
            values._id=this.props.job._id
            values.created=this.props.job.created
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
        const {count, description,title,role,minExp , maxExp , salary ,jobType } =this.props.job;
        return(
          <div>
            <Button className='mainBtn btnN'  onClick={this.toggle}>Job Update</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} >
              <ModalHeader toggle={this.toggle}>Update Job</ModalHeader>
              <ModalBody>
                    <div>
                        <h3 className='formHeader'>Update Job</h3>
                        <Formik
                            initialValues={{ count, description,title,role,minExp , maxExp , salary ,jobType }}
                            validationSchema={Yup.object().shape({
                                description: Yup.string().required(),
                                title: Yup.string().required(),
                                count: Yup.number().positive().moreThan(0).required(),
                                jobType:Yup.string().required(),
                                role:Yup.string(),
                                minExp: Yup.number().positive(),
                                maxExp: Yup.number().positive(),
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
                                            <Label>Job Type <span className='star'>*</span></Label>
                                            <Input
                                                placeholder="Type Job Role"
                                                invalid={errors.jobType && touched.jobType && errors.jobType}
                                                type="select"
                                                name="jobType"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.jobType}
                                            >
                                                <option >Select Job Type</option>
                                                <option value='part time'>Part Time</option>
                                                <option value='full time'>Full Time</option>
                                                <option value='Remote and part time'>Remotely and Part Time</option>
                                                <option value='Remote and full time' >Remotely and  Full Time</option>
                                                <option value='other'>Other</option>
                                            </Input>

                                            {errors.jobType && touched.jobType ? (<FormFeedback>{errors.jobType}</FormFeedback>) : null}
                                        </FormGroup >
                                        <FormGroup>
                                            <Label>Minmum Experience </Label>
                                            <Input
                                                placeholder="Type Minmum Experience In Years"
                                                invalid={errors.minExp && touched.minExp && errors.minExp}
                                                type="number"
                                                name="minExp"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.minExp}
                                            />

                                            {errors.minExp && touched.minExp ? (<FormFeedback>{errors.minExp}</FormFeedback>) : null}
                                        </FormGroup >
                                        <FormGroup>
                                            <Label>Maxmum Experience </Label>
                                            <Input
                                                placeholder="Type Maxmum Experience In Years"
                                                invalid={errors.maxExp && touched.maxExp && errors.maxExp}
                                                type="number"
                                                name="maxExp"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.maxExp}
                                            />

                                            {errors.maxExp && touched.maxExp ? (<FormFeedback>{errors.maxExp}</FormFeedback>) : null}
                                        </FormGroup >
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
                                                Update Job
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
export default connect(null,{updateInternship })(UpdateJob);