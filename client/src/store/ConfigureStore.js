import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import Lists from './lists';
import Ingredients from './ingredients';
import Fridge from './fridge';
import Recipes from './recipes'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    Lists,
    Ingredients,
    Fridge,
    Recipes,
});

const configureStore = initialState => {
    return createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk)),
    );
};

export default configureStore;