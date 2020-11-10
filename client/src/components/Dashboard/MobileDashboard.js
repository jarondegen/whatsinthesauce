import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../auth';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '../LoginForm';
import SignUpForm from '../SignupForm';
import '../../style/mobile-dashboard.css';
import arrow from '../../style/images/down-arrow.png';
import ShoppingLists from '../ShoppingList/ShoppingList';
import ListPage from '../ShoppingList/ListPage'
import MobileDashFridge from './MobileDashFridge';

const MobileDashboard = ({dollars, setIsLoading, 
    setDollars, closeDoor, setHomeListId, handleArrowClick, 
    homeListId, showSignUp, setShowSignUp}) => {

    const { currentUserId } = useContext(AuthContext);

    return (
        <div className="mobile-dashboard-container">
            <div className="mobile-background-color-splash"></div>
                {!currentUserId  && !showSignUp && <LoginForm setShowSignUp={setShowSignUp}/>}
                {!currentUserId && showSignUp && <SignUpForm setShowSignUp={setShowSignUp}/>}
                {currentUserId && homeListId && <ListPage setHomeListId={setHomeListId} listId={homeListId} />}
                {currentUserId && !homeListId && (
                    <div onClick={handleArrowClick} className="no-list-container">
                        <div className="mobile-no-lists-loaded-div">Pick one of your lists...</div> 
                        <img  id="mobile-homepage-arrow" src={arrow}/>
                    </div>
                )}
                {currentUserId && <ShoppingLists closeDoor={closeDoor} homeListId={homeListId} setHomeListId={setHomeListId}/>}
                {currentUserId && <MobileDashFridge dollars={dollars} setIsLoading={setIsLoading} setDollars={setDollars}/>}
        </div>
    );
};

export default MobileDashboard;