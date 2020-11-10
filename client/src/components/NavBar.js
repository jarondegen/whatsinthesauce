import React, { useContext, useState } from 'react';
import AuthContext from '../auth';
import { NavLink } from 'react-router-dom';
import logo from '../style/images/logo.png';
import hamburger from '../style/images/hamburger.png';
import '../style/navbar.css';

const NavBar = ({logoutUser}) => {
    const [clicked, setClicked] = useState(false)
    const { currentUserId } = useContext(AuthContext);
    
    const handleBurgerClick = (e) => {
        if (clicked) {
            setClicked(false)
        }
        else {
            setClicked(true)
        }
    }

    const handleLogout = () => {
        handleBurgerClick()
        logoutUser()
    }

    return (
        <>
            <div className="navbar-container">
                <div className="narbar-left">
                    <img className="navbar-logo"src={logo}/>
                </div>
                <div className="narbar-middle">

                </div>
                <div className="narbar-right">
                    <NavLink className="navbar-link" to="/home" activeclass="active">Home</NavLink>
                    <NavLink className="navbar-link" to="/about" activeclass="active">About</NavLink>
                    {currentUserId ? (
                        <a className="navbar-link" onClick={logoutUser} href="#" activeclass="active">Logout</a> 
                    ): <NavLink onClick={handleBurgerClick} className="navbar-link" to="/home" activeclass="active">Login</NavLink>
                    }
                    <div onClick={handleBurgerClick} className="hamburger-div mobile">
                        <img id="burge" src={hamburger}/>
                    </div>
                </div>
            </div>
            {clicked && (
            <div className="mobile-navbar-links-div mobile">
                    <NavLink onClick={handleBurgerClick} className="navbar-link-m" to="/home" activeclass="active">
                        <div className="mobile-home-link mobile-nav-container">
                            Home
                        </div>
                        </NavLink>
                    <NavLink onClick={handleBurgerClick} className="navbar-link-m" to="/about" activeclass="active">
                        <div className="mobile-about-link mobile-nav-container">
                            About
                        </div>
                    </NavLink>
                {currentUserId ? (
                    <a onClick={handleLogout} className="navbar-link-m" href="#" activeclass="active">
                        <div className="mobile-logout-link mobile-nav-container">
                            Logout
                        </div>
                    </a> 
                ): (
                    <NavLink onClick={handleBurgerClick} className="navbar-link-m" to="/home" activeclass="active">
                        <div className="mobile-login-link mobile-nav-container">
                            Login
                        </div>
                    </NavLink>)}
            </div>)}
        </>
    );
}

export default NavBar