import React ,{Component} from 'react';
import moment from 'moment';



//arr of months
const months = moment.months()
class SelectMonth extends Component {

    handleChange(e) {
        const select_value=e.target.value;
        console.log(select_value);
    }
    render(){
        const { selected } = this.props;
        return(
            <div>
                <span>Selecy Month</span>
                <select value={ selected } onChange={this.handleChange.bind(this)}>
                    {months.map((month , index)=>(
                        <option  value={index} key={index}>{month}</option>
                        ))}
                </select>
            </div>
        )
    }
}

export default SelectMonth;