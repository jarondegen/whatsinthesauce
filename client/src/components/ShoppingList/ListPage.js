import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import AuthContext from '../../auth';
import ListItem from './ListItem';
import '../../style/lists-page.css';

const ListPage = ({listId, setHomeListId}) => {
    const { fetchWithCSRF } = useContext(AuthContext);
    const [listName, setListName] = useState('');
    const [listItems, setListItems] = useState([]);
    const [itemToAdd, setItemToAdd] = useState(null)
    const { groups } = useSelector(store => store.Ingredients)
    const [itemsByGroup, setItemsByGroup] = useState([])

     useEffect(() => {
        getItems(listId)
    }, [listId])
    
    const getItems = async (listId) => {
        const data = await fetch(`/api/lists/items/${listId}`);
        if (data.ok) {
            const { items, user_list } = await data.json();
            setListItems(items)
            setListName(user_list.name)
        }
    }

    const handleGroupSelect = async (e) => {
        const data = await fetch(`/api/lists/groups/${e.target.value}`)
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
             getItems(listId)
        }
    }

    const handleCloseList = () => {
        setHomeListId(null)
    }

    return (
        <div className="list-page-container">
            <div className="list-items-container">
                <h1 className="list-items-title">{listName}</h1>
                <ul>
                    <div className="ingredient-list-item-container"> 
                        <p className="ingredient-list-item-name-label">Ingredient</p>
                        <p className="ingredient-list-item-price-label">Price</p>
                        <p className="ingredient-list-item-add-button-label">add to fridge</p>
                        <p className="ingredient-list-item-delete-button-label" >remove</p>
                    </div>
                    {listItems && listItems.length>0 && listItems.map(item =>
                        <ListItem key={item.id} listId={listId} getItems={getItems} item={item}/>
                    )}
                </ul>
            </div>
            <div className="list-items-select-form">
                <select className="list-items-select-input food-group-select" onChange={handleGroupSelect}>
                    <option>Group</option>
                    {groups && groups.map(item =>
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )}
                </select>
                <select className="list-items-select-input ingredient-select" onChange={(e) => setItemToAdd(e.target.value)}>
                    <option>Ingredient</option>
                    {itemsByGroup && itemsByGroup.map(item =>
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )}
                </select>
                <br/>
                <button className="list-item-select-button add-to-list-button" onClick={handleAddToList} >Add to list</button>
                <button className="list-item-select-button close-list-button" onClick={handleCloseList} >Close List</button>
            </div>
        </div>
    );
}

export default ListPage