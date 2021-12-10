import React, { Component } from 'react'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
export default class ErrorPermiso extends Component {
    cerrar_sesion(){
        cookies.remove('id',{path:"/"});
        cookies.remove('nombre',{path:"/"});
        
        //remover cookies de login
        cookies.remove('log',{path:"/"});
        cookies.remove('rol',{path:"/"});
        cookies.remove('token',{path:"/"});
        cookies.remove('idEstudiante',{path:"/"});
        cookies.remove('carreraEstudiante',{path:"/"});
        cookies.remove('idAdministrativo',{path:"/"});


        //remover cookies de la ruta de estudiante
        cookies.remove('nombres',{path:"/"});
        cookies.remove('apellidos',{path:"/"});
        cookies.remove('idCarreraEstu',{path:"/"});

        
        
    }

    btn_volver(){
        window.location.href="/login";
    }

    render() {

        cookies.remove('id',{path:"/"});
        cookies.remove('nombre',{path:"/"});
        
        //remover cookies de login
        cookies.remove('log',{path:"/"});
        cookies.remove('rol',{path:"/"});
        cookies.remove('token',{path:"/"});
        cookies.remove('idEstudiante',{path:"/"});
        cookies.remove('carreraEstudiante',{path:"/"});
        cookies.remove('idAdministrativo',{path:"/"});


        //remover cookies de la ruta de estudiante
        cookies.remove('nombres',{path:"/"});
        cookies.remove('apellidos',{path:"/"});
        cookies.remove('idCarreraEstu',{path:"/"});

        return (
            <div className="container center-text" style={{padding:'10vh'}} >
                <h1>Ups!!! Usted no tiene Permiso para ver esto</h1>
                <button type="button" className="btn btn-success" onClick={this.btn_volver}>Cerrar Sesión</button>


                
            </div>
        )
    }
}
