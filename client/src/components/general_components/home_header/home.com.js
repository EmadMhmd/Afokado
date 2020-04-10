import React , {Component} from 'react';
import './home.style.css';
import Background from './home3.jpg';
import {FormGroup ,Button ,Input } from 'reactstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {fetchLawyers} from '../../../actions/lawyer.action.js';


//import List from '../List/list';

var homeStyle = {
    backgroundImage: "url(" +  Background  + ")",
  };

class Home extends Component{
    _handleFormSubmit = (values, bag) => {
        const { fetchLawyers } = this.props;
        fetchLawyers(values)
        this.props.history.push('/list');
    }
    render(){
        return(
            <div className='home'>
                <div className='header' style={ homeStyle }>
                    <h1>Finding a Lawyer in Egypt has never been <br/>
                       easier</h1>
                    <p>Book Online Now</p>
                    <Formik
                            initialValues={{ userName: '', city: '', spec: ''}}
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
                              
                                /* and other goodies */
                            }) => (
                                    <div>
                                        <FormGroup className='field'>
                                            <Input
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
                                                type="select" 
                                                name="spec"
                                                placeholder="spec"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.spec} 
                                                >
                                                <option >Select Spec</option>
                                                <option value='spec 1'>spec 1</option>
                                                <option value='spec 2'>spec 2</option>
                                                <option value='spec 3'>spec 3</option>
                                                <option value='spec 4'>spec 4</option>
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Input
                                                type="text"
                                                name="city"
                                                placeholder="city"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.city}
                                            />
                                        </FormGroup>



                                        <Button type="submit" onClick={handleSubmit}>
                                            Search
                                        </Button>
                                    </div>
                                )}

                        </Formik>

                    
                </div>
                <div className='steps'>
                    <h2>How To Book with Afokado?</h2>
                </div>
                
            </div>
        )
    }
}


export default connect(null,{fetchLawyers})(Home);