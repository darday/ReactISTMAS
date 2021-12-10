import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  
    
  } from "react-router-dom";
import {LoginScreen} from '../components/auth/LoginScreen';
import ErrorPermiso from '../components/errors/ErrorPermiso';
import Carrera from '../components/iniciales/Carrera';
import {CarrerasScreen} from '../components/iniciales/CarrerasScreen';
import RutasAdministrativo from './RutasAdministrativo';
import { RutasContable } from './RutasContable';
import { RutasDocente } from './RutasDocente';
import RutasEstudiante from './RutasEstudiante';

export const RoutesApp = () => {
    return (
        <div>
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={CarrerasScreen} />
                        <Route exact path="/login" component={LoginScreen}/>

                        <Route  path="/carrera" component={Carrera} />

                            <Route  path="/errorpermiso" component={ErrorPermiso} />
                            <Route  path="/administrativo" component={RutasAdministrativo} />
                            <Route  path="/docente" component={RutasDocente} />
                            <Route  path="/estudiante" component={RutasEstudiante} />
                            <Route  path="/contable" component={RutasContable} />


                    </Switch>
                </div>
            </Router>
            
        </div>
    )
}
