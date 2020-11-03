import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../../auth';
import { getLists } from '../../store/lists';
import NewShoppingList from './NewShoppingList';

const ShoppingLists = () => {
    const dispatch = useDispatch();
    const { currentUserId, fetchWithCSRF } = useContext(AuthContext);
    const { lists } = useSelector(store => store.Lists);

    useEffect(() => {
        dispatch(getLists(currentUserId))
    }, [])

    const handleDelete = async (e) => {
        const data = await fetchWithCSRF(`/api/lists/delete/${parseInt(e.target.id)}`,{
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (data.ok) {
            const response = data.json()
            console.log(response)
            dispatch(getLists(currentUserId))
        }
    }

    return (
        <div className="lists-container">
            <NewShoppingList getLists={getLists}/>
            {lists.map(list => 
                <div className="lists-div" key={list.name}>
                    <a href={`/lists/${list.id}`}><h3>{list.name}</h3></a>
                    <h5>{list.date.split(" ").slice(0,3).join(" ")}</h5>
                    <button id={list.id} onClick={handleDelete}>(-)</button>
                </div>
            )}
        </div>
    );
}

export default ShoppingLists