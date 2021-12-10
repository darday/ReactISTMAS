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