import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback ,Row ,Col} from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './signup.com.css';
import { connect } from 'react-redux';
import { sign } from '../../../actions/auth.actions.js';



class Signup_lawyer extends Component {

    _handleFormSubmit = (values, bag) => {
        //apiSignup(values)

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
            <div className='bg'>
                <div className='container'>
                    <div className='sign'>
                        <h3>Sign Up</h3>
                        <Formik
                            enctype="multipart/form-data"
                            initialValues={{ userName: '', img: '', email: '', password: '', mobile: '', age: '', address: '', city: '', state: '', spec: '',sspec: '', zip: '' ,gender:''}}
                            validationSchema={Yup.object().shape({
                                userName: Yup.string().required(),
                                email: Yup.string().email().required(),
                                password: Yup.string().min(6).required(),
                                mobile: Yup.number().min(11).required(),
                                gender:Yup.string(),
                                age: Yup.number(),
                                address: Yup.string(),
                                city: Yup.string(),
                                state: Yup.string(),
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
                                /* and other goodies */
                            }) => (
                                    <div>
                                        <FormGroup  className='field'>
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
                                            <Label>User Img</Label>
                                            <Input
                                                placeholder="Enter Your user Img"
                                                invalid={errors.img && touched.img && errors.img}
                                                type="file"
                                                name="img"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.img}
                                            />

                                            {errors.img && touched.img ? (<FormFeedback>{errors.img}</FormFeedback>) : null}
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

                                        <FormGroup>
                                            <Label>Major Spec</Label>
                                            <Input 
                                                type="select" 
                                                name="spec"
                                                placeholder="select Your spec"
                                                invalid={errors.spec && touched.spec && errors.spec}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.spec} 
                                                >
                                                <option>spec 1</option>
                                                <option>spec 2</option>
                                                <option>spec 3</option>
                                                <option>spec 4</option>
                                            </Input>
                                            {errors.spec && touched.spec ? (<FormFeedback>{errors.spec}</FormFeedback>) : null}
                                        </FormGroup>
                                                                         <FormGroup>
                                            <Label>secondary Spec</Label>
                                            <Input 
                                                type="select" 
                                                name="sspec"
                                                placeholder="select Your secondary spec"
                                                invalid={errors.sspec && touched.sspec && errors.sspec}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.sspec} 
                                                >
                                                <option>spec 1</option>
                                                <option>spec 2</option>
                                                <option>spec 3</option>
                                                <option>spec 4</option>
                                            </Input>
                                            {errors.sspec && touched.sspec ? (<FormFeedback>{errors.sspec}</FormFeedback>) : null}
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
                                                value={values.gender} 
                                                >
                                                <option>Male</option>
                                                <option>Femal</option>
                                                
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
const mapStateToProps = ({ auth }) => {
    return {
        added: auth.added
    }
}
export default connect(mapStateToProps, { sign })(Signup_lawyer);
