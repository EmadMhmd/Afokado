import React ,{Component} from 'react';
import { apply } from '../../../actions/apply.action.js';
import {Button} from 'reactstrap';
import {connect} from 'react-redux';

class ApplyPage extends Component{
    componentDidMount(){

    }
    render(){
        const {apply}=this.props
        return(
            <div>
                <h1>{this.props.match.params.id}</h1>
                <Button onClick={()=>apply(this.props.match.params.id)} >Apply Now</Button>
            </div>
        )
    }
}

export default connect(null,{apply})(ApplyPage);