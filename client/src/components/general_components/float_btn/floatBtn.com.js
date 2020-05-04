import React from 'react';


const FloatBtn = ({onClick}) =>{
return(
    <div style={{position:'absolute' , bottom:0 , right:40 , cursor:'pointer'}}>
        <div style={{borderRadius:50 , height:60 , width:60 ,/*background:'#0070cd'*/ background:'red',display:'flex',flex:1,
        justifyContent:'center',alignItems:'center',color:'#fff',boxShadow:'2px 2px 3px #999'
    
    }}
    onClick={onClick}
    >
            <i className='fa fa-plus'/>
        </div>
    </div>
)
}


export default FloatBtn;