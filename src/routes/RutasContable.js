import React from 'react'
import { Route } from 'react-router';
import InscribirEstudiantes from '../components/administrador/inscripción/InscribirEstudiantes';
import {ListarEstudiantesInscritos} from '../components/administrador/inscripción/ListarEstudiantesInscritos';
import ListarSolicitudMatricula from '../components/administrador/matriculas/ListarSolicitudMatricula';
import ListarPagos from '../components/administrador/pagos/ListarPagos';
import { EditarPerfilContable } from '../components/contable/perfil/EditarPerfilContable';
import { PerfilContable } from '../components/contable/perfil/PerfilContable';
import Contenido from '../components/contenido/Contenido';
import FooterDashboard from '../components/footer/FooterDashboard';
import NavbarGeneral from '../components/navbar/NavbarGeneral'
import SidebarContable from '../components/sidebar/SidebarContable';


export const RutasContable = () => {
    return (
        <>
            <NavbarGeneral/>
            <div id="layoutSidenav" style={{}} >
                    <SidebarContable />
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid">                       
                                <Contenido /> 
    
                                    {/* <Route  path="/administrativo/HomeAdmin"  component={HomeAdmin} />                          */}

                                   <Route path="/contable/Perfil" component={PerfilContable}/>
                                   <Route path="/contable/EditarPerfil" component={EditarPerfilContable}/>
                                   <Route path="/contable/InscribirEstudiante" component={InscribirEstudiantes}/>
                                   <Route path="/contable/ListarEstudiantesInscritos" component={ListarEstudiantesInscritos}/>
                                   <Route path="/contable/ListarSolicitudMatriculas" component={ListarSolicitudMatricula}/>
                                   <Route path="/contable/ListarPagos" component={ListarPagos}/>


                            </div>
                        </main>
                        <FooterDashboard />                        
                    </div>                 
                </div>  
        </>
    )
}
