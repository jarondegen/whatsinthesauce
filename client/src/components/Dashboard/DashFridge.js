import React, { useContext } from 'react';
import closedFridge from '../../style/images/real-fridge-closed.png'
import openFridge from '../../style/images/real-fridge-open.png'
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../../auth';
import x from '../../style/images/x.png';
import { getFridgeItems } from '../../store/fridge';

const DashFridge = ({ dollars, closeDoor }) => {
    const { Fridge } = useSelector(store => store);
    const dispatch = useDispatch();
    const { currentUserId, fetchWithCSRF } = useContext(AuthContext);
    
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

    const openDoor = (e) => {
        if (!currentUserId) {
            return
        }
        document.querySelector('.fridge-container').style.backgroundImage  = `url(${openFridge})`
        setTimeout(() => {
            document.querySelector('.freezer-door-container').style.display = 'flex';
            document.querySelector('.inside-fridge-container').style.display = 'grid';
        }, 100)
        document.getElementById('homepage-arrow').style.zIndex = -10;
        document.getElementById('open-button-4').style.display = '';
        document.getElementById('open-button-3').style.display = '';
    }

    return (
        <div className="fridge-container">
            <div id="open-button-3"onClick={closeDoor} className="top-left-holder" />
            <div id="open-button-4"onClick={closeDoor} className="bottom-left-holder" />
            <div id="open-button-1" onClick={openDoor} className="top-right-holder" />
            <div id="open-button-2" onClick={openDoor} className="bottom-right-holder" />
            <div className="freezer-door-container">
                <h1>My Fridge</h1>
                <h4>{`$${dollars} worth of food expiring soon`}</h4>
            </div>
            <div className="inside-fridge-container">
                        <div className="fridge-item-container" >
                            <span className="fridge-item-name underline">Ingredient</span>
                            <span className="fridge-item-expire underline">Expiring</span>
                            <span className="fridge-item-price underline">Price</span>
                            <span className="fridge-item-delete underline">Remove</span>
                        </div>
                    {Fridge && Fridge.map(item => 
                        <div className="fridge-item-container" >
                            <span className="fridge-item-name">{item.name}</span>
                            <span className="fridge-item-expire" className={item.expiring_soon ? 'expiring_soon' : 'not_expiring_soon'} >{item.expires_on.split(" ").slice(0,3).join(" ")}</span>
                            <span className="fridge-item-price">{item.price === null || item.price === 0 ? 'None' : `$${item.price}`}</span>
                            <span className="fridge-item-delete"><img className="delete-fridge-item-x" src={x} onClick={handleRemoveItemFromFridge} id={item.id}/></span>
                        </div>
                    )}
                
            </div>
        </div>
    )
}

export default DashFridge;