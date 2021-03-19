import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import "../../services/ApiRest";
import { ApiUrl } from '../../services/ApiRest';

const urlAgregarAdmin=(ApiUrl+"registro-admin");


export default class AgregarPersAdmin extends Component {
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

    

    agregarAdministrativo = async (e)=>{
       
        e.preventDefault();
        console.log("Se ejecuta");
        if(this.state.password === this.state.passwordConfirm){
            
            await axios
            .post(urlAgregarAdmin, {
                nombres_administrativo: this.state.firstName, 
                apellidos_administrativo: this.state.lastName, 
                numero_identificacion_administrativo: this.state.ci,
                fecha_nacimiento_administrativo: this.state.fechaNaci,
                email_administrativo: this.state.email, 
                celular_administrativo:this.state.telfCelular,
                direccion_administrativo:this.state.direccion,
                password_administrativo: this.state.password,
                convencional_administrativo:this.state.telfConvencional

            })
			.then(response => {
                console.log(response);
                
                if(response.data.success === true){
                    this.setState({estado: response.data.message});
                    e.target.reset(); //resetea valores del formulario
                    this.setState({estado:"Datos Agregados Correctamente"});

                }else{
                    this.setState({estado: response.data.message});
                }
			})
			.catch(error => {
                console.log(error);
                this.setState({estado:"Error No se pudo conectar con el servidor"});

            })            
            
        }else{
            this.setState({estado:"Las contraseñas no coinciden"});     
            console.log("contraseña no coincide")      ;
        }
    }	
    
    componentDidMount() {
        //  axios.get(carrerasUrl   )
        // .then(res => {  
        // const carrera = res.data;
        // this.setState({ carrera });
        
        // })
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
                            <b>-Agregar Administrativo </b>
                    </div>
                    <div className="card-body">
                           
                        <form className="" onSubmit={this.agregarAdministrativo} style={{padding:10}} id="create-course-form" >                    
                            <div className="row ">                                        
                                <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Nombres Completos:</label>
                                        <input type="text" name="firstName"  onChange={this.handleChange} className="form-control"  placeholder="Nombres" required/>
                                    </div>
                                </div>  
                                <div className="col-12 col-sm-12  col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Apellidos Completos:</label>
                                        <input type="text" name="lastName"  onChange={this.handleChange} className="form-control"  placeholder="Apellidos" required/>
                                    </div>
                                </div>  
                            </div>    

                            <div className="row">
                                
                                <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Cédula de Identidad:</label>
                                        <input type="text" name="ci"  onChange={this.handleChange} maxLength="10" className="form-control"  placeholder="CI" required/>
                                    </div>
                                </div>  
                                <div className="col-12 col-sm-12  col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Fecha de Nacimiento:</label>
                                        <input type="date" name="fechaNaci"  onChange={this.handleChange} className="form-control"  placeholder="Apellidos" required/>
                                    </div>
                                </div>  
                            </div>    

                        
                            <div className="row">
                                <div className="col-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Correo Electrónico:</label>
                                        <input type="email" name="email"  onChange={this.handleChange} className="form-control" placeholder="Email" required/>
                                    </div>
                                </div>  
                                <div className="col-12 col-sm-12  col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Teléfono Celular:</label>
                                        <input type="number" name="telfCelular"  onChange={this.handleChange} className="form-control"  placeholder="Teléfono Celular" required/>
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
                                        <input type="text" name="direccion" id="password"  onChange={this.handleChange}   className="form-control" placeholder="Dirección"   required />
                                                                     

                                    </div>
                                </div>  
                                <div className="col-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Teléfono Convencional:</label>
                                        <input type="text" name="telfConvencional" id=""  onChange={this.handleChange}   className="form-control" placeholder="Teléfono Convencional"   required />
                                      
                                    </div>
                                </div>  
                            </div>  

                            <div className="text-center">
                                <button type="submit" className="btn  back-istmas centrar" style={{margin:"5px"}}  > <b>Enviar Formulario</b></button>
                                <Link to="/login">
                                    <button type="" className="btn  back-istmas centrar"style={{margin:"5px"}}  ><b>Cancelar Inscripción</b></button>
                                </Link>
                            
                            </div>
                        </form>          
                    </div>
                </div> 

            </div>
        )
    }
}
