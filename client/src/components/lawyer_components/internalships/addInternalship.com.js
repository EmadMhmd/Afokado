import {connect} from 'react-redux';
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './addInternalship.style.css';
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
            <Button onClick={this.toggle} style={{position:'fixed' , top:100,right:50 }}>Add New Internalship</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} >
              <ModalHeader toggle={this.toggle}>Add New Internalship</ModalHeader>
              <ModalBody>
              <div className=''>
                    <div className='addinternalship'>
                        <h3>Add New Internalship</h3>
                        <Formik
                            initialValues={{ count: '', paid: '', description: ''}}
                            validationSchema={Yup.object().shape({
                                paid: Yup.number().required(),
                                description: Yup.string().required(),
                                count: Yup.number().required(),
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
                                        <FormGroup className='field'>
                                            <Label>description</Label>
                                            <Input
                                                placeholder="Enter description"
                                                invalid={errors.description && touched.description && errors.description}
                                                type="text"
                                                name="description"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.description}
                                            />

                                            {errors.description && touched.description ? (<FormFeedback>{errors.description}</FormFeedback>) : null}
                                        </FormGroup >
                                        <FormGroup className='field'>
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

                                        <FormGroup className='field'>
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
                                            <Button type="submit" disabled={isSubmitting || !isValid} onClick={handleSubmit}>
                                                Add New Internship
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
export default connect(null,{addInternship })(AddInternshipPage);