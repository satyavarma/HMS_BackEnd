import React from 'react';
import {Link} from 'react-router-dom';
import secGif from '../../assets/sec2.gif';
import docGif from '../../assets/doc2.gif';
import pharGif from '../../assets/phar1.gif';
import admGif from '../../assets/adm1.gif';
import './Nav-Styles.css';

class NavComp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            portals:[
                {
                    id:0,
                    link:'/',
                    subHead:'Home'
                },
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
            <div className="nav">
                <ul>
                    <li className="nav_ele">
                        {
                            Portals.map((portal) => {
                                return(
                                    <Link to={portal.link} key={portal.id}>
                                            <span className="portal_name">{portal.subHead}</span>
                                    </Link>
                                );
                            })
                        }
                    </li>
                </ul>  
            </div>
        );
    }
}

export default NavComp;