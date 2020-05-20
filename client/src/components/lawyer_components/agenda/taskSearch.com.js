import React, { Component } from 'react';
import { FormGroup, Button, Input } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { fetchTasks } from '../../../actions/task.action';
import Background from '../../../images/home3.jpg';


const homeStyle = {
    backgroundImage: "url(" + Background + ")"
};


class TaskSearch extends Component {
    _handleFormSubmit = (values, bag) => {
        const {fetchTasks}=this.props
        fetchTasks(values)
    }
    render() {
        return (
            <div className='searchCom highOne' style={homeStyle}>
                <p className='searchPara'>Task Search</p>
                <Formik
                    className='form'
                    initialValues={{ dateline: '', subLawyer: ''}}
                    validationSchema={Yup.object().shape({
                        dateline: Yup.date(),
                        subLawyer: Yup.string(),

                    })}
                    onSubmit={this._handleFormSubmit.bind(this)}

                >


                    {({
                        values,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    }) => (
                            <div>
                                <FormGroup>
                                    <Input
                                        className='firstSearchCell cellSizeThree'
                                        placeholder="select day"
                                        type="date"
                                        name="dateline"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.dateline}
                                    />
                                </FormGroup >
                                <FormGroup>
                                    <Input
                                        className='cell cellSizeThree'
                                        type="text"
                                        name="subLawyer"
                                        placeholder="Worker"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.subLawyer}
                                    />
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


export default connect(null, {fetchTasks})(TaskSearch);