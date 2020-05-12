import React, { Component} from 'react';
import { Alert } from 'reactstrap';

class EmptyMessage extends Component {
    render() {
        const {message} =this.props
        return (
            <div >
                <Alert style={{marginBottom:'0' }} color='dark'>
                     {message} 
                </Alert>           
            </div>
        )
    }
}

export default EmptyMessage