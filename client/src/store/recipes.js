const SET_RECIPES = "feed/SET_RECIPES";

export const setRecipes = (value) => {
  return {
    type: SET_RECIPES,
    recipes: value
  }
}


export const getRecipeItems = (Fridge, Recipes) => async dispatch => {
    if (Recipes.length > 2) return
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let itemsArr = []
    if (Fridge.length > 0){
        for (let item of Fridge) {
            let str = item.name.replace(/\s+/g, '');
            const data = await fetch(proxyurl + `http://www.recipepuppy.com/api/?i=${str}&p=1`)
            if (data.ok) {
            const recipes = await data.json()
            itemsArr.push(...new Set(recipes.results.slice(0,3)))
            }else continue
        }
    }
    dispatch(setRecipes(itemsArr))
}


const intialState = [];

export default function reducer(state=intialState, action) {
    const newState = {...state};
    switch (action.type) {
        case SET_RECIPES: 
        return action.recipes
        default: 
        return state;
    
  }
}

   //  --API Info -- 
   //http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3
   //http://www.recipepuppy.com/about/api/