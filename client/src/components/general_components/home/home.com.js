import React ,{useEffect}from 'react';
import LawyerSearchHeader from '../book_search_header/bookHeader.com';
import HowToBook from './howToBook';


const Home =()=>{
        useEffect(() => {
            document.title='Afokado'       
    })
    return(
        <div>
            <LawyerSearchHeader />
            <HowToBook />
        </div>
    )
}

export default Home