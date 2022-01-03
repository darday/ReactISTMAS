import axios from 'axios';

import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Cookies from 'universal-cookie'
import {AgregarDocente} from '../components/administrador/docentes/AgregarDocente'
import { ListarDocentes } from '../components/administrador/docentes/ListarDocentes'
import { HomeAdmin } from '../components/administrador/home/HomeAdmin';
import { AgregarDiaHora } from '../components/administrador/horarios/AgregarDiaHoraScreen';
import InscribirEstudiantes from '../components/administrador/inscripción/InscribirEstudiantes'
import {ListarEstudiantesInscritos} from '../components/administrador/inscripción/ListarEstudiantesInscritos'
import ListarSolicitudMatricula from '../components/administrador/matriculas/ListarSolicitudMatricula'
import ListarPagos from '../components/administrador/pagos/ListarPagos';
import EditarPerfilAdministrativo from '../components/administrador/perfil/EditarPerfilAdministrativo'
import PerfilAdministrativo from '../components/administrador/perfil/PerfilAdministrativo'
import {AgregarPersAdmin} from '../components/administrador/personalAdmin/AgregarPersAdmin'
import { ListarPersonalAdministrativo } from '../components/administrador/personalAdmin/ListarPersonalAdministrativo';
import VerInfoAdministrativo from '../components/administrador/personalAdmin/VerInfoAdministrativo';
import Contenido from '../components/contenido/Contenido'
import FooterDashboard from '../components/footer/FooterDashboard'
import {NavbarGeneral} from '../components/navbar/NavbarGeneral'
import { ApiUrl } from '../components/services/ApiRest'
import Sidebar from '../components/sidebar/Sidebar'

//ruta hija no va a tener la palabra o etiqueta router pero si route
const cookie = new Cookies();
const urlAdministrativo=ApiUrl+"admins/"; //pasar id del estudiante
const idAdministrativo = cookie.get("idAdministrativo");    //declaramos una variable para usar la cookie del login


const config = {
    headers: { Authorization: `Bearer ${cookie.get("rol")}` }
};

export default class RutasAdministrativo extends Component {
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
       // console.log(cookie.get("log"));
        if(!cookie.get("log")){
            return(<Redirect to="/login" />);
        }
        //console.log(cookie.get("rol"));
        if(cookie.get("rol") !== 'Administrativo'){
           return(<Redirect to="/errorpermiso" />);
        }


        return (
            
            <>
                <NavbarGeneral /> 
                <div id="layoutSidenav" style={{}} >
                    <Sidebar />
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid">                       
                                <Contenido /> 
    
                                    <Route  path="/administrativo/HomeAdmin"  component={HomeAdmin} />                         

                                    {/* Perfil */}
                                    <Route  path="/administrativo/PerfilAdministrativo"  component={PerfilAdministrativo} />                         
                                    <Route  path="/administrativo/EditarPerfilAdministrativo"  component={EditarPerfilAdministrativo} />                         


                                    {/* docentes */}
                                    <Route  path="/administrativo/AgregarDocente"  component={AgregarDocente} />                         
                                    <Route  path="/administrativo/ListarDocente"  component={ListarDocentes} />                         
                                    
                                   {/* Administrativo */}
                                   
                                    <Route  path="/administrativo/IngresarPersonalAdministrativo"  component={AgregarPersAdmin} />                         
                                    <Route  path="/administrativo/ListarPersonalAdministrativo"  component={ListarPersonalAdministrativo} />                         
                                    <Route  path="/administrativo/VerInfoAdministrativo"  component={VerInfoAdministrativo} />                         
                                    
                                    {/* Inscripciones */}
                                    <Route  path="/administrativo/ListarEstudiantesInscritos"  component={ListarEstudiantesInscritos} />                          
                                    <Route  path="/administrativo/InscribirEstudiante"  component={InscribirEstudiantes} />   

                                    {/*  Matriculas */}
                                    <Route  path="/administrativo/ListarSolicitudMatriculas"  component={ListarSolicitudMatricula} />   

                                    {/*   PAGOS */}
                                    <Route  path="/administrativo/ListarPagos"  component={ListarPagos} />   

                                    {/* HORARIOS */}
                                    <Route  path="/administrativo/AgregarHorario-Dia-Hora"  component={AgregarDiaHora} />   


                            </div>
                        </main>
                        <FooterDashboard />                        
                    </div>                 
                </div>            
            </>
        )
    }
}
