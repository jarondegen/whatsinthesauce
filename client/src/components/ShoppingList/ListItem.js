import React, { useContext, useState } from 'react';
import AuthContext from '../../auth';
import check from '../../style/images/check.png';
import x from '../../style/images/x.png';
import { getFridgeItems } from '../../store/fridge';
import { useDispatch } from 'react-redux';

const ListItem = ({item, getItems, listId}) => {
    const dispatch = useDispatch();
    const { fetchWithCSRF, currentUserId } = useContext(AuthContext);
    const [price, setPrice] = useState();

    
    const handleRemoveItem = async (e) => {
        const data = await fetchWithCSRF('/api/lists/remove-item', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
                listId,
                ingredient_id: e.target.id
            })
        });
        if (data.ok) {
            getItems(listId);
        };
    };

    const handleAddToFridge = async (e) => {
        if (price === null) {
            setPrice(0);
        }
        const data = await fetchWithCSRF('/api/fridges/add', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
                user_id: currentUserId,
                ingredient_id: parseInt(e.target.id.split('-').slice(0,1)),
                list_id: parseInt(listId),
                id: parseInt(e.target.id.split('-').slice(1)),
                price: parseInt(price)
            })
        });
        if (data.ok) {
            dispatch(getFridgeItems(currentUserId));
            getItems(listId);
            setPrice();
        };
    };

    return (
        <div className="ingredient-list-item-container"key={item.id}> 
            <li className="ingredient-list-item-name">{item.name}</li>
            <input className="ingredient-list-item-price-input" value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="price"/>
            <img alt="add list item" src={check} className="ingredient-list-item-check-button"id={`${item.ingredient_id}-${item.id}`} onClick={handleAddToFridge} />
            <img alt="delete list item" src={x} className="ingredient-list-item-delete-x" id={item.ingredient_id} onClick={handleRemoveItem} />
        </div>
    );
};

export default ListItem;