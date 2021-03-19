import axios from 'axios';
import React, { Component } from 'react'
import {BrowserRouter as Router,
    Switch,
    Route,
    Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { ApiUrl } from '../services/ApiRest';

const cookie= new Cookies();
const urlAdministrativo=ApiUrl+"admins/"; //pasar id del estudiante
const idAdministrativo = cookie.get("idAdministrativo");    //declaramos una variable para usar la cookie del login


export default class Sidebar extends Component {

    componentDidMount() {
        // Get que devuelve los datos de un estudiante recibiendo un id
        axios.get(urlAdministrativo+idAdministrativo   )
          .then(res => {
            const estudiante = res.data;
            this.setState({ estudiante });
            //console.log(estudiante);
           
            cookie.set('nombres',estudiante.nombres_administrativo,{path:"/"})
            cookie.set('apellidos',estudiante.apellidos_administrativo,{path:"/"})

            // console.log(cookie.get("nombres"));
            // console.log(cookie.get("apellidos")); 
          })
    }    


    render() {
        return (
            
                    <div id="layoutSidenav_nav"  style={{width:226}}>
                        <nav className="sb-sidenav accordion sb-sidenav-dark animate__animated animate__fadeInLeft" id="sidenavAccordion">
                            <div className="sb-sidenav-menu">
                                <div className="nav">
                                    <div className="sb-sidenav-menu-heading">PERSONAL ADMINISTRATIVO</div>
                                    <Link to="/administrativo">
                                        <div className="nav-link" href="index.html">
                                            <div className="sb-nav-link-icon">
                                            <i className="fas fa-university"></i>                                        
                                            </div>
                                            <b>Página Principal</b>
                                        </div>
                                    </Link>

                                    <div className="sb-sidenav-menu-heading"></div>
                                    {/* <div className="nav-link collapsed puntero" href="#" data-toggle="collapse" data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon">
                                            <i className="far fa-user"></i>
                                        </div>
                                        ESTUDIANTES
                                        <div className="sb-sidenav-collapse-arrow">
                                            <i className="fas fa-angle-down"></i>
                                        </div>
                                    </div>
                                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <div className="nav-link puntero" href="#">Agregar Estudiante </div>
                                            <div className="nav-link puntero" href="#">Editar Estudiante</div>
                                            <div className="nav-link puntero" href="#">Visualizar Información Estudiante</div>
                                            <div className="nav-link puntero" href="#">Reporte Estudiante</div>
                                            <div className="nav-link puntero" href="#">Eliminar Estudiante</div>
                                        </nav>
                                    </div> */}
                                    <div className="nav-link collapsed puntero" href="#" data-toggle="collapse" data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon">
                                            <i className="far fa-user"></i>
                                        </div>
                                        MI PERFIL
                                        <div className="sb-sidenav-collapse-arrow">
                                            <i className="fas fa-angle-down"></i>
                                        </div>
                                    </div>
                                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <Link to="/administrativo/PerfilAdministrativo" ><div className="nav-link puntero" href="#">Ver Perfil </div></Link>
                                            <Link to="/administrativo/EditarPerfilAdministrativo" ><div className="nav-link puntero" href="#">Editar Perfil </div></Link>
                                            
                                            
                                        </nav>
                                    </div>

                                    <div className="nav-link collapsed puntero" href="#" data-toggle="collapse" data-target="#collapseAdministrativo" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon">
                                            <i className="fas fa-hospital-user"></i>       
                                        </div>
                                        ADMINISTRATIVO
                                        <div className="sb-sidenav-collapse-arrow">
                                            <i className="fas fa-angle-down"></i>
                                        </div>
                                    </div>
                                    <div className="collapse" id="collapseAdministrativo" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            
                                        
                                            <Link to="/administrativo/IngresarPersonalAdministrativo"><div className="nav-link"  >Agregar Administrativo </div></Link>
                                            <Link to="/administrativo/ListarPersonalAdministrativo"><div className="nav-link"  >Listar Personal Administrativo </div></Link>
                                            
                                           
                                        </nav>
                                    </div>
                                    <div className="nav-link collapsed puntero" href="#" data-toggle="collapse" data-target="#collapseDocentes" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon">
                                            <i className="fas fa-graduation-cap"></i>                                        </div>
                                        DOCENTES
                                        <div className="sb-sidenav-collapse-arrow">
                                            <i className="fas fa-angle-down"></i>
                                        </div>
                                    </div>
                                    <div className="collapse" id="collapseDocentes" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            
                                        
                                            <Link to="/administrativo/AgregarDocente"><div className="nav-link"  >Agregar Docente </div></Link>
                                            <Link to="/administrativo/ListarDocente"><div className="nav-link"  >Listar Docentes </div></Link>
                                            
                                           
                                        </nav>
                                    </div>

                                    <div className="nav-link collapsed puntero" href="#" data-toggle="collapse" data-target="#collapseInscripcion" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon">
                                            <i className="fas fa-clipboard"></i>
                                        </div>
                                        INSCRIPCIONES
                                        <div className="sb-sidenav-collapse-arrow">
                                            <i className="fas fa-angle-down"></i>
                                        </div>
                                    </div>
                                    <div className="collapse" id="collapseInscripcion" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <Link to="/administrativo/InscribirEstudiante"><div className="nav-link"  >Inscribir Estudiante </div></Link>
                                            <Link to="/administrativo/ListarEstudiantesInscritos">  <div className="nav-link" href="#">Listar Estudiantes Inscritos </div></Link>                                                                                   
                                        </nav>
                                    </div>

                                    <div className="nav-link collapsed puntero" href="#" data-toggle="collapse" data-target="#collapseMatriculas" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon">
                                        <i className="far fa-sticky-note"></i>
                                        </div>
                                        MATRÍCULAS
                                        <div className="sb-sidenav-collapse-arrow">
                                            <i className="fas fa-angle-down"></i>
                                        </div>
                                    </div>
                                    <div className="collapse" id="collapseMatriculas" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <Link to="/administrativo/ListarSolicitudMatriculas"><div className="nav-link" href="#">Listar solicitud de matrículas </div></Link>
                                            <div className="nav-link" href="#">Reporte de Solicitude de matrículas</div>
                                        </nav>
                                    </div>

                                    <div className="nav-link collapsed puntero" href="#" data-toggle="collapse" data-target="#collapsePagos" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon">
                                        <i className="fas fa-dollar-sign"></i>
                                        </div>
                                        PAGOS
                                        <div className="sb-sidenav-collapse-arrow">
                                            <i className="fas fa-angle-down"></i>
                                        </div>
                                    </div>
                                    <div className="collapse" id="collapsePagos" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <div className="nav-link" href="#">Buscar Comprobante por CI</div>
                                            <div className="nav-link" href="#">Listar Comprobantes de Pagos </div>
                                        </nav>
                                    </div>

                                    <div className="nav-link collapsed puntero" href="#" data-toggle="collapse" data-target="#collapseHistorias" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon">
                                            <i className="fas fa-briefcase-medical"></i>
                                        </div>
                                        HISTORIAS CLINICAS
                                        <div className="sb-sidenav-collapse-arrow">
                                            <i className="fas fa-angle-down"></i>
                                        </div>
                                    </div>
                                    <div className="collapse" id="collapseHistorias" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <div className="nav-link" href="#">Buscar Comprobante por CI</div>
                                            <div className="nav-link" href="#">Listar Comprobantes de Pagos </div>
                                        </nav>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="sb-sidenav-footer">
                                <div className="small">Usuario:</div>
                                    { cookie.get("nombres")+" "}
                                    { cookie.get("apellidos")}
                                </div>
                        </nav>
                    </div>

            
        )
    }
}
