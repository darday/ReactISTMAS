import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
export default class NavbarGeneral extends Component {
    
    cerrar_sesion(){
        cookies.remove('id',{path:"/"});
        cookies.remove('nombre',{path:"/"});
        
        //remover cookies de login
        cookies.remove('log',{path:"/"});
        cookies.remove('rol',{path:"/"});
        cookies.remove('token',{path:"/"});
        cookies.remove('idEstudiante',{path:"/"});
        cookies.remove('idAdministrativo',{path:"/"});


        //remover cookies de la ruta de estudiante
        cookies.remove('nombres',{path:"/"});
        cookies.remove('apellidos',{path:"/"});
        cookies.remove('idCarreraEstu',{path:"/"});

        
        window.location.href="/login";
    }

    render() {

        
        return (
            
                <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark ">
                    <div className="navbar-brand" > ISTMAS</div>
                    <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"><i className="fas fa-bars"></i></button>
                    {/* <!-- Navbar Search--> */}
                    <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                        
                    </form>
                    {/* <!-- Navbar--> */}
                    <ul className="navbar-nav ml-auto ml-md-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-user fa-fw"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                <a className="dropdown-item" href="#">Editar Información</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item"  onClick={this.cerrar_sesion} >Salir</a>
                            </div>
                        </li>
                    </ul>
                </nav>

                
                
            
        )
    }
}
