import React from 'react';
import {Link} from 'react-router-dom';
import secGif from '../../assets/sec2.gif';
import docGif from '../../assets/doc2.gif';
import pharGif from '../../assets/phar1.gif';
import admGif from '../../assets/adm1.gif';
import './Menu-Styles.css';
import NavComp from '../Nav/Nav-Component';

class Menu extends React.Component {
    constructor(props){
        super(props);
        this.state={
            portals:[
                {
                    id:1,
                    link:'/security',
                    gif:secGif,
                    subHead:'Security'
                },
                {   
                    id:2,
                    link:'/doctor',
                    gif: docGif,
                    subHead:'Doctor'
                },
                {
                    id:3,
                    link:'/pharmacy',
                    gif: pharGif,
                    subHead:'Pharmacy'
                },
                {
                    id:4,
                    link:'/admin',
                    gif: admGif,
                    subHead:'Admin'
                }
            ]
        }
    }
    render(){
        const Portals = this.state.portals;
        return(
            <div>
                <NavComp />
                <div>
                    {Portals.map((portal) => {
                        return(
                            <Link to={portal.link} key={portal.id}>
                                <div className='portal'>
                                    <div>
                                        <img src={portal.gif} alt={portal.subHead}/>
                                    </div>
                                    <h3 className='subhead'>{portal.subHead}</h3>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className='footer'>
                    <p>&copy;2020 CopyRight : Hospital Management System-RGUKT, contact:<a href="mailto:N151282@rguktn.ac.in">hms@rguktn.ac.in</a></p>
                </div>
            </div>
            
        );
    }
}

export default Menu;