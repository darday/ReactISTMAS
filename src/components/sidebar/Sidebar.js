import React, { Component } from 'react'
import {BrowserRouter as Router,
    Switch,
    Route,
    Link } from 'react-router-dom'

export default class Sidebar extends Component {
    render() {
        return (
            
                    <div id="layoutSidenav_nav"  style={{width:226}}>
                        <nav className="sb-sidenav accordion sb-sidenav-dark animate__animated animate__fadeInLeft" id="sidenavAccordion">
                            <div className="sb-sidenav-menu">
                                <div className="nav">
                                    <div className="sb-sidenav-menu-heading">Core</div>
                                    <Link to="/">
                                        <a className="nav-link" href="index.html">
                                            <div className="sb-nav-link-icon">
                                            <i className="fas fa-university"></i>                                        
                                            </div>
                                            <b>Página Principal</b>
                                        </a>
                                    </Link>

                                    <div className="sb-sidenav-menu-heading">Estudiantes</div>
                                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon">
                                            <i className="far fa-user"></i>
                                        </div>
                                        ESTUDIANTES
                                        <div className="sb-sidenav-collapse-arrow">
                                            <i className="fas fa-angle-down"></i>
                                        </div>
                                    </a>
                                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <a className="nav-link" href="#">Agregar Estudiante </a>
                                            <a className="nav-link" href="#">Editar Estudiante</a>
                                            <a className="nav-link" href="#">Visualizar Información Estudiante</a>
                                            <a className="nav-link" href="#">Reporte Estudiante</a>
                                            <a className="nav-link" href="#">Eliminar Estudiante</a>
                                        </nav>
                                    </div>
                                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseDocentes" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon">
                                            <i className="fas fa-graduation-cap"></i>                                        </div>
                                        DOCENTES
                                        <div className="sb-sidenav-collapse-arrow">
                                            <i className="fas fa-angle-down"></i>
                                        </div>
                                    </a>
                                    <div className="collapse" id="collapseDocentes" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            
                                        
                                            <Link to="/AgregarDocente"><a className="nav-link"  >Agregar Docente </a></Link>
                                            
                                            <a className="nav-link" href="#">Editar Docente</a>
                                            <a className="nav-link" href="#">Visualizar Información Docente</a>
                                            <a className="nav-link" href="#">Reporte Docente</a>
                                            <a className="nav-link" href="#">Eliminar Docente</a>
                                        </nav>
                                    </div>

                                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseInscripcion" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon">
                                            <i className="fas fa-clipboard"></i>
                                        </div>
                                        INSCRIPCIÓN
                                        <div className="sb-sidenav-collapse-arrow">
                                            <i className="fas fa-angle-down"></i>
                                        </div>
                                    </a>
                                    <div className="collapse" id="collapseInscripcion" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <a className="nav-link" href="#">Buscar Formulario de Inscripción </a>
                                            <a className="nav-link" href="#">Listar Formularios de Inscripción </a>
                                            
                                        </nav>
                                    </div>

                                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseMatriculas" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon">
                                        <i className="far fa-sticky-note"></i>
                                        </div>
                                        MATRÍCULAS
                                        <div className="sb-sidenav-collapse-arrow">
                                            <i className="fas fa-angle-down"></i>
                                        </div>
                                    </a>
                                    <div className="collapse" id="collapseMatriculas" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <a className="nav-link" href="#">Buscar solicitud de matrículas </a>
                                            <a className="nav-link" href="#">Listar solicitud de matrículas </a>
                                            <a className="nav-link" href="#">Reporte de Solicitude de matrículas</a>
                                        </nav>
                                    </div>

                                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePagos" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon">
                                        <i className="fas fa-dollar-sign"></i>
                                        </div>
                                        PAGOS
                                        <div className="sb-sidenav-collapse-arrow">
                                            <i className="fas fa-angle-down"></i>
                                        </div>
                                    </a>
                                    <div className="collapse" id="collapsePagos" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <a className="nav-link" href="#">Buscar Comprobante por CI</a>
                                            <a className="nav-link" href="#">Listar Comprobantes de Pagos </a>
                                        </nav>
                                    </div>

                                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseHistorias" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon">
                                            <i className="fas fa-briefcase-medical"></i>
                                        </div>
                                        HISTORIAS CLINICAS
                                        <div className="sb-sidenav-collapse-arrow">
                                            <i className="fas fa-angle-down"></i>
                                        </div>
                                    </a>
                                    <div className="collapse" id="collapseHistorias" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <a className="nav-link" href="#">Buscar Comprobante por CI</a>
                                            <a className="nav-link" href="#">Listar Comprobantes de Pagos </a>
                                        </nav>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="sb-sidenav-footer">
                                <div className="small">Usuario:</div>
                                    Nombre de Usuario
                                </div>
                        </nav>
                    </div>

            
        )
    }
}
