import React, { Component } from 'react';


class About extends Component {
    componentDidMount() {
        document.title='AFokado | About'
    }
 
    render() {
        return (
            <div>
                <div className='bg items'>
                    <div className='listConatiner'>
                        <div cleas='headBar'>
                            <h3 className='header'>About</h3>
                        </div>

                            <div className='item'>
                                <h3 className='itemHeader'>About</h3>
                                <div className='itemBody'>
                                   
                                    <p className='bodyPara txt'>
                                    This website is intended for the person to search for a certain lawyer he knows or does not know and offers attorneys and evaluation for each lawyer by previous clients to help the modern client in choosing a distinguished lawyer to assist him in his case or legal advice. This website also helps students to search for lawyers to train them in the legal profession Also, this site helped the lawyer to register all the data of his personal office by adding agendas
                                    </p>
                                    
                                 </div>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;