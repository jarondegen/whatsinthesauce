import React, { useState, useEffect, useContext } from 'react';
import { getFridgeItems } from '../../store/fridge';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../../auth';
import Recipes from '../Recipes/Recipes'
import '../../style/dashboard.css';
import DashFridge from './DashFridge';
import LoginForm from '../LoginForm';
import ListPage from '../ShoppingList/ListPage';
import arrow from '../../style/images/arrow.png';
import crazyArrow from '../../style/images/crazy-arrow.png'
import whisk from '../../style/images/whisk.png';
import sauceCooking from '../../style/images/sauce-cooking.png';
import happyFace from '../../style/images/happy-face.gif';
import downArrow from '../../style/images/down-arrow.png';
import closedFridge from '../../style/images/real-fridge-closed.png';
import SignUpForm from '../SignupForm';
import MobileDashboard from './MobileDashboard';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { currentUserId } = useContext(AuthContext);
    const { Fridge } = useSelector(store => store);
    const [dollars, setDollars] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [homeListId, setHomeListId] = useState()
    const [recipesLoading, setRecipesLoading] = useState(true)
    const [showSignUp, setShowSignUp] = useState(false)
    const [isDesktop, setDesktop] = useState(window.innerWidth > 900);
    const { loading } = useSelector(store => store.Recipes)

    const updateMedia = () => {
        setDesktop(window.innerWidth > 900);
      };    

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
      });

    useEffect(() => {
        if (currentUserId) {
            dispatch(getFridgeItems(currentUserId));
        }
    }, [currentUserId])

    useEffect(() => {
        if (!loading) {
            setRecipesLoading(false)
        }
    }, [loading])

    useEffect(() => {
        dispatch(getFridgeItems(currentUserId));
    }, []);
    
    useEffect(() => {
        let y = 0
        Fridge.map(item => {
            if (item.expiring_soon && item.price) {
                y = y + item.price
            };
        });
        setDollars(y);
        setIsLoading(false);
    }, [Fridge]);

    const handleArrowClick = () => {
        const listPaper = document.querySelector('.lists-container')
        listPaper.style.transform = 'scale(1.25)';
        setTimeout(() => {
            listPaper.style.transform = 'scale(1)'
        },250)
    }

    const handleCrazyArrowClick = () => {
        const zoomFridge = document.querySelector('.fridge-container')
        zoomFridge.style.transform = 'scale(1.1)';
        setTimeout(() => {
            zoomFridge.style.transform = 'scale(1)'
        },250)
    }

    const closeDoor = (e) => {
        if (!isDesktop) return
        const pickArrow = document.getElementById('homepage-arrow');
        document.querySelector('.fridge-container').style.backgroundImage  = `url(${closedFridge})`
        setTimeout(() => {
            document.querySelector('.freezer-door-container').style.display = 'none';
            document.querySelector('.inside-fridge-container').style.display = 'none';
            document.querySelector('.lists-container').style.zIndex = 10
            document.querySelector('.recipes-loading-container').style.zIndex = 10
            if (pickArrow) pickArrow.style.zIndex = 10 
        }, 100)
        document.getElementById('open-button-1').setAttribute('class', 'top-right-holder')
        document.getElementById('open-button-2').setAttribute('class', 'bottom-right-holder')
        document.getElementById('open-button-3').style.display = 'none';
        document.getElementById('open-button-4').style.display = 'none';
    }

    return (
        <>
            {isLoading ? <p></p> : (
                <>
                {isDesktop ? (
                    <>
                    <div className="dashboard-page-container">
                        <div className="background-color-splash"></div>
                        {!currentUserId  && !showSignUp && <LoginForm setShowSignUp={setShowSignUp}/>}
                        {!currentUserId && showSignUp && <SignUpForm setShowSignUp={setShowSignUp}/>}
                        {currentUserId && !homeListId && (
                            <div onClick={handleArrowClick} className="no-list-container">
                                <div className="no-lists-loaded-div">Pick one of your lists...</div> 
                                <img  id="homepage-arrow" src={arrow}/>
                            </div>
                        )}
                        {currentUserId && homeListId && <ListPage setHomeListId={setHomeListId} listId={homeListId} />}
                        <DashFridge closeDoor={closeDoor} homeListId={homeListId} setHomeListId={setHomeListId} dollars={dollars} />
                        {currentUserId && recipesLoading && (
                            <div className="recipes-loading-container">
                                <div className="recipes-loading-text">looking for recipes based on whats in your fridge...</div>
                                <img className="recipes-loading-gif"src={happyFace} />
                            </div>
                        )}
                        {currentUserId && !recipesLoading && (
                            <div className="recipes-loading-container">
                                <div className="recipes-loading-text">check out the recipes we found for you..</div>
                                <img onClick={() => document.querySelector('.recipes-component-container').scrollIntoView()} className="recipes-loading-arrow"src={downArrow} />
                            </div>
                        
                        )}
                        <div className="click-to-open-container">
                            <img className="click-to-open-sauce" src={sauceCooking} />
                            <div className="click-to-open-text">
                                click the door to open
                            </div>
                            <img onClick={handleCrazyArrowClick} className="click-to-open-arrow" src={crazyArrow}/>
                            <img className="click-to-open-whisk" src={whisk} />
                        </div>
                    </div>
                    <div className="recipes-component-container">
                        {currentUserId && <Recipes />}
                    </div> 
                    </>
                    ) : <MobileDashboard recipesLoading={recipesLoading} dollars={dollars} setIsLoading={setIsLoading} setDollars={setDollars} closeDoor={closeDoor} setHomeListId={setHomeListId} handleArrowClick={handleArrowClick} homeListId={homeListId} setShowSignUp={setShowSignUp} showSignUp={showSignUp}/>}
                </>
            )}
        </>
    );
}

export default Dashboard