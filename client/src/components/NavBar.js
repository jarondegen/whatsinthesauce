import React, { useContext } from 'react';
import AuthContext from '../auth';
import { NavLink } from 'react-router-dom';
import '../style/navbar.css'

const NavBar = ({logoutUser}) => {
    const { currentUserId } = useContext(AuthContext);
    return (
        <div className="navbar-container">
            <div className="narbar-left">
                <p>WhatsInTheSauce?</p>
            </div>
            <div className="narbar-middle">

            </div>
            <div className="narbar-right">
                <NavLink className="navbar-link" to="/home" activeclass="active">Home</NavLink>
                <NavLink className="navbar-link" to="/users" activeclass="active">Users</NavLink>
                {currentUserId ? (
                    <a className="navbar-link" onClick={logoutUser} href="#" activeclass="active">Logout</a> 
                ): <NavLink className="navbar-link" to="/home" activeclass="active">Login</NavLink>
                }
            </div>
        </div>
    );
}

export default NavBar