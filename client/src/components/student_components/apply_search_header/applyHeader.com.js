import React, { Component,Fragment } from 'react';
import Background from '../../../images/home3.jpg';
import { FormGroup, Button, Input } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { fetchInternshipsForApply } from '../../../actions/internalship.action.js';
import axios from 'axios';

var homeStyle = {
    backgroundImage: "url(" + Background + ")",
    height: "300px"
};
class Header extends Component {
    _handleFormSubmit = (values, bag) => {
        const { fetchInternshipsForApply } = this.props;
        fetchInternshipsForApply(values)
        //this.props.history.push('/list');
    }
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
    }
    renderSpecOptions() {
        return (
            <Fragment>
                {this.state.spec.map(sp => (
                    <option key={Math.random()} value={sp} className='searchoOption'>{sp}</option>
                ))}
            </Fragment>
        )
    }
    renderCityOptions() {
        return (
            <Fragment>
                {this.state.city.map(ct => (
                    <option key={Math.random()} value={ct} className='searchoOption'>{ct}</option>
                ))}
            </Fragment>
        )
    }
    render() {
        return (
            <div className='searchCom' style={homeStyle}>

                <p className='searchPara'>Best Lawyers in Egypt</p>
                <Formik
                    className='form'
                    initialValues={{ paid: '', city: '', spec: '' }}
                    validationSchema={Yup.object().shape({
                        paid: Yup.number(),
                        city: Yup.string(),
                        spec: Yup.string(),

                    })}
                    onSubmit={this._handleFormSubmit.bind(this)}

                >


                    {({
                        values,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }) => (
                            <div>
                                <FormGroup >
                                    <Input
                                        className='firstSearchCell cellSizeFour'
                                        placeholder="paid"
                                        type="select"
                                        name="paid"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.paid}
                                    >
                                        <option>Paid/Unpaid</option>
                                        <option value='paid'>Paid</option>
                                        <option value='unpaid'>Unpaid</option>
                                    </Input>
                                </FormGroup >
                                <FormGroup>
                                    <Input
                                        className='cell cellSizeFour'
                                        type="select"
                                        name="spec"
                                        placeholder="spec"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.spec}
                                    >
                                        <option className='searchOption'>Select All Spec</option>
                                        {this.renderSpecOptions()}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        className='cell cellSizeFour'
                                        type="select"
                                        name="city"
                                        placeholder="city"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.city}
                                    >
                                        <option className='searchOption'>Select all cities</option>
                                        {this.renderCityOptions()}
                                    </Input>
                                </FormGroup>



                                <Button type="submit" onClick={handleSubmit} className='cell searchBtn cellSizeFour'>
                                    Search
                                 </Button>
                            </div>
                        )}

                </Formik>

            </div>

        )
    }
}


export default connect(null, { fetchInternshipsForApply })(Header);