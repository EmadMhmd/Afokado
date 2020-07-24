import {connect} from 'react-redux';
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { archievCase } from '../../../actions/case.action';


class ArchiveCase extends Component{
   
    
    constructor(props){
        super(props);
        this.state={
            modal:false
        }
        this.toggle=this.toggle.bind(this);
    }
    _handleFormSubmit = (values, bag) => {
        if (values) {
            values._id=this.props.caseId
            this.props.archievCase(values);
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
            <Button className='mainBtn btnR' onClick={this.toggle}>Archive</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} >
              <ModalHeader toggle={this.toggle}>Archive Case</ModalHeader>
              <ModalBody>
                    <div>
                        <h3 className='formHeader'>Add Final Decision</h3>
                        <Formik
                            initialValues={{ finalDecision: '' , notes:''}}
                            validationSchema={Yup.object().shape({
                                notes: Yup.string(),
                                finalDecision: Yup.string()
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
                                            <Label>Final Decision</Label>
                                            <Input
                                                placeholder="Enter final Decision"
                                                type="textarea"
                                                name="finalDecision"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.finalDecision}
                                            />

                                        </FormGroup >
                                        <FormGroup>
                                            <Label>notes</Label>
                                            <Input
                                                placeholder="Enter notes"
                                                type="textarea"
                                                name="notes"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.notes}
                                            />
                                        </FormGroup >
                                        <ModalFooter>
                                            <Button className='modelBtn' type="submit" disabled={isSubmitting || !isValid} onClick={handleSubmit}>
                                                Archive
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

export default connect(null,{archievCase })(ArchiveCase);