import React from 'react';

const Star = ({ stars }) => {
    if (stars === 5) {
        return (

            <p className='comment'>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
            </p>

        )
    } else if (stars >= 4) {
        return (

            <p className='comment'>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star unchecked"></span>
            </p>

        )
    } else if (stars >= 3) {
        return (

            <p className='comment'>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star unchecked"></span>
                <span className="fa fa-star unchecked"></span>
            </p>

        )
    } else if (stars >= 2) {
        return (

            <p className='comment'>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star unchecked"></span>
                <span className="fa fa-star unchecked"></span>
                <span className="fa fa-star unchecked"></span>
            </p>

        )
    } else if (stars >= 1) {
        return (

            <p className='comment'>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star unchecked"></span>
                <span className="fa fa-star unchecked"></span>
                <span className="fa fa-star unchecked"></span>
                <span className="fa fa-star unchecked"></span>
            </p>

        )
    } else {
        return (

            <p className='comment'>
                <span className="fa fa-star unchecked"></span>
                <span className="fa fa-star unchecked"></span>
                <span className="fa fa-star unchecked"></span>
                <span className="fa fa-star unchecked"></span>
                <span className="fa fa-star unchecked"></span>
            </p>

        )
    }

}
export default Star;