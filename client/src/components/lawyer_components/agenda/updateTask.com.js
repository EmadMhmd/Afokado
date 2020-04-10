import {connect} from 'react-redux';
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './addTask.style.css';
import {updateTask} from '../../../actions/task.action.js';


class UpdateTaskPage extends Component{
   
    
    constructor(props){
        super(props);
        this.state={
            modal:false
        }
        this.toggle=this.toggle.bind(this);
    }
    _handleFormSubmit = (values, bag) => {
        if (values) {
            values._id=this.props.id
            this.props.updateTask(values);
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
            <Button onClick={this.toggle}>Add Decision</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} >
              <ModalHeader toggle={this.toggle}>Add Decision</ModalHeader>
              <ModalBody>
              <div className=''>
                    <div className='case'>
                        <h3>Add Decision</h3>
                        <Formik
                            initialValues={{ decision: '' }}
                            validationSchema={Yup.object().shape({
                                decision: Yup.string().required()
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
                                            <Label>decision</Label>
                                            <Input
                                                placeholder="Enter decision"
                                                invalid={errors.decision && touched.decision && errors.decision}
                                                type="text"
                                                name="decision"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.decision}
                                            />

                                            {errors.decision && touched.decision ? (<FormFeedback>{errors.decision}</FormFeedback>) : null}
                                        </FormGroup >
                                        <ModalFooter>
                                            <Button type="submit" disabled={isSubmitting || !isValid} onClick={handleSubmit}>
                                                Add
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

export default connect(null,{updateTask })(UpdateTaskPage);