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
import Recipes from '../Recipes/Recipes';
import happyFace from '../../style/images/happy-face.gif';

const MobileDashboard = ({dollars, setIsLoading, 
    setDollars, closeDoor, setHomeListId, handleArrowClick, 
    homeListId, showSignUp, setShowSignUp, recipesLoading}) => {

    const { currentUserId } = useContext(AuthContext);

    return (
        <div className="mobile-dashboard-container">
            <div className="mobile-background-color-splash"></div>
                {!currentUserId  && !showSignUp && <LoginForm setShowSignUp={setShowSignUp}/>}
                {!currentUserId && showSignUp && <SignUpForm setShowSignUp={setShowSignUp}/>}
                {currentUserId && <MobileDashFridge dollars={dollars} setIsLoading={setIsLoading} setDollars={setDollars}/>}
                {currentUserId && homeListId && <ListPage setHomeListId={setHomeListId} listId={homeListId} />}
                {currentUserId && !homeListId && (
                    <div onClick={handleArrowClick} className="no-list-container">
                        <div className="mobile-no-lists-loaded-div">Pick one of your lists...</div> 
                        <img  id="mobile-homepage-arrow" src={arrow}/>
                    </div>
                )}
                {currentUserId && <ShoppingLists closeDoor={closeDoor} homeListId={homeListId} setHomeListId={setHomeListId}/>}
                {currentUserId && recipesLoading && (
                    <div className="recipes-loading-container">
                        <div className="recipes-loading-text">looking for recipes based on whats in your fridge...</div>
                        <img className="recipes-loading-gif"src={happyFace} />
                    </div>
                )}
                {currentUserId && !recipesLoading && (
                    <div className="recipes-loading-container">
                        <div className="recipes-loading-text">check out the recipes we found for you..</div>
                        <img onClick={() => document.querySelector('.recipes-component-container').scrollIntoView()} className="recipes-loading-arrow"src={arrow} />
                    </div>
                
                )}
                <div className="recipes-component-container">
                    {/* {currentUserId && <Recipes />} */}
                </div>
        </div>
    );
};

export default MobileDashboard;