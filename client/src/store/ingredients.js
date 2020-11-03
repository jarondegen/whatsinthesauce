const SET_INGREDIENTS = "feed/SET_INGREDIENTS";
const SET_GROUPS = "feed/SET_GROUPS";

export const setIngredients = (value) => {
  return {
    type: SET_INGREDIENTS,
    ingredients: value
  }
}

export const setGroups = (value) => {
    return {
      type: SET_GROUPS,
      groups: value
    }
  }


export const getIngredients = () => async dispatch => {
    const data = await fetch(`/api/ingredients`);
    if (data.ok) {
        const { ingredients, food_groups } = await data.json();
        dispatch(setIngredients(ingredients));
        dispatch(setGroups(food_groups));
    }
}

const intialState = {
    groups: [],
    ingredients: [],
};


export default function reducer(state=intialState, action) {
    const newState = {...state};
    switch (action.type) {
        case SET_INGREDIENTS: 
        return {
            ...newState,
            ingredients: action.ingredients
        }
        case SET_GROUPS: 
        return {
            ...newState,
            groups: action.groups
        }
        default: 
        return state;
    
  }
}