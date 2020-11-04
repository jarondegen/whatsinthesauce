import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipeItems } from '../../store/recipes';
import Card from './Card';
import '../../style/recipes.css'

const Recipes = () => {
    const dispatch = useDispatch()
    const { Fridge, Recipes } = useSelector(store => store);

    useEffect(() => {
        dispatch(getRecipeItems(Fridge, Recipes))
    },[Fridge])

    return (
        <>
            {Recipes.length > 0? <h4>Suggested Recipes</h4> : null}
            <div className="recipes-container">
                {Recipes.map(recipe => 
                        recipe.thumbnail ? (
                            <Card key={recipe.href} recipe={recipe}/>
                        ) : null
                    )}
            </div>
        </>
    );
};

export default Recipes