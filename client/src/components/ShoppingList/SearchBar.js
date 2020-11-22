import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Hint } from 'react-autocomplete-hint';
import AuthContext from '../../auth';

const SearchBar = ({listId, getItems}) => {
    const { fetchWithCSRF } = useContext(AuthContext);
    const { ingredients } = useSelector(store => store.Ingredients);
    const [text, setText] =  useState('')
    const [options, setOptions] =  useState([])

    useEffect(() => {
        const ingredientStrings = []
        ingredients.forEach(food => {
            ingredientStrings.push(food.name)
        })
        setOptions(ingredientStrings)
    }, [ingredients])

    const handleSearchClick = async () => {
        const data = await fetchWithCSRF('/api/lists/add', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
                listId,
                itemToAdd:text
            })
        })
        if (data.ok) {
             getItems(listId)
        }
    }

    return (
        <div>
            <Hint options={options}>
                <input
                placeholder="search or add"
                value={text}
                onChange={e => setText(e.target.value)} />
            </Hint>
            <button className="list-item-select-button add-to-list-button"  >Add to list</button>
        </div>
    );
};

export default SearchBar;