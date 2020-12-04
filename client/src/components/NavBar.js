import React, { useContext } from 'react';
import AuthContext from '../auth';
import { NavLink } from 'react-router-dom';
import logo from '../style/images/logo.png';
import hamburger from '../style/images/hamburger.png';
import '../style/navbar.css';

const NavBar = ({logoutUser}) => {
    const { currentUserId } = useContext(AuthContext);
    
    const handleBurgerClick = (e) => {
        const mobileMenu = document.getElementById('mobile-nav-links');
        if (mobileMenu) {
            mobileMenu.classList.toggle('show')
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
                    <img alt="WITS Logo" className="navbar-logo"src={logo}/>
                </div>
                <div className="narbar-middle">

                </div>
                <div className="narbar-right">
                    <NavLink className="navbar-link" to="/home" activeclass="active">Home</NavLink>
                    <NavLink className="navbar-link" to="/about" activeclass="active">About</NavLink>
                    {currentUserId ? (
                        <span id="desktop-logout-button" className="navbar-link" onClick={logoutUser} activeclass="active">Logout</span> 
                    ):  (
                        <NavLink onClick={handleBurgerClick} className="navbar-link" to="/home" activeclass="active">Login</NavLink>
                    )}
                    <div onClick={handleBurgerClick} className="hamburger-div mobile">
                        <img alt="open menu" id="burge" src={hamburger}/>
                    </div>
                </div>
            </div>
            <div id="mobile-nav-links" className="mobile-navbar-links-div mobile">
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
                    {currentUserId && (
                    <NavLink onClick={handleBurgerClick} className="navbar-link-m" to="/account" activeclass="active">
                        <div className="mobile-account-link mobile-nav-container">
                            Account
                        </div>
                    </NavLink> )}
                {currentUserId ? (
                    <span onClick={handleLogout} className="navbar-link-m" activeclass="active">
                        <div className="mobile-logout-link mobile-nav-container">
                            Logout
                        </div>
                    </span> 
                ): (
                    <NavLink onClick={handleBurgerClick} className="navbar-link-m" to="/home" activeclass="active">
                        <div className="mobile-login-link mobile-nav-container">
                            Login
                        </div>
                    </NavLink>)}
            </div>
        </>
    );
}

export default NavBar