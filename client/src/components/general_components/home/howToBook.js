import React from 'react';

const HowToBook =()=>{
    return(
        <div className='steps'>
            How To Book With Afokado ?
            <div className='step'>
                <i className='fa fa-search fal  fa-2x '/>
                Search
            </div>
            <div className='step'>
            {/* <i className='fa fa-gavel fal'/>
            <i className='fa fa-layer-group fal'/> */}
            <i className='fa fa-address-card far  fa-2x '/>
                Compare
            </div>
            <div className='step'>
            <i className='fa fa-clock fa-2x far'/>
             {/* <i className='fa fa-calendar-alt far'/>
             <i className='fa fa-calendar-plus far'/> */}
                Book
            </div>
        </div>
    )
}

export default HowToBook