import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { updateUser } from '../../../actions/auth.actions.js';
import axios from 'axios';

//delete it 
class UpdateBio extends Component {
    _handleFormSubmit = (values, bag) => {
        if (values) {
            const { updateUser } = this.props;
            values.type = 2;
            updateUser(values);
            this.toggle();
            
        }
        else {
            bag.isSubmitting(false)

        }
    }
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            spec: [],
            city: []
        }
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount() {
        axios.get('./data/spec.json ').then(res => {
            this.setState({
                spec: res.data.spec
            })
        })
        axios.get('./data/city.json ').then(res => {
            this.setState({
                city: res.data.egypt
            })
        })
    }
    
   

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    render() {
        const { bio} = this.props.profile;
        return (
            <div>
                <Button className='mainBtn ' onClick={this.toggle}>Update Bio</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Update / Add Your Bio</ModalHeader>
                    <ModalBody>
                        <div>
                            <h3 className='formHeader'>Update Bio</h3>
                            <Formik
                                initialValues={{ bio }}
                                validationSchema={Yup.object().shape({
                                    bio: Yup.string().required()

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
                                         
                                            <FormGroup >
                                                <Label  >Bio </Label>
                                                <Input
                                                    type="textarea"
                                                    name="bio"
                                                    placeholder="Type Your Bio"
                                                    invalid={errors.bio && touched.bio && errors.bio}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.bio}
                                                />
                                                {errors.bio && touched.bio ? (<FormFeedback>{errors.bio}</FormFeedback>) : null}
                                            </FormGroup>
                                          

                                            <ModalFooter>
                                                <Button className='modelBtn' type="submit" disabled={isSubmitting || !isValid} onClick={handleSubmit}>
                                                    Update
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
const mapStateToProps = ({ auth }) => {
    return {
        profile: auth.profile,
    }
}
export default connect(mapStateToProps, { updateUser })(UpdateBio);