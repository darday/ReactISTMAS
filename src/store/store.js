// import {createStore,combineReducers, applyMiddleware,compose} from 'redux'
// import thunk from 'redux-thunk'


// import { authReducer } from '../reducers/aurhReducer/authReducer';

// const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


// const reducers = combineReducers({
//     auth:authReducer
// });

// /* store recibe un reducer, pero solo uno para ello usamos el combine reducers como un objeto
// */
// export const store = createStore(
//     reducers,
//     composeEnhancers(
//         applyMiddleware(thunk)
//     )
// );
import {createStore,combineReducers} from 'redux'
import { authReducer } from '../reducers/aurhReducer/authReducer';

const reducers = combineReducers({
    auth:authReducer
});

/* store recibe un reducer, pero solo uno para ello usamos el combine reducers como un objeto
*/
export const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );