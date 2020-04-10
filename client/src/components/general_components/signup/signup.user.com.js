import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback ,Row ,Col} from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './signup.com.css';
import { connect } from 'react-redux';
import { sign } from '../../../actions/auth.actions.js';
import Message from '../../general_components/message_com/message.com';




class Signup_user extends Component {
    _handleFormSubmit = (values, bag) => {
        if (values) {
            const { sign } = this.props;
            values.type = 1;
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
                        < Message />
                        <Formik
                            initialValues={{ userName: '', email: '', password: '', mobile: '', address: '', city: '', state: '', zip: '' }}
                            validationSchema={Yup.object().shape({
                                userName: Yup.string().required(),
                                email: Yup.string().email().required(),
                                password: Yup.string().min(6).required(),
                                mobile: Yup.number().min(11).required(),
                                address: Yup.string(),
                                city: Yup.string(),
                                state: Yup.string(),

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
                                                        type="text"
                                                        name="city"
                                                        placeholder="city"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.city}
                                                    />
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
const mapStateToProps = ({ auth ,error }) => {
    return {
        added: auth.added,
        error:error.err
    }
}
export default connect(mapStateToProps, { sign })(Signup_user);
