import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import '../../style/shopping-lists.css';
import AuthContext from '../../auth';
import check from '../../style/images/check.png'

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
            <span id="NLFLabel" onClick={toggleForm}>+ New List</span>
            <form id="NLF" className="new-list-form hidden">
                <div >
                    <label >List Name</label>
                </div>
                <div>
                    <input className="new-list-input" onChange={(e) => setListName(e.target.value)} value={listName} type="text" placeholder="ex. Whole Foods.."/>
                    <br />
                    <div onClick={handleSubmit} className="new-list-add-div"><span>add list</span><img alt="add new list" className="new-list-check" src={check} onKeyDown={handleEnter}/></div>
                </div>
                <div>
                </div>
            </form>
        </div>
    );
};

export default NewShoppingList;