import React from 'react'
import { RoutesApp } from './routes/RoutesApp';

import {Provider} from 'react-redux'
import { store } from './store/store';

export const IstmasApp = () => {
    return (
        <Provider store={store}>
            <RoutesApp />
        </Provider> 
       
    ) 
}
