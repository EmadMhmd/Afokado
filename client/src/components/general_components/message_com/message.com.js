import React , {Component, Fragment } from 'react';
import { Alert } from 'reactstrap';
import {connect} from 'react-redux';

class Message extends Component{
    _renderMessage(){
        const {message , error}=this.props;
        if(error && !message){
            return (
                <Alert color='danger'>
                        {error}
                </Alert>
            );
        }
        else if(message && !error){
            return (
            <Alert color='dark'>
                {message}
            </Alert>
            );
        }else if(message && error){
            return (
                <Fragment>
                    <Alert color='danger'>
                        {error}
                    </Alert>
                        <Alert color='dark'>
                        {message}
                    </Alert>
                </Fragment>
                
            );
        }else{
            return <></>
        }
    }
    render(){
        return(
            <div>
               {this._renderMessage()}
            </div>
        )
    }
}
const mapStateToProps=({message ,error})=>{
return{
    message:message.message,
    error:error.err
}
}
export default  connect(mapStateToProps)(Message);