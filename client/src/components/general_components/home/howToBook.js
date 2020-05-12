import React from 'react';
import {} from 'reactstrap';
import './howToBook.style.css';
const HowToBook = () => {
    return (
        <div className='steps'>
           <h3>How To Book With Afokado ?</h3> 
            <div className='step'>
                <i className='fa fa-search fal  fa-2x icon' />
                <h3><span>1</span>Search</h3>
                <p>By Specialty, area,lawyer name </p>
            </div>
            <div className='step'>
                {/* <i className='fa fa-gavel fal'/>
                <i className='fa fa-layer-group fal'/> */}
                <i className='fa fa-address-card far  fa-2x icon' />
                <h3><span>2</span>Compare and Choose</h3>
                <p>Based on real reviews and best matching </p>

            </div>
            <div className='step'>
                <i className='fa fa-clock fa-2x far icon' />
                <h3><span>3</span>Book</h3>
                <p>Pay at the office at no extra cost </p>
                {/* <i className='fa fa-calendar-alt far'/>
                <i className='fa fa-calendar-plus far'/> */}

            </div>
        </div>
    )
}

export default HowToBook