import React, { Component } from 'react';
import { FormGroup, Button, Input } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { fetchCases } from '../../../actions/case.action';
import Background from '../../../images/home3.jpg';


const homeStyle = {
    backgroundImage: "url(" + Background + ")",
    height:"250px"
};

class CaseSearch extends Component {
    _handleFormSubmit = (values, bag) => {
        const {fetchCases}=this.props
        fetchCases(values)
    }
    render() {
        return (
            <div className='searchCom' style={homeStyle}>
                <p className='searchPara'>Case Search</p>
                <Formik
                    initialValues={{ archive: '', type: ''}}
                    validationSchema={Yup.object().shape({
                        archive: Yup.string(),
                        type: Yup.string(),

                    })}
                    onSubmit={this._handleFormSubmit.bind(this)}

                >


                    {({
                        values,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        /* and other goodies */
                    }) => (
                            <div>
                                <FormGroup >
                                    <Input
                                        className='firstSearchCell cellSizeThree'
                                        placeholder="Status"
                                        type="select"
                                        name="archive"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.archive}
                                    >
                                        <option className='searchOption' value='em'>Select Status</option>
                                        <option className='searchOption' value='archive'>Archive</option>
                                        <option className='searchOption' value='current'>Current</option>
                                    </Input>
                                </FormGroup >
                                <FormGroup>
                                    <Input
                                        className='cell cellSizeThree'
                                        type="select"
                                        name="type"
                                        placeholder="spec"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.spec}
                                    >
                                        <option className='searchOption'  value='em'>Select Case Type</option>
                                        <option className='searchOption'  value='criminal'>Criminal</option>
                                        <option className='searchOption'  value='civil'>Civil</option>
                                        <option className='searchOption'  value='legitimate'>Legitimate</option>
                                        <option className='searchOption'  value='state council'>State Council</option>
                                    </Input>
                                </FormGroup>
                                
                                <Button type="submit" onClick={handleSubmit} className='cell searchBtn cellSizeThree'>
                                    Search
                                </Button>
                            </div>
                        )}

                </Formik>

            </div>

        )
    }
}


export default connect(null, {fetchCases})(CaseSearch);