const SET_FRIDGE = "feed/SET_FRIDGE";

export const setFridge = (value) => {
  return {
    type: SET_FRIDGE,
    items: value
  }
}


export const getFridgeItems = (userId) => async dispatch => {
    const data = await fetch(`/api/fridges/${userId}`);
    if (data.ok) {
        const items = await data.json();
        dispatch(setFridge(items))
    }
}

const intialState = [];

export default function reducer(state=intialState, action) {
    switch (action.type) {
        case SET_FRIDGE: 
        return action.items
        default: 
        return state;
    
  }
}