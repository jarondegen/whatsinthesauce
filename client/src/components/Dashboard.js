import React, { useState, useEffect, useContext } from 'react';
import ShoppingLists from './ShoppingList/ShoppingList';
import { getFridgeItems } from '../store/fridge';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../auth';
import Recipes from '../components/Recipes/Recipes';
import '../style/dashboard.css';
import x from '../style/images/x.png';
import closedFridge from '../style/images/real-fridge-closed.png'
import openFridge from '../style/images/real-fridge-open.png'



const Dashboard = () => {
    const dispatch = useDispatch();
    const { currentUserId, fetchWithCSRF } = useContext(AuthContext);
    const { Fridge } = useSelector(store => store);
    const [dollars, setDollars] = useState(0)

    useEffect(() => {
        dispatch(getFridgeItems(currentUserId));
    }, []);

    useEffect(() => {
        Fridge.map(item => {
            return item.expiring_soon ? setDollars(dollars + item.price) : null
        })
    }, [Fridge]);

    const handleRemoveItemFromFridge = async (e) => {
        const data = await fetchWithCSRF(`/api/fridges/delete/${e.target.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (data.ok) {
            const response = await data.json();
            dispatch(getFridgeItems(currentUserId));
            console.log(response)
        }
    }

    const closeDoor = (e) => {
        document.querySelector('.fridge-container').style.backgroundImage  = `url(${closedFridge})`
        document.querySelector('.freezer-door-container').style.display = 'none';
        document.querySelector('.inside-fridge-container').style.display = 'none';
        document.getElementById('open-button-1').setAttribute('class', 'top-right-holder')
        document.getElementById('open-button-2').setAttribute('class', 'bottom-right-holder')
    }

    const openDoor = (e) => {
        document.querySelector('.fridge-container').style.backgroundImage  = `url(${openFridge})`
        document.querySelector('.freezer-door-container').style.display = 'flex';
        document.querySelector('.inside-fridge-container').style.display = 'grid';
    }

    return (
        <>
            <div className="dashboard-page-container">
                <div className="fridge-container">
                    <div onClick={closeDoor} className="top-left-holder" />
                    <div onClick={closeDoor} className="bottom-left-holder" />
                    <div id="open-button-1" onClick={openDoor} className="top-right-holder hidden" />
                    <div id="open-button-2" onClick={openDoor} className="bottom-right-holder hidden" />
                    <div className="freezer-door-container">
                        <h1>My Fridge</h1>
                        <h4>{`You have $${dollars} worth of food expiring soon`}</h4>
                    </div>
                    <div className="inside-fridge-container">
                        <div className="fridge-item-name" >
                            {Fridge && Fridge.map(item => 
                                    <p >{item.name}</p>
                            )}
                        </div>
                        <div className="fridge-item-expire" >
                            {Fridge && Fridge.map(item => 
                                <p className={item.expiring_soon ? 'expiring_soon' : 'not_expiring_soon'} >{item.expires_on.split(" ").slice(0,3).join(" ")}</p>
                            )}
                        </div>
                        <div className="fridge-item-price">
                            {Fridge && Fridge.map(item => 
                                <p>{item.price === null || item.price === 0 ? 'None' : `$${item.price}`}</p>
                            )}
                        </div>
                        <div className="fridge-item-delete">
                            {Fridge && Fridge.map(item => 
                                <p><img className="delete-fridge-item-x" src={x} onClick={handleRemoveItemFromFridge} id={item.id}/></p>
                            )}
                        </div>
                        
                    </div>
                </div>
                <ShoppingLists />
            </div>
            <div className="recipes-component-container">
                {/*<Recipes />*/}
            </div>
        </>
    );
}

export default Dashboard