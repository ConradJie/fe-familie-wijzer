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
                </ul>
            </div>
        </nav>
    )
}

export default Navigation;