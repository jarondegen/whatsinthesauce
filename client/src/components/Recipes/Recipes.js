import React, { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';
import AuthContext from '../../auth';
import { setRecipeItems, setLoading } from '../../store/recipes';
import '../../style/recipes.css'

const Recipes = () => {
    const dispatch = useDispatch()
    const { Fridge } = useSelector(store => store);
    const [recipes, setRecipes] = useState([])
    const { fetchWithCSRF } = useContext(AuthContext);
    
    useEffect(() => {
        dispatch(setLoading(true))
        getTheRecipes()
        dispatch(setRecipeItems(recipes))
        dispatch(setLoading(false))
        
    },[Fridge])

    const getTheRecipes = async () => {
        const data = await fetchWithCSRF('api/fridges/recipes', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
               items: Fridge
            })
          });
          if (data.ok) {
            const { recipes } = await data.json()
            setRecipes(recipes)
          }
    }

    return (
        <>
            {recipes.length > 0? <h4 className="suggest-recipes-title">Suggested Recipes</h4> : null}
            <div className="recipes-container">
                {recipes.map((recipe, i) => 
                        recipe.thumbnail ? (
                            <Card key={i} recipe={recipe}/>
                        ) : null
                    )}
            </div>
            
        </>
    );
};

export default Recipes