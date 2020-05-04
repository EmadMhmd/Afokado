import React, { Component, Fragment } from 'react';
import {withRouter} from 'react-router-dom'
import './bookHeader.com.css';
import Background from './home3.jpg';
import { FormGroup, Button, Input } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { fetchLawyers } from '../../../actions/lawyer.action.js';
import axios from 'axios';
var homeStyle = {
    backgroundImage: "url(" + Background + ")",
    height:"400px"
};

class LawyerSearchHeader extends Component {
    _handleFormSubmit = (values, bag) => {
        const { fetchLawyers } = this.props;
        fetchLawyers(values)
        this.props.history.push('/list');
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
            <div className='home'>
                <div className='head' style={homeStyle}>
                    <h1>Finding a Lawyer in Egypt has never been <br />
                       easier</h1>
                    <p>Book Online Now</p>
                    <Formik
                        className='form'
                        initialValues={{ userName: '', city: '', spec: '' }}
                        validationSchema={Yup.object().shape({
                            userName: Yup.string(),
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
                                            placeholder="Name"
                                            type="text"
                                            name="userName"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.userName}
                                        />
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
                                            <option className='searchoOption'>Select Spec</option>
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
                                            <option className='searchoOption'>Select City</option>
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
            </div>
        )
    }
}

const searchWithRouter=withRouter(LawyerSearchHeader)
export default connect(null, { fetchLawyers })(searchWithRouter);