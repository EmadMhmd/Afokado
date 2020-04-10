import React, { Component} from 'react';
import { Alert } from 'reactstrap';

class EmptyMessage extends Component {
    render() {
        const {data} =this.props
        return (
            <div>
                <Alert color='dark'>
                    oops! you still don't have any {data} !?
                </Alert>           
            </div>
        )
    }
}

export default EmptyMessage