import React, { useContext } from 'react';
import AuthContext from '../../auth';
import { useSelector } from 'react-redux';
import LoginForm from '../LoginForm';
import SignUpForm from '../SignupForm';
import '../../style/mobile-dashboard.css';
import arrow from '../../style/images/down-arrow.png';
import ShoppingLists from '../ShoppingList/ShoppingList';
import ListPage from '../ShoppingList/ListPage'
import MobileDashFridge from './MobileDashFridge';
import Recipes from '../Recipes/Recipes';
import happyFace from '../../style/images/happy-face.gif';
import sauceCooking from  '../../style/images/sauce-cooking.png';
import whisk from '../../style/images/whisk.png';

const MobileDashboard = ({dollars, setIsLoading, 
    setDollars, closeDoor, setHomeListId, handleArrowClick, 
    homeListId, showSignUp, setShowSignUp, recipesLoading}) => {
    
    const { currentUserId } = useContext(AuthContext);
    const { recipes } = useSelector(store => store.Recipes)

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
                        <div className="mobile-homepage-drawings-div">
                            <img alt="arrow pointing to lists" id="mobile-homepage-arrow" src={arrow}/>
                            <img alt="decoritive sauce pot" id="mobile-homepage-pot" src={sauceCooking} />
                        </div>
                    </div>
                )}
                {currentUserId && <ShoppingLists closeDoor={closeDoor} homeListId={homeListId} setHomeListId={setHomeListId}/>}
                {currentUserId && recipesLoading && (
                    <div className="recipes-loading-container">
                        <div className="recipes-loading-text">looking for recipes based on whats in your fridge...</div>
                        <img alt="loading animation" className="recipes-loading-gif"src={happyFace} />
                    </div>
                )}
                {currentUserId && !recipesLoading && (
                    <div className="recipes-loading-container">
                        <div className="recipes-loading-text">check out the recipes we found for you..</div>
                        <div className="mobile-recipes-loaded-images-div" onClick={() => document.querySelector('.recipes-component-container').scrollIntoView()}>
                            <img alt="arrow pointing to recipes" className="recipes-loading-arrow"src={arrow} />
                            <img alt="decoritve whisk" className="mobile-whisk" src={whisk} />
                        </div>
                    </div>
                
                )}
                <div className="recipes-component-container">
                    {currentUserId && <Recipes />}
                </div>
                {recipes && currentUserId && <div onClick={() => document.querySelector('.navbar-logo').scrollIntoView()} className="back-to-top-container">
                    scroll to top...
                </div>}
        </div>
    );
};

export default MobileDashboard;