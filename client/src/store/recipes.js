const SET_RECIPES = 'recipes/SET_RECIPES'
const SET_LOADING = 'recipes/SET_LOADING'

export const setLoading = (value) => {
  return {
    type: SET_LOADING,
    loading: value
  }
}

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
            itemsArr.push(...new Set(recipes.results.slice(0,6)))
            }else continue
        }
        dispatch(setLoading(false))
    }
    dispatch(setRecipes(itemsArr))
    
}


const intialState = {
    recipes: [],
    loading: true,
};

export default function reducer(state=intialState, action) {
    const newState = {...state};
    switch (action.type) {
        case SET_RECIPES: 
        return {
          ...newState,
          recipes: action.recipes
        }
        case SET_LOADING:
          return {
            ...newState,
            loading: action.loading
          }
        default: 
        return state;
    
  }
}

   //  --API Info -- 
   //http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3
   //http://www.recipepuppy.com/about/api/