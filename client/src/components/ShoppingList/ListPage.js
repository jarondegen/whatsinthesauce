import React, { useState, useEffect, useContext } from 'react';
import { getIngredients } from '../../store/ingredients';
import { useSelector, useDispatch } from 'react-redux';
import AuthContext from '../../auth';

const ListPage = (props) => {
    const dispatch = useDispatch()
    const listId = props.match.params.id;
    const { fetchWithCSRF, currentUserId } = useContext(AuthContext);
    const [listName, setListName] = useState('');
    const [listItems, setListItems] = useState([]);
    const [itemToAdd, setItemToAdd] = useState(null)
    const { ingredients, groups } = useSelector(store => store.Ingredients)
    const [itemsByGroup, setItemsByGroup] = useState([])
    

    useEffect(() => {
        getItems(listId)
        dispatch(getIngredients())
    }, [])
    
    const getItems = async (listId) => {
        const data = await fetch(`/api/lists/items/${listId}`);
        if (data.ok) {
            const { items, user_list } = await data.json();
            setListItems(items)
            setListName(user_list.name)
        }
    }

    const handleGroupSelect = async (e) => {
        console.log(e.target.value)
        const data = await fetch(`/api/ingredients/groups/${e.target.value}`)
        if (data.ok) {
            const items = await data.json()
            setItemsByGroup(items)
        }
    }

    const handleAddToList = async () => {
        const data = await fetchWithCSRF('/api/lists/add', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
                listId,
                itemToAdd
            })
        })
        if (data.ok) {
             const response = await data.json()
             getItems(listId)
        }
    }

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
                id: parseInt(e.target.id.split('-').slice(1))
            })
        });
        if (data.ok) {
            const response = await data.json();
            console.log(response)
            getItems(listId)
        }
    }

    return (
        <>
            <h1>List Page</h1>
            <h3>{listName}</h3>
            <div className="list-items-container">
                <ul>
                    {listItems && listItems.length>0 && listItems.map(item =>
                        <div key={item.id}> 
                            <li>{item.name}</li>
                            <button id={item.ingredient_id} onClick={handleRemoveItem}>(-)</button>
                            <button id={`${item.ingredient_id}-${item.id}`} onClick={handleAddToFridge}>add to fridge</button>
                        </div>
                    )}
                </ul>
                <select onChange={handleGroupSelect}>
                    <option>Group</option>
                    {groups && groups.map(item =>
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )}
                </select>
                <select onChange={(e) => setItemToAdd(e.target.value)}>
                    <option>Ingredient</option>
                    {itemsByGroup && itemsByGroup.map(item =>
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )}
                </select>
                <button onClick={handleAddToList} >Add to list</button>
            </div>
        </>
    );
}

export default ListPage