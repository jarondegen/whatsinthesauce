import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthContext from '../../auth';
import { getLists } from '../../store/lists';
import NewShoppingList from './NewShoppingList';
import redX from '../../style/images/x.png';
import smiley from '../../style/images/smiley.png';

const ShoppingLists = ({ setHomeListId, closeDoor }) => {
    const dispatch = useDispatch();
    const { currentUserId, fetchWithCSRF } = useContext(AuthContext);
    const { lists } = useSelector(store => store.Lists);

    useEffect(() => {
        if (currentUserId) {
            dispatch(getLists(currentUserId));
        }
    }, [currentUserId])

    useEffect(() => {
        dispatch(getLists(currentUserId))
        console.log(lists[lists.length -1])
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

    const handleListClick = (e) => {
        setHomeListId(e.target.id)
        closeDoor(e)
    }

    return (
        <div className="lists-container">
            {!currentUserId && (
                <>
                    <div className="not-logged-in-lists" >log in to see your stuff!</div>
                    <img className="smiley" src={smiley}/>    
                </>
            )}
            {currentUserId && <NewShoppingList getLists={getLists}/>}
            {currentUserId && lists.map(list => 
                <div className="lists-div" key={list.name}>
                    <span id={list.id} onClick={handleListClick} className="list-list-name-link" >{list.name}</span>
                    <span className="lists-list-date">{list.date.split(" ").slice(0,3).join(" ")}</span>
                    <img className="remove-list-button" src={redX} id={list.id} onClick={handleDelete} />
                </div>
            )}
        </div>
    );
}

export default ShoppingLists