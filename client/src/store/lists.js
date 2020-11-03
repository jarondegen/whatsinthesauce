
const SET_LISTS = "feed/SET_FEED";

export const setLists = (value) => {
  return {
    type: SET_LISTS,
    lists: value
  }
}


export const getLists = (userId) => async dispatch => {
    const data = await fetch(`/api/lists/${userId}`);
    if (data.ok) {
        const  { user_lists } = await data.json();
        dispatch(setLists(user_lists))
    }
}

const intialState = {
  lists : [],
}

export default function reducer(state=intialState, action) {
    const newState = {...state};
    switch (action.type) {
        case SET_LISTS: 
        return {
            ...newState,
            lists : action.lists
        }
        default: 
        return state;
    
  }
}