import React, { Component } from 'react'
import Contenido from '../components/contenido/Contenido'
import FooterDashboard from '../components/footer/FooterDashboard'
import NavbarGeneral from '../components/navbar/NavbarGeneral'
import SidebarDocente from '../components/sidebar/SidebarDocente'

export default class RutasDocente extends Component {
    render() {
        return (
            <>
                <NavbarGeneral /> 
                <div id="layoutSidenav" >
                    <SidebarDocente />
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid">                       
                                <Contenido /> 
                                                           
                            </div>
                        </main>
                        <FooterDashboard />                        
                    </div>                 
                </div>      
            </> 
        )
    }
}
