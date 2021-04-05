import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import "../../services/ApiRest"
import { ApiUrl } from '../../services/ApiRest';

const cookie= new Cookies();
const urlAdministrativo= ApiUrl+"admins/"; //pasar id del estudiante
const idAdministrativo = cookie.get("idAdministrativo");    //declaramos una variable para usar la cookie del login


export default class PerfilAdministrativo extends Component {

    constructor(props) {
		super(props)

		this.state = {
            administrativo:[], 
           
        }

    }
    
   


    componentDidMount() {
        axios.get(urlAdministrativo+idAdministrativo)
          .then(res => {
            const administrativo = res.data;
            this.setState({ administrativo });
            console.log(administrativo);
           
          
          })
    }

    render() {
        return (
            <div className="row animate__animated animate__fadeIn">
                <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item active">{this.state.estado}</li>
                </ol>
                <div className="card shadow p-3 mb-5 bg-white rounded">
                    <div className="card-header back-istmas">
                    <i className="far fa-user"></i>
                            <b>-Perfil Administrativo </b>
                    </div>
                    <div className="card-body">
                            
                        <form className="" onSubmit={this. inscribirEstudiante} style={{padding:10}} id="create-course-form" >                      
                            <div className="row ">                                        
                                <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label"><b> Nombres: </b> {this.state.administrativo.nombres_administrativo}</label>
                                    
                                    </div>
                                </div>  
                                <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label"><b> Apellidos: </b> {this.state.administrativo.apellidos_administrativo}</label>
        
                                    </div>
                                </div>  
                            </div>    

                            <div className="row">
                                
                                <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label"><b> Cédula de Identidad: </b> {this.state.administrativo.numero_identificacion_administrativo}</label>
            
                                </div>
                                </div>  
                                <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label"><b> Fecha de Nacimiento: </b> {this.state.administrativo.fecha_nacimiento_administrativo}</label>

                                    </div>
                                </div>  
                            </div>    

                        
                            <div className="row">
                                <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label"><b> Correo electrónico: </b> {this.state.administrativo.email_administrativo}</label>
        
                                    </div>
                                </div>  
                                <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label"><b> Teléfono celular: </b> {this.state.administrativo.celular_administrativo}</label>

                                    </div>
                                </div>  
                            </div>    
                                                        
                                                            
                            <div className="row">
                            
                                <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label"><b> Dirección: </b> {this.state.administrativo.direccion_administrativo}</label>

                                        
                                        
                                    </div>
                                </div>  

                                <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label"><b> Teléfono Convencional: </b> {this.state.administrativo.convencional_administrativo}</label>

                                    </div>
                                </div>  

                            </div>      

                                
                            <div className="text-center">
                                <Link to="/administrativo/EditarPerfilAdministrativo">
                                    <button type="" className="btn  btn btn-outline-dark " style={{margin:"5px", width:"150px"}}  > <b>Editar Perfil</b></button>
                                </Link>
                                <Link to="/administrativo">
                                    <button type="" className="btn  btn btn-outline-dark "style={{margin:"5px", width:"150px"}}  ><b>Página Principal</b></button>
                                </Link>
                            
                            </div>
                        </form>          
                    </div>
                </div> 

            </div>

        )
    }
}
