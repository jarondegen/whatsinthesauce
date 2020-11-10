import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../auth';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '../LoginForm';
import SignUpForm from '../SignupForm';
import '../../style/mobile-dashboard.css';


const MobileDashboard = ({showSignUp, setShowSignUp}) => {
    const { currentUserId } = useContext(AuthContext);


    return (
        <div className="mobile-dashboard-container">
            <div className="mobile-background-color-splash"></div>
                {!currentUserId  && !showSignUp && <LoginForm setShowSignUp={setShowSignUp}/>}
                {!currentUserId && showSignUp && <SignUpForm setShowSignUp={setShowSignUp}/>}
        </div>
    );
};

export default MobileDashboard;