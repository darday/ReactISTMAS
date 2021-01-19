import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    
  } from "react-router-dom";
import AgregarDocente from '../components/administrador/docentes/AgregarDocente';
import LoginScreen from '../components/auth/LoginScreen';
import Sidebar from '../components/sidebar/Sidebar';
import RutasAdministrativo from './RutasAdministrativo';
import RutasDocente from './RutasDocente';

export const RoutesApp = () => {
    return (
        <div>
            <Router>
                <div>
                    <Switch>

                        <Route exact path="/login" component={LoginScreen} />

                        {/* <Route  path="/" component={RutasAdministrativo} /> */}
                        <Route  path="/" component={RutasDocente} />
                        

                    </Switch>
                    
                </div>
            </Router>
            
        </div>
    )
}
