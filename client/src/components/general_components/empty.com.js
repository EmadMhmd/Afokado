import React, { Component} from 'react';
import { Alert } from 'reactstrap';

class EmptyMessage extends Component {
    render() {
        const {message} =this.props
        return (
            <div>
                <Alert color='dark'>
                     {message} 
                </Alert>           
            </div>
        )
    }
}

export default EmptyMessage