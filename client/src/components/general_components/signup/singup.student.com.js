import { NavLink } from 'react-router-dom';
import React, { Component, Fragment } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback, Row, Col } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './signup.com.css';
import { connect } from 'react-redux';
import { sign } from '../../../actions/auth.actions.js';
import axios from 'axios';



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
            <div className='bg'>
                <div className='container'>
                    <div className='sign'>
                        <h3>Sign Up</h3>
                        <Formik
                            initialValues={{ userName: '', email: '', password: '', mobile: '', level: '', age: '', address: '', city: '', state: '', uni: '', zip: '', gender: '' }}
                            validationSchema={Yup.object().shape({
                                userName: Yup.string().required(),
                                email: Yup.string().email().required(),
                                password: Yup.string().min(6).required(),
                                mobile: Yup.number().min(11).required(),
                                level: Yup.date(),
                                age: Yup.number(),
                                address: Yup.string(),
                                city: Yup.string(),
                                state: Yup.string(),
                                gender: Yup.string(),
                                uni: Yup.string().required(),

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
                                /* and other goodies */
                            }) => (
                                    <div>
                                        <FormGroup className='field'>
                                            <Label>User Name</Label>
                                            <Input
                                                placeholder="Enter Your user Name"
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
                                            <Label>Email</Label>
                                            <Input
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
                                        <FormGroup className='field'>
                                            <Label>Mobile Number</Label>
                                            <Input
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
                                        <FormGroup className='field'>
                                            <Label>Age</Label>
                                            <Input
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
                                        <FormGroup className='field'>
                                            <Label>Expected Graduation Year</Label>
                                            <Input
                                                placeholder="Enter Your year"
                                                invalid={errors.level && touched.level && errors.level}
                                                type="date"
                                                name="level"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.level}
                                            />

                                            {errors.level && touched.level ? (<FormFeedback>{errors.level}</FormFeedback>) : null}
                                        </FormGroup>

                                        <FormGroup>
                                            <Label>Uni</Label>
                                            <Input
                                                type="select"
                                                name="uni"
                                                placeholder="select Your uni"
                                                invalid={errors.uni && touched.uni && errors.uni}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.uni} >
                                                <option>Select Uni</option>
                                                {this.renderUniOptions()}
                                            </Input>
                                            {errors.uni && touched.uni ? (<FormFeedback>{errors.uni}</FormFeedback>) : null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Gender</Label>
                                            <Input
                                                type="select"
                                                name="gender"
                                                placeholder="select Your gender"
                                                invalid={errors.gender && touched.gender && errors.gender}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.gender} >
                                                <option>Select gender</option>
                                                <option>male</option>
                                                <option>female</option>
                                            </Input>
                                            {errors.gender && touched.gender ? (<FormFeedback>{errors.gender}</FormFeedback>) : null}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label >Addres</Label>
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
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label >City</Label>
                                                    <Input
                                                        type="select"
                                                        name="city"
                                                        placeholder="city"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.city}
                                                    >
                                                        <option>Select City</option>
                                                        {this.renderCityOptions()}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label >State</Label>
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
                                            <Col md={2}>
                                                <FormGroup>
                                                    <Label >Zip</Label>
                                                    <Input
                                                        type="text"
                                                        name="zip"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.zip} />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <FormGroup className='field'>
                                            <Label>Password</Label>
                                            <Input
                                                placeholder="Enter Your password"
                                                invalid={errors.password && touched.password && errors.password}
                                                type="password"
                                                name="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />
                                            {errors.password && touched.password ? (<FormFeedback>{errors.password}</FormFeedback>) : null}
                                        </FormGroup>



                                        <Button type="submit" disabled={isSubmitting || !isValid} onClick={handleSubmit}>
                                            Sign Up
                                        </Button>
                                    </div>
                                )}

                        </Formik>
                        <div className='login'>
                            <p>Already Registered in Afokado ?</p>
                            <NavLink to='/auth'>Login</NavLink>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}
const mapStateToProps = ({ auth }) => {
    return {
        added: auth.added
    }
}
export default connect(mapStateToProps, { sign })(Signup_student);
