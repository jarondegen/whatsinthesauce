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

    useEffect(() => {
        dispatch(getFridgeItems(currentUserId));
    }, []);

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
                    <h1>My Fridge</h1>
                    {Fridge && Fridge.map(item => 
                        <div className="fridge-item-container" key={item.id}>
                            <p>{item.name}</p>
                            <p>{item.expires_on.split(" ").slice(0,3).join(" ")}</p>
                            <button onClick={handleRemoveItemFromFridge} id={item.id}>(-)</button>
                        </div>
                    )}
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