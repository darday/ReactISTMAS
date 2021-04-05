import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import "../../services/ApiRest"
import { ApiUrl } from '../../services/ApiRest';


const cookie= new Cookies();
const urlEstudiante=ApiUrl+ "estudiantes/"; //pasar id del estudiante
const idEstudiante = cookie.get("idEstudiante");


export default class VerPerfil extends Component {
    constructor(props) {
		super(props)

		this.state = {
            estudiante:[], 
           
        }

    }
    
   


    componentDidMount() {
        axios.get(urlEstudiante+idEstudiante   )
          .then(res => {
            const estudiante = res.data[1];
            this.setState({ estudiante });
            console.log(estudiante);
           
          
          })
    }
    


    render() {
        return (
            <div className="row animate__animated animate__fadeIn">
            <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item active">{this.state.estado}</li>
            </ol>


            <div className="card shadow p-3 mb-5 bg-white rounded ">
                <div className="card-header back-istmas">
                <i className="far fa-user"></i>
                        <b>-Perfil Estudiante </b>
                </div>
                <div className="card-body">
                           
                    <form className="" onSubmit={this. inscribirEstudiante} style={{padding:10}} id="create-course-form" >                      
                        <div className="row ">                                        
                            <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label"><b> Nombres: </b> {this.state.estudiante.nombres_estudiante}</label>
                                   
                                </div>
                            </div>  
                            <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label"><b> Apellidos: </b> {this.state.estudiante.apellidos_estudiante}</label>
    
                                </div>
                            </div>  
                        </div>    

                        <div className="row">
                            
                            <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label"><b> Cédula de Identidad: </b> {this.state.estudiante.numero_identificacion_estudiante}</label>
        
                               </div>
                            </div>  
                            <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label"><b> Fecha de Nacimiento: </b> {this.state.estudiante.fecha_nacimiento_estudiante}</label>

                                </div>
                            </div>  
                        </div>    

                    
                        <div className="row">
                            <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label"><b> Correo electrónico: </b> {this.state.estudiante.email_estudiante}</label>
    
                                </div>
                            </div>  
                            <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label"><b> Teléfono celular: </b> {this.state.estudiante.celular_estudiante}</label>

                                </div>
                            </div>  
                        </div>    
                                                     
                                                        
                        <div className="row">
                        
                            <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label"><b> Dirección: </b> {this.state.estudiante.direccion_estudiante}</label>

                                    
                                    
                                </div>
                            </div>  

                            <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label"><b> Teléfono Convencional: </b> {this.state.estudiante.convencional_estudiante}</label>

                                </div>
                            </div>  

                        </div>      

                            
                        <div className="text-center">
                            <Link to="/estudiante/EditarPerfil">
                                <button type="" className="btn   btn-outline-dark " style={{margin:"5px", width:"150px"}}  > <b>Editar Perfil</b></button>
                            </Link>
                            <Link to="/estudiante">
                                <button type="" className="btn   btn-outline-dark"style={{margin:"5px", width:"150px"}}  ><b>Página Principal</b></button>
                            </Link>
                        
                        </div>
                    </form>          
                </div>
            </div> 

        </div>
        )
    }
}
