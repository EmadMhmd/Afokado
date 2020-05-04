import React , {Component, Fragment } from 'react';
import { UncontrolledAlert } from 'reactstrap';
import {connect} from 'react-redux';

class Message extends Component{

    
    _renderMessage(){
        const msg={
            marginBottom:'0'
        }
        const {message , error}=this.props;
        if(error && !message){
            return (
                <UncontrolledAlert style={msg} color='danger'>
                        {error}
                </UncontrolledAlert>
            );
        }
        else if(message && !error){
            return (
            <UncontrolledAlert style={msg} color='dark'>
                {message}
            </UncontrolledAlert>
            );
        }else if(message && error){
            return (
                <Fragment>
                    <UncontrolledAlert style={msg} color='danger' >
                        {error}
                    </UncontrolledAlert>
                    <UncontrolledAlert style={msg}  color='dark'>
                        {message}
                    </UncontrolledAlert >
                </Fragment>
                
            );
        }else{
            return <></>
        }
    }
    render(){
        return(
            <div >
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