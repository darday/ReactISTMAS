import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { ApiUrl } from '../../services/ApiRest';

const cookie = new Cookies();
const urlAdministrativo= ApiUrl+"admins/"; //pasar id del estudiante
const idAdministrativo = cookie.get("idAdministrativo");    //declaramos una variable para usar la cookie del login


export default class EditarPerfilAdministrativo extends Component {
    constructor(props) {
		super(props)

		this.state = {
            firstName: '',
			lastName: '',
            ci:'',
            fechaNaci:'',
			email: '',
			telfCelular: '',
            password: '',
            passwordConfirm: '',
            direccion: '',
            telfConvencional:'',
            estado:''
        }
        this.handleChange = this.handleChange.bind(this);

    }
    
    handleChange = async (e)=>{
        await this.setState({ [e.target.name]: e.target.value })
        //var  = this.state.idCarrera;
        // console.log( "carreIE"+idCarrera);
        //console.log( "carreIE"+idCarrera);
    }  

    componentDidMount (){
        axios.get(urlAdministrativo+idAdministrativo   )
          .then(res => {
            const estudiante = res.data;
            this.setState({ 
                firstName: estudiante.nombres_administrativo,
                lastName: estudiante.apellidos_administrativo,
                ci: estudiante.numero_identificacion_administrativo,
                fechaNaci:estudiante.fecha_nacimiento_administrativo,
                email:estudiante.email_administrativo,
                telfCelular:estudiante.celular_administrativo,
                telfConvencional:estudiante.convencional_administrativo,
                direccion:estudiante.direccion_administrativo,
                password:estudiante.password_administrativo,
                passwordConfirm:estudiante.password_estudiante

            });
            
          })
    }

    editarAdministrativo = async (e)=>{
        e.preventDefault();
        console.log("Aun no está en el backend")
    }

    

    render() {
        return (
            <div className="row animate__animated animate__fadeIn">
                <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item active">{this.state.estado}</li>
                </ol>


                <div className="card shadow p-3 mb-5 bg-white rounded">
                    <div className="card-header">
                        <i className="fas fa-hospital-user"></i>       
                            <b>-Editar Perfil Administrativo </b>
                    </div>
                    <div className="card-body">
                           
                        <form className="" onSubmit={this.editarAdministrativo} style={{padding:10}} id="create-course-form" >                    
                            <div className="row ">                                        
                                <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Nombres Completos:</label>
                                        <input type="text" name="firstName"  onChange={this.handleChange} value={this.state.firstName}  className="form-control"  placeholder="Nombres" required/>
                                    </div>
                                </div>  
                                <div className="col-12 col-sm-12  col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Apellidos Completos:</label>
                                        <input type="text" name="lastName"  onChange={this.handleChange} value={this.state.lastName}  className="form-control"  placeholder="Apellidos" required/>
                                    </div>
                                </div>  
                            </div>    

                            <div className="row">
                                
                                <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Cédula de Identidad:</label>
                                        <input type="text" name="ci"  onChange={this.handleChange} value={this.state.ci} maxLength="10" className="form-control"  placeholder="CI" required/>
                                    </div>
                                </div>  
                                <div className="col-12 col-sm-12  col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Fecha de Nacimiento:</label>
                                        <input type="date" name="fechaNaci"  onChange={this.handleChange} value={this.state.fechaNaci} className="form-control"  placeholder="Apellidos" required/>
                                    </div>
                                </div>  
                            </div>    

                        
                            <div className="row">
                                <div className="col-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Correo Electrónico:</label>
                                        <input type="email" name="email"  onChange={this.handleChange} value={this.state.email} className="form-control" placeholder="Email" required/>
                                    </div>
                                </div>  
                                <div className="col-12 col-sm-12  col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Teléfono Celular:</label>
                                        <input type="number" name="telfCelular"  onChange={this.handleChange} value={this.state.telfCelular} className="form-control"  placeholder="Teléfono Celular" required/>
                                    </div>
                                </div>  
                            </div>    

                            <div className="row">
                                <div className="col-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Contraseña:</label>
                                        <input type="password" name="password" id="password"  onChange={this.handleChange}   className="form-control" placeholder="Password"   required />
                                        <div id="emailHelp" className="form-text "  ></div>
                                    

                                    </div>
                                </div>  
                                <div className="col-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Confirmar Contraseña:</label>
                                        <input type="password" name="passwordConfirm" id="passwordConfirm" onChange={this.handleChange} className="form-control" placeholder="Password"   required />
                                    </div>
                                </div>  
                            </div>  

                            <div className="row">
                                <div className="col-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Dirección:</label>
                                        <input type="text" name="direccion" id="password"  onChange={this.handleChange}   value={this.state.direccion}  className="form-control" placeholder="Dirección"   required />
                                                                     

                                    </div>
                                </div>  
                                <div className="col-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Teléfono Convencional:</label>
                                        <input type="text" name="telfConvencional" id=""  onChange={this.handleChange}  value={this.state.telfConvencional} className="form-control" placeholder="Teléfono Convencional"   required />
                                      
                                    </div>
                                </div>  
                            </div>  

                            
                            <div className="text-center">
                                <button type="submit" className="btn  btn-outline-dark" style={{margin:"5px"}}  > <b>Guardar Cambios</b></button>
                                <Link to="/administrativo">
                                    <button type="" className="btn  btn-outline-dark "style={{margin:"5px"}}  ><b>Página Principal</b></button>
                                </Link>
                            </div>
                        </form>          
                    </div>
                </div> 

            </div>

        )
    }
}
