import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import '../../style/shopping-lists.css';
import AuthContext from '../../auth';

const NewShoppingList = ({ getLists }) => {
    const dispatch = useDispatch();
    const [listName, setListName] = useState('');
    const { fetchWithCSRF, currentUserId } = useContext(AuthContext);
    
    const toggleForm = () => {
        const form = document.getElementById('NLF');
        const formLabel = document.getElementById('NLFLabel');
        const formClass = form.getAttribute('class');
        if (formClass === 'new-list-form') {
            form.setAttribute('class', 'new-list-form hidden');
            formLabel.innerHTML = '+ New List';
        }else {
            form.setAttribute('class', 'new-list-form');
            formLabel.innerHTML = '- New List';
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await fetchWithCSRF('/api/lists/new', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: listName,
                user_id: currentUserId,
            })
        });
        if (data.ok) {
            const newList = await data.json();
            console.log(newList);
        }
        dispatch(getLists(currentUserId));
        setListName('');
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e)
          }
    }

    return (
        <div className="new-list-form-container">
            <h3 id="NLFLabel" onClick={toggleForm}>+ New List</h3>
            <form id="NLF" className="new-list-form hidden">
                <div>
                    <label>List Name</label>
                </div>
                <div>
                    <input onChange={(e) => setListName(e.target.value)} value={listName} type="text" placeholder="ex. Whole Foods.."/>
                </div>
                <div>
                    <button onClick={handleSubmit} onKeyDown={handleEnter}>Create List</button>
                </div>
            </form>
        </div>
    );
};

export default NewShoppingList;