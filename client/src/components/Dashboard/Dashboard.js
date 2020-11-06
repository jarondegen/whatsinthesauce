import React, { useState, useEffect, useContext } from 'react';
import ShoppingLists from '../ShoppingList/ShoppingList';
import { getFridgeItems } from '../../store/fridge';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../../auth';
import Recipes from '../Recipes/Recipes'
import '../../style/dashboard.css';
import DashFridge from './DashFridge';
import LoginForm from '../LoginForm';
import ListPage from '../ShoppingList/ListPage';
import arrow from '../../style/images/arrow.png'
import happyFace from '../../style/images/happy-face.gif';
import downArrow from '../../style/images/down-arrow.png';
import closedFridge from '../../style/images/real-fridge-closed.png';
import SignUpForm from '../SignupForm';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { lists } = useSelector(store => store.Lists);
    const { currentUserId } = useContext(AuthContext);
    const { Fridge } = useSelector(store => store);
    const [dollars, setDollars] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [homeListId, setHomeListId] = useState()
    const [recipesLoading, setRecipesLoading] = useState(true)
    const [showSignUp, setShowSignUp] = useState(false)

    const closeDoor = (e) => {
        const pickArrow = document.getElementById('homepage-arrow');
        document.querySelector('.fridge-container').style.backgroundImage  = `url(${closedFridge})`
        setTimeout(() => {
            document.querySelector('.freezer-door-container').style.display = 'none';
            document.querySelector('.inside-fridge-container').style.display = 'none';
            if (pickArrow) pickArrow.style.zIndex = 10 
        }, 100)
        document.getElementById('open-button-1').setAttribute('class', 'top-right-holder')
        document.getElementById('open-button-2').setAttribute('class', 'bottom-right-holder')
        document.getElementById('open-button-3').style.display = 'none';
        document.getElementById('open-button-4').style.display = 'none';
    }

    useEffect(() => {
        dispatch(getFridgeItems(currentUserId));
    }, []);
    
    useEffect(() => {
        Fridge.map(item => {
            return item.expiring_soon ? setDollars(dollars + item.price) : null
        })
        setIsLoading(false)
    }, [Fridge]);

    const handleArrowClick = () => {
        const listPaper = document.querySelector('.lists-container')
        listPaper.style.transform = 'scale(1.25)';
        setTimeout(() => {
            listPaper.style.transform = 'scale(1)'
        },250)
    }

    return (
        <>
            {isLoading ? <p>Loading...</p> : (
                <>
                    <div className="dashboard-page-container">
                        <div className="background-color-splash"></div>
                        {!currentUserId  && !showSignUp && <LoginForm setShowSignUp={setShowSignUp}/>}
                        {showSignUp && <SignUpForm setShowSignUp={setShowSignUp}/>}
                        {currentUserId && !homeListId && (
                            <div onClick={handleArrowClick} className="no-list-container">
                                <div class="no-lists-loaded-div">Pick one of your lists...</div> 
                                <img  id="homepage-arrow" src={arrow}/>
                            </div>
                        )}
                        {homeListId && <ListPage listId={homeListId} />}
                        <DashFridge closeDoor={closeDoor} dollars={dollars} />
                        <ShoppingLists closeDoor={closeDoor} homeListId={homeListId} setHomeListId={setHomeListId}/>
                        {currentUserId && recipesLoading && (
                            <div className="recipes-loading-container">
                                <div className="recipes-loading-text">looking for recipes based on whats in your fridge...</div>
                                <img className="recipes-loading-gif"src={happyFace} />
                            </div>
                        )}
                        {!recipesLoading && (
                            <div className="recipes-loading-container">
                                <div className="recipes-loading-text">check out the recipes we found for you..</div>
                                <img className="recipes-loading-arrow"src={downArrow} />
                            </div>
                        
                        )}
                    </div>
                    <div className="recipes-component-container">
                        {/*currentUserId && <Recipes setRecipesLoading={setRecipesLoading}/>*/}
                    </div>
                </>
            )}
        </>
    );
}

export default Dashboard