import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Hint } from 'react-autocomplete-hint';
import AuthContext from '../../auth';

const SearchBar = ({listId, getItems}) => {
    const { fetchWithCSRF } = useContext(AuthContext);
    const { ingredients } = useSelector(store => store.Ingredients);
    const [text, setText] =  useState('')
    const [options, setOptions] =  useState([])
    const [buttonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
        const ingredientStrings = []
        ingredients.forEach(food => {
            ingredientStrings.push(food.name.toLowerCase())
        })
        setOptions(ingredientStrings)
    }, [ingredients])

    const handleSearchClick = async () => {
        const data = await fetchWithCSRF('/api/lists/search_bar_add', {
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
            setText('')
            getItems(listId)
        }
    }

    const handleChange = (e) => {
        setText(e.target.value)
        if (options.includes(e.target.value.toLowerCase())) {
            setButtonDisabled(false)
        }else {
             setButtonDisabled(true)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !buttonDisabled){
            handleSearchClick()
        }
      }

    return (
        <div className="search-bar-div">
            <Hint options={options} allowTabFill={true}>
                <input
                id="autofill-search"
                placeholder="search ingredient"
                value={text}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                autoComplete="off"
                 />
            </Hint>
            <button onClick={handleSearchClick} disabled={buttonDisabled} className="list-item-select-button add-to-list-button"  >Add to list</button>
        </div>
    );
};

export default SearchBar;