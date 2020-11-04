import React, { useContext, useState } from 'react';
import AuthContext from '../../auth';

const ListItem = ({item, getItems, listId}) => {
    const { fetchWithCSRF, currentUserId } = useContext(AuthContext);
    const [price, setPrice] = useState(null)

    
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
            const response = data.json()
            console.log(response)
            getItems(listId)
        }
    }

    const handleAddToFridge = async (e) => {
        if (price === null) {
            setPrice(0)
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
            const response = await data.json();
            console.log(response)
            getItems(listId)
            setPrice(null)
        }
    }

    return (
        <div key={item.id}> 
            <li>{item.name}</li>
            <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Enter a price.."/>
            <button id={`${item.ingredient_id}-${item.id}`} onClick={handleAddToFridge}>add to fridge</button>
            <button id={item.ingredient_id} onClick={handleRemoveItem}>(-)</button>
        </div>
    );
};

export default ListItem;