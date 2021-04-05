import axios from 'axios'
import React, { Component } from 'react'
import { ApiUrl } from '../../services/ApiRest';

const inscribirUrl=ApiUrl+"registro";
const carrerasUrl=ApiUrl+"listarcarreras";

export default class InscribirEstudiantes extends Component {

    constructor(props) {
		super(props)

		this.state = {
            carrera:[], 
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

        this.setState({carrera_seleccionada:this.state.idCarrera});
        this.setState({estado:""});
        console.log("carrera selec"+this.state.carrera_seleccionada);


       // console.log( "carreIE"+idCarrera);
        //console.log( "carreIE"+idCarrera);
    }

    

    inscribirEstudiante = async (e)=>{
        const carrera=this.state.carrera;
        console.log(carrera);
        e.preventDefault();
        console.log("Se ejecuta");
        if(this.state.password === this.state.passwordConfirm){
            
            await axios
            .post(inscribirUrl, {
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
         axios.get(carrerasUrl   )
        .then(res => {  
        const carrera = res.data;
        this.setState({ carrera });
        
        })
    }
    


    render() {
        return (
            <div className="row animate__animated animate__fadeIn">
                <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item active">{this.state.estado}</li>
                </ol>


            <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-header">
                    <i className="fas fa-graduation-cap"></i>
                        <b>-Inscribir Estudiantes </b>
                </div>
                <div className="card-body">
                        <div className="row ">                                        
                            <div className="col-12 col-sm-5 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label"><b>Carrera</b></label>
                                    <select className="form-select" name="idCarrera" value={this.state.value} onChange={this.handleChange} aria-label="Default select example">
                                        <option value="undefined">Seleccione una carrera</option>
                                        
                                        
                                            { this.state.carrera.map(person => <option key={person.id_carrera} value={person.id_carrera} > { person.descripcion_carrera}</option>)}
                                            
                                        
                                    </select>
                                </div>
                            </div>  
                            <div className="col-12 col-sm-5  col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    
                                </div>
                            </div>  
                        </div>    
                    <form className="" onSubmit={this.inscribirEstudiante} style={{padding:10}} id="create-course-form" >  
                      


                       
                        <div className="row ">                                        
                            <div className="col-12 col-sm-5 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Nombres Completos:</label>
                                    <input type="text" name="firstName"  onChange={this.handleChange} className="form-control"  placeholder="Nombres" required/>
                                </div>
                            </div>  
                            <div className="col-12 col-sm-5  col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Apellidos Completos:</label>
                                    <input type="text" name="lastName"  onChange={this.handleChange} className="form-control"  placeholder="Apellidos" required/>
                                </div>
                            </div>  
                        </div>    

                        <div className="row">
                            
                            <div className="col-12 col-sm-5 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Cédula de Identidad:</label>
                                    <input type="text" name="ci"  onChange={this.handleChange} maxLength="10" className="form-control"  placeholder="CI" required/>
                                </div>
                            </div>  
                            <div className="col-12 col-sm-5  col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Fecha de Nacimiento:</label>
                                    <input type="date" name="fechaNaci"  onChange={this.handleChange} className="form-control"  placeholder="Apellidos" required/>
                                </div>
                            </div>  
                        </div>    

                    
                        <div className="row">
                            <div className="col-12 col-sm-5 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Correo Electrónico:</label>
                                    <input type="email" name="email"  onChange={this.handleChange} className="form-control" placeholder="Email" required/>
                                </div>
                            </div>  
                            <div className="col-12 col-sm-5  col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Teléfono Celular:</label>
                                    <input type="number" name="telfCelular"  onChange={this.handleChange} className="form-control"  placeholder="Teléfono Celular" required/>
                                </div>
                            </div>  
                        </div>    

                        <div className="row">
                            <div className="col-12 col-sm-5 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Contraseña:</label>
                                    <input type="password" name="password" id="password"  onChange={this.handleChange}   className="form-control" placeholder="Password"   required />
                                    <div id="emailHelp" className="form-text "  ></div>
                                

                                </div>
                            </div>  
                            <div className="col-12 col-sm-5 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Confirmar Contraseña:</label>
                                    <input type="password" name="passwordConfirm" id="passwordConfirm" onChange={this.handleChange} className="form-control" placeholder="Password"   required />
                                </div>
                            </div>  
                        </div>  
                                                            

                        <div className="row">
                        
                            <div className="col-12 col-sm-5 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Dirección:</label>
                                    <input type="text" name="direccion" onChange={this.handleChange} className="form-control"  placeholder="Dirección"  required />
                                </div>
                            </div>  

                            <div className="col-12 col-sm-5 col-sm-5  col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Teléfono Convencional:</label>
                                    <input type="number" name="telfConvencional"  onChange={this.handleChange} className="form-control"  placeholder="Teléfono Celular" required/>
                                </div>
                            </div>  

                        </div>      

                            
                        <div className="text-center">
                            <button type="submit" className="btn  back-istmas centrar" style={{margin:"5px"}}  > <b>Enviar Formulario</b></button>
                            <button type="" className="btn  back-istmas centrar"style={{margin:"5px"}}  ><b>Cancelar Inscripción</b></button>
                        
                        </div>
                    </form>          
                </div>
            </div> 

        </div>
        )
    }
}
