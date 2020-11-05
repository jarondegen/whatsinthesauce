import React, { useState, useEffect, useContext } from 'react';
import { getIngredients } from '../../store/ingredients';
import { useSelector, useDispatch } from 'react-redux';
import AuthContext from '../../auth';
import ListItem from './ListItem';

const ListPage = ({listId}) => {
    const dispatch = useDispatch()
    const { fetchWithCSRF } = useContext(AuthContext);
    const [listName, setListName] = useState('');
    const [listItems, setListItems] = useState([]);
    const [itemToAdd, setItemToAdd] = useState(null)
    const { groups } = useSelector(store => store.Ingredients)
    const [itemsByGroup, setItemsByGroup] = useState([])
    
    useEffect(() => {
        getItems(listId)
        dispatch(getIngredients())
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
             getItems(listId)
        }
    }

    return (
        <div className="list-page-container">
            <h1>{listName}</h1>
            <div className="list-items-container">
                <ul>
                    {listItems && listItems.length>0 && listItems.map(item =>
                        <ListItem key={item.id} listId={listId} getItems={getItems} item={item}/>
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
        </div>
    );
}

export default ListPage