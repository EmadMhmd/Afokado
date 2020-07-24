import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'reactstrap';
import emad from '../../../images/emad.jpg';
import yasser from '../../../images/yasser.jpg';
import karam from '../../../images/karam.jpg';
import ahmed from '../../../images/ahmed.jpg';
import omar from '../../../images/omar.jpg';
import karim from '../../../images/karim.jpg';

class OurTeam extends Component {

    componentDidMount() {
        document.title = 'Afokado | Our Team'
    }

    render() {
        return (
            <div>
                <div className="items bg">
                    <div className='listConatiner'>
                       
                            <h3 className='header' style={{ width: '320px' }}>Our Team</h3>
                            
                                <div className='item' >
                                    <h3 className='itemHeader'>Emad</h3>
                                    <div className='bodyImgSec'>
                                        <img src={emad} className='bodyImg' alt='Emad-img' />
                                    </div>
                                    <div className='itemBody bodyInfoSec' >
                                        <pre className='desc'>SoftWare Enginer</pre>
                                        <p className='bodyPara txt'>Full Stack Wb developer</p>
                                        <hr />
                                        <Button className='mainBtn btnN btnT'><Link className='btnLink' src='facebook.com'>Contact</Link></Button>
                                    </div>
                                </div>

                                <div className='item' >
                                    <h3 className='itemHeader'>Yasser</h3>
                                    <div className='bodyImgSec'>
                                        <img src={yasser} className='bodyImg' alt='Emad-img' />
                                    </div>
                                    <div className='itemBody bodyInfoSec' >
                                        <pre className='desc'>SoftWare Enginer</pre>
                                        <p className='bodyPara txt'>Full Stack Wb developer</p>
                                        <hr />
                                        <Button className='mainBtn btnN btnT'><Link className='btnLink' src='facebook.com'>Contact</Link></Button>
                                    </div>
                                </div>

                                <div className='item' >
                                    <h3 className='itemHeader'>Karim</h3>
                                    <div className='bodyImgSec'>
                                        <img src={karim} className='bodyImg' alt='Emad-img' />
                                    </div>
                                    <div className='itemBody bodyInfoSec' >
                                        <pre className='desc'>SoftWare Enginer</pre>
                                        <p className='bodyPara txt'>Full Stack Wb developer</p>
                                        <hr />
                                        <Button className='mainBtn btnN btnT'><Link className='btnLink' src='facebook.com'>Contact</Link></Button>
                                    </div>
                                </div>


                                <div className='item' >
                                    <h3 className='itemHeader'>Omar</h3>
                                    <div className='bodyImgSec'>
                                        <img src={omar} className='bodyImg' alt='Emad-img' />
                                    </div>
                                    <div className='itemBody bodyInfoSec' >
                                        <pre className='desc'>SoftWare Enginer</pre>
                                        <p className='bodyPara txt'>Full Stack Wb developer</p>
                                        <hr />
                                        <Button className='mainBtn btnN btnT'><Link className='btnLink' src='facebook.com'>Contact</Link></Button>
                                    </div>
                                </div>

                                <div className='item' >
                                    <h3 className='itemHeader'>Ahmed</h3>
                                    <div className='bodyImgSec'>
                                        <img src={ahmed} className='bodyImg' alt='Emad-img' />
                                    </div>
                                    <div className='itemBody bodyInfoSec' >
                                        <pre className='desc'>SoftWare Enginer</pre>
                                        <p className='bodyPara txt'>Full Stack Wb developer</p>
                                        <hr />
                                        <Button className='mainBtn btnN btnT'><Link className='btnLink' src='facebook.com'>Contact</Link></Button>
                                    </div>
                                </div>

                                <div className='item' >
                                    <h3 className='itemHeader'>karam</h3>
                                    <div className='bodyImgSec'>
                                        <img src={karam} className='bodyImg' alt='Emad-img' />
                                    </div>
                                    <div className='itemBody bodyInfoSec' >
                                        <pre className='desc'>SoftWare Enginer</pre>
                                        <p className='bodyPara txt'>Full Stack Wb developer</p>
                                        <hr />
                                        <Button className='mainBtn btnN btnT'><Link className='btnLink' src='facebook.com'>Contact</Link></Button>
                                    </div>
                                </div>
        
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default OurTeam;