import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import AgregarDocente from '../components/administrador/docentes/AgregarDocente'
import LoginScreen from '../components/auth/LoginScreen'
import Contenido from '../components/contenido/Contenido'
import FooterDashboard from '../components/footer/FooterDashboard'
import NavbarGeneral from '../components/navbar/NavbarGeneral'
import Sidebar from '../components/sidebar/Sidebar'

//ruta hija no va a tener la palabra o etiqueta router pero si route
export default class RutasAdministrativo extends Component {
    render() {
        return (
            
            <>
                <NavbarGeneral /> 
                <div id="layoutSidenav" >
                    <Sidebar />
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid">                       
                                <Contenido /> 
                                    <Route  path="/AgregarDocente"  component={AgregarDocente} />                         
                            </div>
                        </main>
                        <FooterDashboard />                        
                    </div>                 
                </div>            
            </>
        )
    }
}
