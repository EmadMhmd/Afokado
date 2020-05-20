import {connect} from 'react-redux';
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {addTask} from '../../../actions/task.action.js';


class AddTaskPage extends Component{
    constructor(props){
        super(props);
        this.state={
            modal:false
        }
        this.toggle=this.toggle.bind(this);
    }
    _handleFormSubmit = (values, bag) => {
        if (values) {
            values.caseId=this.props.caseId
            values.created=this.props.created
            this.props.addTask(values);
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
            <Button className='add' onClick={this.toggle}>Add Task</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} >
              <ModalHeader toggle={this.toggle}>Add New Task</ModalHeader>
              <ModalBody>
                    <div>
                        <h3 className='formHeader'>Add New Task</h3>
                        <Formik
                            initialValues={{ description: '', notes: '', dateline: '' ,subLawyer:'' , title:''}}
                            validationSchema={Yup.object().shape({
                                description: Yup.string().required(),
                                notes: Yup.string(),
                                subLawyer: Yup.string(),
                                dateline: Yup.date().required(),
                                title:Yup.string()
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
                                        </FormGroup>
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
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Dateline</Label>
                                            <Input
                                                placeholder="Enter Dateline"
                                                invalid={errors.dateline && touched.dateline && errors.dateline}
                                                type="date"
                                                name="dateline"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.defendant}
                                            />

                                            {errors.dateline && touched.dateline ? (<FormFeedback>{errors.dateline}</FormFeedback>) : null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Lawyer</Label>
                                            <Input
                                                placeholder="Enter sub lawyer"
                                                invalid={errors.subLawyer && touched.subLawyer && errors.subLawyer}
                                                type="text"
                                                name="subLawyer"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.subLawyer}
                                            />

                                            {errors.subLawyer && touched.subLawyer ? (<FormFeedback>{errors.subLawyer}</FormFeedback>) : null}
                                        </FormGroup >
                                        <FormGroup>
                                            <Label>Any Notes</Label>
                                            <Input
                                                placeholder="Enter Notes"
                                                invalid={errors.notes && touched.notes && errors.notes}
                                                type="text"
                                                name="notes"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.notes}
                                            />
                                            {errors.notes && touched.notes ? (<FormFeedback>{errors.notes}</FormFeedback>) : null}
                                        </FormGroup>
                                       

                                        <ModalFooter>
                                            <Button className='modelBtn' type="submit" disabled={isSubmitting || !isValid} onClick={handleSubmit}>
                                                Add New Task
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

export default connect(null,{addTask})(AddTaskPage);