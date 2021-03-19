import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'
import Contenido from '../components/contenido/Contenido'
import FooterDashboard from '../components/footer/FooterDashboard'
import NavbarGeneral from '../components/navbar/NavbarGeneral'
import SidebarDocente from '../components/sidebar/SidebarDocente'

const cookie = new Cookies();

export default class RutasDocente extends Component {
    render() {

        console.log(cookie.get("log"));
        if(!cookie.get("log")){
            return(<Redirect to="/login" />);
        }

        if(cookie.get("rol") !== "docente"){

            return(<Redirect to="/errorpermiso" />);
        }
        
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
