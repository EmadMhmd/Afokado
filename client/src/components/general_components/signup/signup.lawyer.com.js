import { NavLink } from 'react-router-dom';
import React, { Component,Fragment } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback ,Row ,Col} from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { sign } from '../../../actions/auth.actions.js';
import axios from 'axios';
class Signup_lawyer extends Component {
    state = {
        spec: [],
        city: []
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
        document.title='AFokado | Lawyer SignUp'
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
    _handleFormSubmit = (values, bag) => {
        if (values) {
            const { sign } = this.props;
            values.type = 2;
            sign(values);
            this.props.history.push('/auth')
        }
        else {
            bag.isSubmitting(false)
        }
    }
    render() {
        return (
            <div className='bg mt'>
                <div className='container'>
                    <div className='formPage'>
                        <h3 className='formHeader'>Sign Up</h3>
                        <Formik
                            enctype="multipart/form-data"
                            initialValues={{ userName: '',  email: '', password: '', mobile: '', age: '', address: '', city: '', state: '', spec: '',sspec: '', zip: '' ,gender:''}}
                            validationSchema={Yup.object().shape({
                                userName: Yup.string().required(),
                                email: Yup.string().email().required(),
                                password: Yup.string().min(6).required(),
                                gender:Yup.string(),
                                age: Yup.number().moreThan(20),
                                address: Yup.string().required(),
                                city: Yup.string().required(),
                                state: Yup.string().required(),
                                spec: Yup.string().required(),
                                sspec: Yup.string(),
                                mobile: Yup.number()
                                    .typeError("That doesn't look like a phone number")
                                    .positive("A phone number can't start with a minus")
                                    .integer("A phone number can't include a decimal point")
                                    .min(10)
                                    .required('A phone number is required'),
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
                                                placeholder="Type Your Name"
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
                                            <Label >Email <span className='star'>*</span></Label>
                                            <Input
                                                className='input'
                                                placeholder="Type Your Email"
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
                                            <Label className='label'>Mobile Number <span className='star'>*</span></Label>
                                            <Input
                                                className='input'
                                                placeholder="Type Your Number"
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
                                                placeholder="Type Your age"
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
                                            <Label >Major Specialty <span className='star'>*</span></Label>
                                            <Input 
                                                className='select'
                                                type="select" 
                                                name="spec"
                                                placeholder="Select Your Specialty"
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
                                            <Label >secondary Specialty</Label>
                                            <Input 
                                                type="select" 
                                                name="sspec"
                                                placeholder="Select Your Secondary Specialty"
                                                invalid={errors.sspec && touched.sspec && errors.sspec}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.sspec} 
                                                >
                                                <option>Select Specialty</option>
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
                                                placeholder="Select Your Gender"
                                                invalid={errors.gender && touched.gender && errors.gender}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.gender} 
                                                >
                                                <option>Select Geneder</option>
                                                <option>Male</option>
                                                <option>Femal</option>
                                            </Input>
                                            {errors.gender && touched.gender ? (<FormFeedback>{errors.gender}</FormFeedback>) : null}
                                        </FormGroup>
                                        <FormGroup >
                                            <Label  >Address <span className='star'>*</span></Label>
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
                                                        placeholder="City"
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
                                                        placeholder="State"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.state}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <FormGroup>
                                            <Label >Password <span className='star'>*</span></Label>
                                            <Input
                                                placeholder="Type Your Password"
                                                invalid={errors.password && touched.password && errors.password}
                                                type="password"
                                                name="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />
                                            {errors.password && touched.password ? (<FormFeedback>{errors.password}</FormFeedback>) : null}
                                        </FormGroup>
                                        <Button className='formBtn' type="submit" disabled={isSubmitting || !isValid} onClick={handleSubmit}>
                                            Sign Up
                                        </Button>
                                    </div>
                                )}

                        </Formik>
                        <div >
                            <p className='checkPara'>Already Registered in Afokado ?</p>
                            <NavLink to='/auth'>Login</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(null, { sign })(Signup_lawyer);
