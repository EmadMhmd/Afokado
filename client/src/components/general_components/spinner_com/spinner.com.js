import React from 'react';
import {Spinner} from 'reactstrap';


const spinner=()=>{
    
    return(
        <div   style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',marginTop:100 , marginBottom:40 }} >
            {/* <i className='fas fa-spinner fa-spin'  style={{fontSize:spinnerSize}} /> */}
            <Spinner  style={{ width: '3rem', height: '3rem' , color:'#0070cd'}}/>
        </div>
    )
}

export default spinner;