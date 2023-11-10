import React from "react";
import './Navigation.css';
import {NavLink} from "react-router-dom";

function Navigation() {
    return (
        <nav>
            <div className="nav-container">
                <ul>
                    <li><NavLink to="/"
                                 className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                    >Home</NavLink>
                    </li>
                    <li><NavLink to="/persons"
                                 className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                    >Personen</NavLink>
                    </li>
                    <li><NavLink to="/relations"
                                 className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                    >Relaties</NavLink>
                    </li>
                    <li><NavLink to="/children"
                                 className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                    >Kinderen</NavLink>
                    </li>
                    <li><NavLink to="/trees"
                                 className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                    >Stambomen</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation;