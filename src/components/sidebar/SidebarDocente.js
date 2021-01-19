import React, { Component } from 'react'
import {BrowserRouter as Router,
    Switch,
    Route,
    Link } from 'react-router-dom'

export default class SidebarDocente extends Component {
    render() {
        return (
            <div>
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

                                    <div className="sb-sidenav-menu-heading">DOCENTE</div>
                                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon">
                                            <i className="far fa-user"></i>
                                        </div>
                                        CALIFICACIONES
                                        <div className="sb-sidenav-collapse-arrow">
                                            <i className="fas fa-angle-down"></i>
                                        </div>
                                    </a>
                                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <a className="nav-link" href="#">Ingresar Calificación </a>
                                            <a className="nav-link" href="#">Editar Calificación </a>
                                            <a className="nav-link" href="#">Visualizar Calificaciones </a>
                                            <a className="nav-link" href="#">Reporte de Calificaciones </a>
                                            
                                        </nav>
                                    </div>
                                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseDocentes" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon">
                                            <i className="fas fa-graduation-cap"></i>                                        </div>
                                        HORARIOS
                                        <div className="sb-sidenav-collapse-arrow">
                                            <i className="fas fa-angle-down"></i>
                                        </div>
                                    </a>
                                    
                                    <div className="collapse" id="collapseDocentes" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">                                                  
                                            <a className="nav-link" href="#">Mi Horario</a>
                                            <a className="nav-link" href="#">Reporte de Horario</a>
                                        </nav>
                                    </div>

                                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePerfil" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon">
                                            <i className="fas fa-graduation-cap"></i>                                        </div>
                                        PERFIL
                                        <div className="sb-sidenav-collapse-arrow">
                                            <i className="fas fa-angle-down"></i>
                                        </div>
                                    </a>
                                    <div className="collapse" id="collapsePerfil" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <a className="nav-link" href="#">Mi Perfil</a>
                                            <a className="nav-link" href="#">Editar Perfil</a>
                                           
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
                
            </div>
        )
    }
}
