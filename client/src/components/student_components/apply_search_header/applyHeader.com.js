import React , {Component} from 'react';
import './applyHeader.com.css';
import Background from './home3.jpg';
import {FormGroup ,Button ,Input } from 'reactstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {fetchInternshipsForApply} from '../../../actions/internalship.action.js';


var homeStyle = {
    backgroundImage: "url(" +  Background  + ")",
};
class Header extends Component{
    _handleFormSubmit = (values, bag) => {
        const { fetchInternshipsForApply } = this.props;
        fetchInternshipsForApply(values)
        //this.props.history.push('/list');
    }
    render(){
        return(
            <div className='head' style={ homeStyle }>

                <p>Best Lawyers in Egypt</p>
                <Formik
                            initialValues={{ paid: '', city: '', spec: ''}}
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
                                        <FormGroup className='field'>
                                            <Input
                                                placeholder="paid"
                                                type="number"
                                                name="paid"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.paid}
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
                                                <option  value='spec 1'>spec 1</option>
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
        
        )
    }
}


export default connect(null,{fetchInternshipsForApply})(Header);