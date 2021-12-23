import React from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route, 
} from "react-router-dom";
import Cookies from 'universal-cookie';
import { login } from '../actions/auth';
import {LoginScreen} from '../components/auth/LoginScreen';
import ErrorPermiso from '../components/errors/ErrorPermiso';
import Carrera from '../components/iniciales/Carrera';
import {CarrerasScreen} from '../components/iniciales/CarrerasScreen';
import RutasAdministrativo from './RutasAdministrativo';
import { RutasContable } from './RutasContable';
import { RutasDocente } from './RutasDocente';
import RutasEstudiante from './RutasEstudiante';

export const RoutesApp = () => {

    const cookies = new Cookies();
    
    const dispatch = useDispatch();

    const rol = cookies.get('rol');
    const islogin = cookies.get('log');

    if(cookies.get('log')){
        if(rol === 'Estudiante'){
            const id = cookies.get('idEstudiante');
            dispatch(login(id,rol,islogin));
        }else{
            if(rol === 'Docente'){
                const id = cookies.get('idDocente');
                dispatch(login(id,rol,islogin));
            }else{
                if(rol === 'Administrativo'){
                    const id = cookies.get('idAdministrativo');
                    dispatch(login(id,rol,islogin));
                }
            }
        }
        
    }else{
        console.log("no està logeado");
    }

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
