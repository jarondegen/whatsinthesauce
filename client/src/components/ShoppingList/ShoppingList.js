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
    }, [currentUserId, dispatch]);

    const handleDelete = async (e) => {
        const data = await fetchWithCSRF(`/api/lists/delete/${parseInt(e.target.id)}`,{
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (data.ok) {
            dispatch(getLists(currentUserId));
        };
    };

    const handleListClick = (e) => {
        setHomeListId(e.target.id);
        closeDoor();
    };

    return (
        <div className="lists-container">
            {!currentUserId && (
                <>
                    <div className="not-logged-in-lists" >log in to see your stuff!</div>
                    <img alt="recipes loading animation" className="smiley" src={smiley}/>    
                </>
            )}
            {currentUserId && <NewShoppingList getLists={getLists}/>}
            <div className="shopping-lists-map-container">
                {currentUserId && lists.map(list => (
                    <div className="lists-div" key={list.name}> 
                        <span id={list.id} onClick={handleListClick} className="list-list-name-link" >{`- ${list.name}`}</span>
                        <span className="lists-list-date">{list.date.split(" ").slice(0,3).join(" ")}</span>
                        <img alt="remove list" className="remove-list-button" src={redX} id={list.id} onClick={handleDelete} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShoppingLists;