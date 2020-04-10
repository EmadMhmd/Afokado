import React from 'react';


const spinner=({size})=>{
    let spinnerSize = size ? size : 30 ;
    return(
        <div   style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',marginTop:30
    
    }} >
            <i className='fas fa-spinner fa-spin'  style={{fontSize:spinnerSize}} />
        </div>
    )
}

export default spinner;