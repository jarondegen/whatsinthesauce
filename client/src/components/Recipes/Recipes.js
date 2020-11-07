import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipeItems } from '../../store/recipes';
import Card from './Card';
import '../../style/recipes.css'

const Recipes = () => {
    const dispatch = useDispatch()
    const { Fridge } = useSelector(store => store);
    const { recipes } = useSelector(store => store.Recipes)
    
    useEffect(() => {
        dispatch(getRecipeItems(Fridge, recipes))  
    },[Fridge])

    return (
        <>
            {recipes.length > 0? <h4 className="suggest-recipes-title">Suggested Recipes</h4> : null}
            <div className="recipes-container">
                {recipes.map(recipe => 
                        recipe.thumbnail ? (
                            <Card key={recipe.href} recipe={recipe}/>
                        ) : null
                    )}
            </div>
            
        </>
    );
};

export default Recipes