import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { ApiUrl } from '../services/ApiRest';


const cookie= new Cookies();
const urlEstudiante=ApiUrl+"estudiantes/"; //pasar id del estudiante
const idEstudiante = cookie.get("idEstudiante");    //declaramos una variable para usar la cookie del login


export default class SidebarEstudiante extends Component {


    
    componentDidMount() {
      axios.get(urlEstudiante+idEstudiante   )
          .then(res => {
            
            res=res.data[0];
           
           
            cookie.set('nombres',res.nombres_estudiante,{path:"/"})
            cookie.set('apellidos',res.apellidos_estudiante,{path:"/"})
            cookie.set('idCarreraEstu',res.carreras[0].id_carrera,{path:"/"})

            console.log(cookie.get("nombres"));
            console.log(cookie.get("apellidos")); 



            
           
        })

       

        
    }

    
    
    render() {
        
        
        return (
            <div id="layoutSidenav_nav"  style={{width:226,height:"auto",}}>
                <nav className="sb-sidenav accordion sb-sidenav-dark animate__animated animate__fadeInLeft" id="sidenavAccordion" style={{paddingTop:"4.5vh"}} >
                    <div className="sb-sidenav-menu"  style={{height:"91vh"}}>
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">ESTUDIANTE ISTMAS</div>
                            <Link to="/estudiante">
                                <div className="nav-link" href="index.html">
                                    <div className="sb-nav-link-icon">
                                    <i className="fas fa-university"></i>                                        
                                    </div>
                                    <b>Página Principal</b>
                                </div>
                            </Link>

                            <div className="sb-sidenav-menu-heading"></div>
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
                                    <Link to="/estudiante/EstudianteVerPerfil" ><div className="nav-link puntero" href="#">Ver Perfil </div></Link>
                                    <Link to="/estudiante/EditarPerfil" ><div className="nav-link puntero" href="#">Editar Perfil </div></Link>
                                    
                                    
                                </nav>
                            </div>
                            {/* <div className="nav-link collapsed puntero" href="#" data-toggle="collapse" data-target="#collapseDocentes" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-graduation-cap"></i>                                        </div>
                                HORARIO
                                <div className="sb-sidenav-collapse-arrow">
                                    <i className="fas fa-angle-down"></i>
                                </div>
                            </div>
                            <div className="collapse" id="collapseDocentes" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">                              

                                    <div className="nav-link" href="#">Ver Mi Horario</div>
                                    <div className="nav-link" href="#">Imprimir Horario</div>
                                   
                                </nav>
                            </div>

                            <div className="nav-link collapsed puntero" href="#" data-toggle="collapse" data-target="#collapseCalificacion" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-graduation-cap"></i>                                        </div>
                                CALIFICACIONES
                                <div className="sb-sidenav-collapse-arrow">
                                    <i className="fas fa-angle-down"></i>
                                </div>
                            </div>
                            <div className="collapse" id="collapseCalificacion" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">                              

                                    <div className="nav-link" href="#">Ver mis calificaciones</div>
                                   
                                </nav>
                            </div> */}

                            {/* <div className="nav-link collapsed puntero" href="#" data-toggle="collapse" data-target="#collapseInscripcion" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-clipboard"></i>
                                </div>
                                INSCRIPCIÓN
                                <div className="sb-sidenav-collapse-arrow">
                                    <i className="fas fa-angle-down"></i>
                                </div>
                            </div>
                            <div className="collapse" id="collapseInscripcion" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <div className="nav-link" href="#">Inscribirse en una carrera </div>
                                    
                                </nav>
                            </div> */}

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
                                    <Link to="/estudiante/EstudianteMatricula"><div className="nav-link" href="#">Matricularme </div></Link>
                                    <Link to="/estudiante/EstudianteMisMatriculas"><div className="nav-link" href="#">Ver mis Matriculas </div></Link>
                                    
                                    
                                </nav>
                            </div>

                            <div className="nav-link collapsed puntero" href="#" data-toggle="collapse" data-target="#collapsePagos" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon">
                                <i className="fas fa-dollar-sign"></i>
                                </div>
                                PENSIONES
                                <div className="sb-sidenav-collapse-arrow">
                                    <i className="fas fa-angle-down"></i>
                                </div>
                            </div>
                            <div className="collapse" id="collapsePagos" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link to="/estudiante/EstudianteAgregarPago">
                                        <div className="nav-link" href="#">Agregar Pagos Pensión</div>
                                    </Link>
                                    <Link to="/estudiante/EstadoMisPagosPension">
                                        <div className="nav-link" href="#">Estado de mis pagos de Pensión</div>

                                    </Link>
                                    
                                </nav>
                            </div>

                            {/* <div className="nav-link collapsed puntero" href="#" data-toggle="collapse" data-target="#collapseHistorias" aria-expanded="false" aria-controls="collapseLayouts">
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
                            </div> */}
                            
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Usuario:</div>
                           
                            { cookie.get("nombres")+" "}
                            { cookie.get("apellidos")}

                            {console.log(cookie.get("nombres"))}
                            
        
                        </div>
                </nav>
            </div>


        )
    }
}
