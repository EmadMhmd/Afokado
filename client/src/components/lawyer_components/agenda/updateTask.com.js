import {connect} from 'react-redux';
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
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
            values._id=this.props.task._id
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
        //const {notes}=this.props.task
        return(
          <div>
            <Button className='mainBtn btnN' onClick={this.toggle}>Add Decision</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} >
              <ModalHeader toggle={this.toggle}>Add Decision</ModalHeader>
              <ModalBody>
                    <div>
                        <h3 className='formHeader'>Add Decision</h3>
                        <Formik
                            initialValues={{ decision: '', notes:''}}
                            validationSchema={Yup.object().shape({
                                decision: Yup.string().required(),
                                descison:Yup.string()
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
                                        <FormGroup>
                                            <Label>notes</Label>
                                            <Input
                                                placeholder="Enter notes"
                                                invalid={errors.notes && touched.notes && errors.notes}
                                                type="text"
                                                name="notes"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.notes}
                                            />

                                            {errors.notes && touched.notes ? (<FormFeedback>{errors.notes}</FormFeedback>) : null}
                                        </FormGroup >
                                        <ModalFooter>
                                            <Button className='modelBtn' type="submit" disabled={isSubmitting || !isValid} onClick={handleSubmit}>
                                                Add
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

export default connect(null,{updateTask })(UpdateTaskPage);