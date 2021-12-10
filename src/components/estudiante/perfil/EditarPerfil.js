import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import "../../services/ApiRest"
import { ApiUrl } from '../../services/ApiRest';

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const cookies= new Cookies();
const urlActualizar=ApiUrl+"estudiantes/";
const urlEstudiante= ApiUrl+ "estudiantes/"; //pasar id del estudiante

const idEstudiante= cookies.get('idEstudiante');

//console.log("este es el ID"+idEstudiante);

export default class EditarPerfil extends Component {

    constructor(props) {
		super(props)

		this.state = {
            estudiante: [],
            carrera_seleccionada:'',
            firstName: '',
			lastName: '',
            ci:'',
            fechaNaci:'',
			email: '',
			telfCelular: '',
            password: '',
            passwordConfirm: '',
            direccion: '',
            telfConvencional: '',
            estado:''
        }
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange = async (e)=>{
        await this.setState({ [e.target.name]: e.target.value })
        //var  = this.state.idCarrera;

        // this.setState({carrera_seleccionada:this.state.idCarrera});
        this.setState({estado:""});



       // console.log( "carreIE"+idCarrera);
        //console.log( "carreIE"+idCarrera);
    }

    actualizarEstudiante = async (e)=>{
        const carrera=this.state.carrera;
        console.log("carrera de estu"+carrera);
        e.preventDefault();
        console.log(this.state);
       // console.log("Se ejecuta");
        if(this.state.password === this.state.passwordConfirm){

            await axios
            .put(urlActualizar+idEstudiante, {
                nombres_estudiante: this.state.firstName,
                apellidos_estudiante: this.state.lastName,
                fecha_nacimiento_estudiante: this.state.fechaNaci,
                email_estudiante: this.state.email,
                celular_estudiante:this.state.telfCelular,
                convencional_estudiante: this.state.telfConvencional,
                direccion_estudiante:this.state.direccion,
                numero_identificacion_estudiante: this.state.ci,
                password_estudiante: this.state.password,
                carrera_id: this.state.carrera_seleccionada,

            })
			.then(response => {
                console.log(response);

                if(response.data.success === true){
                    this.setState({estado: response.data.message});
                    
                    e.target.reset(); //resetea valores del formulario
                    this.setState({estado:"Datos Actualizados Correctamente"});
                    toast.success("Datos Actualizados Correctamente!", {position: toast.POSITION.BOTTOM_CENTER});
                    
                    
                }else{
                    this.setState({estado: response.data.message});
                    toast.warning(this.state.estado, {position: toast.POSITION.BOTTOM_CENTER});
                }
			})
			.catch(error => {
                //console.log(error);
                this.setState({estado:"Error No se pudo conectar con el servidor"});
                toast.error("Error No se pudo conectar con el servidor", {position: toast.POSITION.BOTTOM_CENTER});


            })

        }else{
            this.setState({estado:"Las contraseñas no coinciden"});
            console.log("contraseña no coincide")      ;
            toast.error("Las contraseñas no coinciden", {position: toast.POSITION.BOTTOM_CENTER});

        }
    }

    componentDidMount() {
        axios.get(urlEstudiante + idEstudiante)
        .then(respuesta=>{
            const estudiante = respuesta.data[1];
            this.setState({
                firstName: estudiante.nombres_estudiante,
                lastName: estudiante.apellidos_estudiante,
                ci: estudiante.numero_identificacion_estudiante,
                fechaNaci:estudiante.fecha_nacimiento_estudiante,
                email:estudiante.email_estudiante,
                telfCelular:estudiante.celular_estudiante,
                telfConvencional:estudiante.convencional_estudiante,
                direccion:estudiante.direccion_estudiante,
                password:estudiante.password_estudiante,
                passwordConfirm:estudiante.password_estudiante
            });            
        })
    }

    render() {
      //  console.log(this.state.estudiante.id_estudiante);
        return (
            <div className="row animate__animated animate__fadeIn">
                <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item active">{this.state.estado}</li>
                </ol>
                <div className="card shadow p-3 mb-5 bg-white rounded">
                    <div className="card-header back-istmas">
                        <i className="fas fa-graduation-cap"></i>
                            <b>-Editar Mi Perfil </b>
                    </div>
                    <div className="card-body">
                        <form className="" onSubmit={this.actualizarEstudiante} style={{padding:10}} id="create-course-form" >
                            <div className="row ">
                                <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Nombres Completos:</label>
                                        <input type="text" name="firstName"  onChange={this.handleChange} value={this.state.firstName} className="form-control"  placeholder="Nombres" required/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12  col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Apellidos Completos:</label>
                                        <input type="text" name="lastName"  onChange={this.handleChange}  value={this.state.lastName} className="form-control"  placeholder="Apellidos" required/>
                                    </div>
                                </div>
                            </div>

                            <div className="row">

                                <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Cédula de Identidad:</label>
                                        <input type="text" name="ci"  onChange={this.handleChange}  value={this.state.ci} maxLength="10" className="form-control"  placeholder="CI" disabled/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12  col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Fecha de Nacimiento:</label>
                                        <input type="date" name="fechaNaci"  onChange={this.handleChange}  value={this.state.fechaNaci} className="form-control"  placeholder="Apellidos" required/>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Correo Electrónico:</label>
                                        <input type="email" name="email"  onChange={this.handleChange}  value={this.state.email} className="form-control" placeholder="Email" required/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12  col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Teléfono Celular:</label>
                                        <input type="number" name="telfCelular"  onChange={this.handleChange}  value={this.state.telfCelular} className="form-control"  placeholder="Teléfono Celular" required/>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Contraseña:</label>
                                        <input type="password" name="password" id="password"  onChange={this.handleChange}  className="form-control" placeholder="Password"   required />
                                        <div id="emailHelp" className="form-text "  ></div>


                                    </div>
                                </div>
                                <div className="col-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Confirmar Contraseña:</label>
                                        <input type="password" name="passwordConfirm" id="passwordConfirm" onChange={this.handleChange}  className="form-control" placeholder="Password"   required />
                                    </div>
                                </div>
                            </div>


                            <div className="row">

                                <div className="col-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Dirección:</label>
                                        <input type="text" name="direccion" onChange={this.handleChange}  value={this.state.direccion} className="form-control"  placeholder="Dirección"  required />
                                    </div>
                                </div>

                                <div className="col-12 col-sm-12  col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Teléfono Convencional:</label>
                                        <input type="number" name="telfConvencional"  onChange={this.handleChange}  value={this.state.telfConvencional} className="form-control"  placeholder="Teléfono Celular" required/>
                                    </div>
                                </div>

                            </div>


                            <div className="text-center">
                                <button type="submit" className="btn  btn-outline-dark" style={{margin:"5px",width:"190px"}}  > <b>Enviar Formulario</b></button>
                                <Link to="/estudiante">
                                    <button type="" className="btn  btn-outline-dark "style={{margin:"5px", width:"190px"}}  ><b>Cancelar Inscripción</b></button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        )
    }
}
