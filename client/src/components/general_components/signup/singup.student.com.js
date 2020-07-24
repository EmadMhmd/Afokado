import { NavLink } from 'react-router-dom';
import React, { Component, Fragment } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback, Row, Col } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { sign } from '../../../actions/auth.actions.js';
import axios from 'axios';
import moment from 'moment';
class Signup_student extends Component {
    state = {
        city: [],
        uni: []
    }
    componentDidMount() {

        axios.get('./data/city.json ').then(res => {
            this.setState({
                city: res.data.egypt
            })
        })
        axios.get('./data/uni.json ').then(res => {
            this.setState({
                uni: res.data.egypt
            })
        })
        document.title='AFokado | Student SignUp'
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
    renderUniOptions() {
        return (
            <Fragment>
                {this.state.uni.map(un => (
                    <option key={Math.random()} value={un}>{un}</option>
                ))}
            </Fragment>
        )
    }
    _handleFormSubmit = (values, bag) => {
        if (values) {
            const { sign } = this.props;
            values.type = 3;
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
                            initialValues={{ userName: '', email: '', password: '', mobile: '', level: '', age: '', address: '', city: '', state: '', uni: '', gender: '' ,gpa:''}}
                            validationSchema={Yup.object().shape({
                                userName: Yup.string().required(),
                                email: Yup.string().email().required(),
                                password: Yup.string().min(6).required(),
                                uni: Yup.string(),
                                age: Yup.number().moreThan(17),
                                address: Yup.string(),
                                city: Yup.string(),
                                state: Yup.string(),
                                gender: Yup.string(),
                                level:Yup.date().min(new Date() , `Invalid Date , Please date later than ${moment().format('DD-MM-YY dddd')} `).required(),
                                mobile: Yup.number()
                                    .typeError("That doesn't look like a mobile number")
                                    .positive("A mobile number can't start with a minus")
                                    .integer("A mobile number can't include a decimal point")
                                    .min(10)
                                    .required('A mobile number is required'),
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
                                            <Label>Name <span className='star'>*</span></Label>
                                            <Input
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
                                        <FormGroup className='field'>
                                            <Label>Email <span className='star'>*</span></Label>
                                            <Input
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
                                        <FormGroup className='field'>
                                            <Label>Mobile Number <span className='star'>*</span></Label>
                                            <Input
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
                                        <FormGroup className='field'>
                                            <Label>Age</Label>
                                            <Input
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
                                        <FormGroup className='field'>
                                            <Label>Expected Graduation Year <span className='star'>*</span></Label>
                                            <Input
                                                placeholder="Type Your year"
                                                invalid={errors.level && touched.level && errors.level}
                                                type="date"
                                                name="level"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.level}
                                            />
                                            {errors.level && touched.level ? (<FormFeedback>{errors.level}</FormFeedback>) : null}
                                        </FormGroup>
                                        <FormGroup className='field'>
                                            <Label>GPA</Label>
                                            <Input
                                                type="select"
                                                name="gpa"
                                                placeholder="Select Your GPA"
                                                invalid={errors.gpa && touched.gpa && errors.gpa}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.gpa} >
                                                <option>Select Appreciation</option>
                                                <option value='accept'>Accept</option>
                                                <option value='good'>good</option>
                                                <option value='verygood'>very good</option>
                                                <option value='excellent'>excellent</option>
                                            </Input>
                                            {errors.gender && touched.gender ? (<FormFeedback>{errors.gender}</FormFeedback>) : null}
                                        </FormGroup>
                                        <FormGroup className='field'>
                                            <Label>University </Label>
                                            <Input
                                                type="select"
                                                name="uni"
                                                placeholder="Select Your University "
                                                invalid={errors.uni && touched.uni && errors.uni}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.uni} >
                                                <option>Select University </option>
                                                {this.renderUniOptions()}
                                            </Input>
                                            {errors.uni && touched.uni ? (<FormFeedback>{errors.uni}</FormFeedback>) : null}
                                        </FormGroup>
                                        <FormGroup className='field'>
                                            <Label>Gender</Label>
                                            <Input
                                                type="select"
                                                name="gender"
                                                placeholder="Select Your Gender"
                                                invalid={errors.gender && touched.gender && errors.gender}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.gender} >
                                                <option>Select Gender</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                            </Input>
                                            {errors.gender && touched.gender ? (<FormFeedback>{errors.gender}</FormFeedback>) : null}
                                        </FormGroup>
                                        <FormGroup className='field'>
                                            <Label >Address</Label>
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
                                                <FormGroup className='field'>
                                                    <Label >City</Label>
                                                    <Input
                                                        type="select"
                                                        name="city"
                                                        placeholder="City"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.city}
                                                    >
                                                        <option>Select City</option>
                                                        {this.renderCityOptions()}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col md={5}>
                                                <FormGroup className='field'>
                                                    <Label >State</Label>
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

                                        <FormGroup className='field'>
                                            <Label>Password <span className='star'>*</span></Label>
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

export default connect(null, { sign })(Signup_student);
