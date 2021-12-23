import {createStore,combineReducers, applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import { administrativoReducer } from '../reducers/administrativoReducer/administrativoReducer';


import { authReducer } from '../reducers/aurhReducer/authReducer';
import { uiReducer } from '../reducers/uiReducers/uiReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const reducers = combineReducers({
    auth:authReducer,
    ui:uiReducer,
    administrativoReducer:administrativoReducer
});

/* store recibe un reducer, pero solo uno para ello usamos el combine reducers como un objeto
*/
export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);