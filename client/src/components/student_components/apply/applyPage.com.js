import React ,{Component} from 'react';
import { apply } from '../../../actions/apply.action.js';
import {Button} from 'reactstrap';
import {connect} from 'react-redux';

class ApplyPage extends Component{
    componentDidMount(){

    }
    applied=()=>{
        const {apply}=this.props
        apply(this.props.match.params.id)
        this.props.history.push('/my_app')
    }
    render(){
        return(
            <div>
                <Button onClick={()=>this.applied()} >Apply Now</Button>
            </div>
        )
    }
}

export default connect(null,{apply})(ApplyPage);