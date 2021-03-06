import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './Card';
import AuthContext from '../../auth';
import { setRecipeItems, changeLoading } from '../../store/recipes';
import '../../style/recipes.css'

const Recipes = () => {
    const dispatch = useDispatch();
    const { Fridge } = useSelector(store => store);
    const { recipes, loading } = useSelector(store => store.Recipes);
    const { fetchWithCSRF } = useContext(AuthContext);
    
    useEffect(() => {
        dispatch(changeLoading(true));
        getTheRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[Fridge, dispatch]);

    useEffect(() => {
        if (recipes.length > 0) {
            if (loading) {
                dispatch(changeLoading(false));
            };
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[recipes, dispatch]);

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
            const { recipes } = await data.json();
            dispatch(setRecipeItems(recipes));
          };
    };

    return (
        <>
        {recipes.length > 0 && (
        <>    
         <div className="recipes-page-cotianer">
            <h4 className="suggest-recipes-title">Suggested Recipes</h4> 
            <div className="recipes-container">
                {recipes.map((recipe, i) => 
                        recipe.thumbnail ? (
                            <Card key={i} recipe={recipe}/>
                        ) : null
                    )}
            </div>
        </div>
        <p className="scroll-to-top-desktop" onClick={() => document.querySelector('.recipes-page-cotianer').scrollIntoView()}>scroll to top</p>
        </>
        )}
        </>
    );
};

export default Recipes;