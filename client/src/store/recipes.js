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


export const setRecipeItems = (recipes) => dispatch => {
    dispatch(setRecipes(recipes))
}

export const changeLoading = (val) => dispatch => {
  dispatch(setLoading(val))
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
   // https://www.themealdb.com/api.php