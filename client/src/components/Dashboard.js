import React, { useState, useEffect, useContext } from 'react';
import ShoppingLists from './ShoppingList/ShoppingList';
import { getFridgeItems } from '../store/fridge';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../auth';
import Recipes from '../components/Recipes/Recipes';
import '../style/dashboard.css';



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

    return (
        <>
            <div className="dashboard-page-container">
                <div className="fridge-container">
                    <div className="freezer-door-container">
                        <h1>My Fridge</h1>
                        <h3>{`You have $${dollars} worth of food expiring soon`}</h3>
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
                                <p><button onClick={handleRemoveItemFromFridge} id={item.id}>(-)</button></p>
                            )}
                        </div>
                        
                    </div>
                </div>
                <ShoppingLists />
            </div>
            <div className="recipes-component-container">
                <Recipes />
            </div>
        </>
    );
}

export default Dashboard