import { connect } from 'react-redux';
import React, { Component ,Fragment} from 'react';
import { Button, FormGroup, Label, Input, FormFeedback,Row ,Col } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { updateUser } from '../../../actions/auth.actions.js';
import axios from 'axios';


class UpdateLawyer extends Component {
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
    renderSpecOptions() {
        return (
            <Fragment>
                {this.state.spec.map(sp => (
                    <option key={Math.random()} value={sp}>{sp}</option>
                ))}
            </Fragment>
        )
    }
    renderCityOptions() {
        return (
            <Fragment>
                {this.state.city.map(ct => (
                    <option key={Math.random()} value={ct}>{ct}</option>
                ))}
            </Fragment>
        )
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    render() {
        const { userName, mobile, email, gender, age, spec, sspec, tspec, address, city, state} = this.props.profile;
        return (
            <div>
                <Button className='mainBtn btnR' onClick={this.toggle}>Update Info</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Update Your Info</ModalHeader>
                    <ModalBody>
                        <div>
                            <h3 className='formHeader'>Update Lawyer</h3>
                            <Formik
                                initialValues={{ userName, mobile, email, gender, age, spec, sspec, tspec, address, city, state,  }}
                                validationSchema={Yup.object().shape({
                                    userName: Yup.string().required(),
                                    email: Yup.string().email().required(),
                                    password: Yup.string().min(6).required(),
                                    mobile: Yup.number().min(11).required(),
                                    gender:Yup.string(),
                                    age: Yup.number().moreThan(20),
                                    city: Yup.string().required(),
                                    state: Yup.string().required(),
                                    spec: Yup.string().required(),
                                    sspec: Yup.string(),

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
                                                <Label >Name <span className='star'>*</span></Label>
                                                <Input
                                                    className='input'
                                                    placeholder="Enter Your name"
                                                    invalid={errors.userName && touched.userName && errors.userName}
                                                    type="text"
                                                    name="userName"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.userName}
                                                />

                                                {errors.userName && touched.userName ? (<FormFeedback>{errors.userName}</FormFeedback>) : null}
                                            </FormGroup >
                                          
                                            <FormGroup >
                                                <Label >Email<span className='star'>*</span></Label>
                                                <Input
                                                    className='input'
                                                    placeholder="Enter Your Email"
                                                    invalid={errors.email && touched.email && errors.email}
                                                    type="email"
                                                    name="email"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.email}
                                                />

                                                {errors.email && touched.email ? (<FormFeedback>{errors.email}</FormFeedback>) : null}
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className='label'>Mobile Number</Label>
                                                <Input
                                                    className='input'
                                                    placeholder="Enter Your Number"
                                                    invalid={errors.mobile && touched.mobile && errors.mobile}
                                                    type="tel"
                                                    name="mobile"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.mobile}
                                                />
                                                {errors.mobile && touched.mobile ? (<FormFeedback>{errors.mobile}</FormFeedback>) : null}
                                            </FormGroup>
                                            <FormGroup >
                                                <Label>Age</Label>
                                                <Input
                                                    className='input'
                                                    placeholder="Enter Your age"
                                                    invalid={errors.age && touched.age && errors.age}
                                                    type="number"
                                                    name="age"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.age}
                                                />
                                                {errors.age && touched.age ? (<FormFeedback>{errors.age}</FormFeedback>) : null}
                                            </FormGroup>
                                            <FormGroup >
                                                <Label >Major Spec <span className='star'>*</span></Label>
                                                <Input
                                                    className='select'
                                                    type="select"
                                                    name="spec"
                                                    placeholder="select Your spec"
                                                    invalid={errors.spec && touched.spec && errors.spec}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.spec}
                                                >
                                                    <option>Select spec</option>
                                                    {this.renderSpecOptions()}
                                                </Input>
                                                {errors.spec && touched.spec ? (<FormFeedback>{errors.spec}</FormFeedback>) : null}
                                            </FormGroup>
                                            <FormGroup>
                                                <Label >secondary Spec</Label>
                                                <Input
                                                    type="select"
                                                    name="sspec"
                                                    placeholder="select Your secondary spec"
                                                    invalid={errors.sspec && touched.sspec && errors.sspec}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.sspec}
                                                >
                                                    <option>select spec</option>
                                                    <option value='all' >All</option>
                                                    {this.renderSpecOptions()}
                                                </Input>
                                                {errors.sspec && touched.sspec ? (<FormFeedback>{errors.sspec}</FormFeedback>) : null}
                                            </FormGroup>
                                            <FormGroup >
                                                <Label >Gender</Label>
                                                <Input
                                                    type="select"
                                                    name="gender"
                                                    placeholder="select Your gender"
                                                    invalid={errors.gender && touched.gender && errors.gender}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.gender}
                                                >
                                                    <option>Select geneder</option>
                                                    <option>Male</option>
                                                    <option>Femal</option>
                                                </Input>
                                                {errors.gender && touched.gender ? (<FormFeedback>{errors.gender}</FormFeedback>) : null}
                                            </FormGroup>
                                            <FormGroup >
                                                <Label  >Addres <span className='star'>*</span></Label>
                                                <Input
                                                    type="text"
                                                    name="address"
                                                    placeholder="Apartment, studio, or floor"
                                                    invalid={errors.address && touched.address && errors.address}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.address}
                                                />
                                                {errors.address && touched.address ? (<FormFeedback>{errors.address}</FormFeedback>) : null}
                                            </FormGroup>
                                            <Row form>
                                                <Col md={7}>
                                                    <FormGroup >
                                                        <Label >City <span className='star'>*</span></Label>
                                                        <Input
                                                            type="select"
                                                            name="city"
                                                            placeholder="city"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.city}
                                                        >
                                                            <option>Select city</option>
                                                            {this.renderCityOptions()}
                                                        </Input>

                                                    </FormGroup>
                                                </Col>
                                                <Col md={5}>
                                                    <FormGroup>
                                                        <Label >State <span className='star'>*</span></Label>
                                                        <Input
                                                            type="text"
                                                            name="state"
                                                            placeholder="state"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.state}
                                                        />
                                                    </FormGroup>
                                                </Col>

                                            </Row>

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
export default connect(mapStateToProps, { updateUser })(UpdateLawyer);