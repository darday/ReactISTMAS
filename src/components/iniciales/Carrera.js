import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';
import { NavbarLog } from '../navbar/NavbarLog';
import "./Carrera.css";
import "../services/ApiRest"
import { ApiUrl } from '../services/ApiRest';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const cookies = new Cookies();
const idCarrera= cookies.get("idCarrera");  //trae la cooki de carrerasScreen
//console.log("carrera"+idCarrera);
const baseUrl=ApiUrl+"carreras/"+idCarrera;  //carreras 
const inscribirUrl= ApiUrl+"registro";
const tipoSangreUrl= ApiUrl+"tiposangre";
const etniaUrl= ApiUrl+"etnias";
const formacionEstudianteUrl= ApiUrl+"formacion";
const ocupacionUrl= ApiUrl+"ocupaciones";
const colegiosUrl= ApiUrl+"colegios";
const bachilleratosUrl= ApiUrl+"bachilleratos";

//console.log(idCarrera);

export default class Carrera extends Component {

    constructor(props) {
        super(props);
        this.state = {    
            carrera:[],
            firstName: '',
			lastName: '',
            fechaNaci:'',
			email: '',
			telfCelular: '',
            telfConvencional: '',
            direccion: '',
            ci:'',
            password: '',
            passwordConfirm: '',
            estado:'',
            edad:'',
            tipoSangre:[],
            etnia:[],
            formacionEstudiante:[],
            descTitAcad:"",
            mostrarText:1,
            feSeleccionado:[],
            ocupacion:[],
            colegio:[],
            nombreColegio:"",
            bachilleratos:[],
            colegio_id:"1",


            ninguno:"Ninguno",
            tituloAcademico:"",
            abierto: false,
            rolEstudiante:"Estudiante" 
        };
    
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange = async (e)=>{
        await this.setState({ [e.target.name]: e.target.value });         
        this.setState({estado:""});
        //console.log( this.state );

        if(this.state.idFormacionEstudiante != 8 || this.state.idFormacionEstudiante == "undefined"  ){
            this.setState({mostrarText:1});            
            console.log("No mostrar");
            this.setState({tituloAcademico : this.state.ninguno  });
            console.log("es 4 y undefined")
            console.log(this.state.tituloAcademico)
        }else{
            
            this.setState({mostrarText:0});
            console.log("mostrar");
            this.setState({tituloAcademico : this.state.descTitAcad });

        }
    }

    inscribirEstudiante = async (e)=>{
              
        e.preventDefault();
        // console.log(this.state);
        
        if(this.state.password === this.state.passwordConfirm){
            
          

            await axios
            .post(inscribirUrl, {
                nombres_estudiante: this.state.firstName, 
                apellidos_estudiante: this.state.lastName, 
                numero_identificacion_estudiante: this.state.ci,
                fecha_nacimiento_estudiante: this.state.fechaNaci,
                email_estudiante: this.state.email, 
                celular_estudiante:this.state.telfCelular,
                convencional_estudiante: this.state.telfConvencional, 
                direccion_estudiante:this.state.direccion,
                password_estudiante: this.state.password,
                carrera_id: idCarrera,
                edad:this.state.edad,
                tipo_sangre_id:this.state.idTipoSangre,
                etnia_id:this.state.idetnia,
                nivel_formacion_estudiante_id:this.state.idFormacionEstudiante,
                descripcion_titulo_academico:this.state.tituloAcademico,
                ocupacion_estudiante_id:this.state.idOcupacion,
                tipo_colegio_id:this.state.idTipoColegio,           
                descripcion_colegio:this.state.nombreColegio,
                colegio_id:this.state.colegio_id,
                tipo_bachillerato_id:this.state.idBachillerato,
                rol_estudiante:this.state.rolEstudiante             
                

            })
			.then(response => {
                console.log(response);
                
                if(response.data.success === true){
                    this.setState({estado: response.data.message});
                    e.target.reset(); //resetea valores del formulario
                    this.setState({estado:"Datos Agregados Correctamente Inicie Sesión"});
                    this.setState({abierto: !this.state.abierto});
                    toast.success("Datos Agregados Correctamente - Inicie Sesión", {position: toast.POSITION.BOTTOM_CENTER});



                }else{
                    if( response.data.errors.numero_identificacion_estudiante){
                        this.setState({estado:"El usuario con el número de cédula ingresado ya existe"});
                        toast.error("El usuario con el número de cédula ingresado ya existe", {position: toast.POSITION.BOTTOM_CENTER});

                    }

                    if( response.data.errors.email_estudiante){
                        this.setState({estado:"El correo electrónico ingresado ya existe en el sistema"});
                        toast.error("El correo electrónico ingresado ya existe en el sistema!", {position: toast.POSITION.BOTTOM_CENTER});

                    }

                 
                }
			})
			.catch(error => {
                console.log(error);
                this.setState({estado:"Error No se pudo conectar con el servidor"});
                toast.error("No se pudo conectar con el Servidor!", {position: toast.POSITION.BOTTOM_CENTER});


            })            
            
        }else{
            this.setState({estado:"Las contraseñas no coinciden"});     
            console.log("contraseña no coincide")      ;
            toast.error("Las contraseñas no coinciden!", {position: toast.POSITION.BOTTOM_CENTER});


        }
    }	
    
 
    componentDidMount() {
        axios.get(baseUrl   )
          .then(res => {
            const carrera = res.data;
            this.setState({ carrera });
            //console.log(carrera);
        })
          //////////
        axios.get(tipoSangreUrl)
        .then(res=>{
            const tipoSangre = res.data;
            this.setState({tipoSangre});

            //console.log(tipoSangre);

        })

        /////////////////

        axios.get(etniaUrl)
        .then(res=>{
            const etnia = res.data;
            this.setState({etnia});
            //console.log(etnia);

        })

        /////////////////

        axios.get(formacionEstudianteUrl)
        .then(res=>{
            const formacionEstudiante = res.data;
            this.setState({formacionEstudiante});
            //console.log(formacionEstudiante);

        })

        /////////////////////////
        axios.get(ocupacionUrl)
        .then(res=>{
            const ocupacion = res.data;
            this.setState({ocupacion});
           console.log(ocupacion);
        })

        /////////////
        axios.get(colegiosUrl)
        .then(res=>{
            const colegio = res.data;
            this. setState({colegio});
            //console.log(colegio);
        })
    
        /////////////
        axios.get(bachilleratosUrl)
        .then(res=>{
            const bachilleratos = res.data;
            this. setState({bachilleratos});
          //  console.log(bachilleratos);
        })
    
        
       

    }

    abrirModal=()=>{
        this.setState({abierto: !this.state.abierto});
    }



      

        

        



        
    
    render() {

        //console.log(this.state.carrera)
       // const carreras=this.state.carrera;
     
        /*const doubled = carreras.map((carreras) => {
            if(carreras.id_carrera == idCarrera){
                
                this.state.carreraEncontrada = carreras;
                console.log(this.state.carreraEncontrada);
            }
        });*/
        


        return (
            
            <div >
                <NavbarLog/>
                <div className="container" style={{paddingTop:"10vh"}}>                    
                    <br/>
                    <h3 className="titulo-istmas text-center"><b>{this.state.carrera.descripcion_carrera}</b></h3>
                    <hr/>
                    <div className="row ">
                        <div className= "  col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                            <div className="card shadow p-3 mb-5 bg-white rounded">
                                <div className="card-header">
                                    <h5>Información General</h5>
                                </div>
                                <div className="card-body">                                    
                                    <div className="mb-3">
                                        <label  className="form-label"><b>Duración: </b>{this.state.carrera.duracion_carrera}</label><br/>                                      
                                        <label  className="form-label"><b>Jornada: </b>{this.state.carrera.descripcion_jornada_carrera}</label>    <br/>                                   
                                        <label  className="form-label"><b>Modalidad: </b>{this.state.carrera.descripcion_modalidad_carrera}</label>  <br/>                                     
                                        <label  className="form-label"><b>Titulo Otorgado: </b>{this.state.carrera.descripcion_titulo_carrera}</label>   <br/>                                    
                                    </div>                                    
                                
                                    <a href="#inscribirme"> <button type="button"  className="btn  back-istmas"><b>Inscribirme</b></button> </a> 
                                </div>
                            </div>                                                          
                        </div>  

                        <div className= "  col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                            <div className="card shadow p-3 mb-5 bg-white rounded">
                                <div className="card-header">
                                    <h5>LOGO CARRERA</h5>
                                </div>
                                <div className="card-body">                                    
                                    <div className="mb-3">
                                    </div>
                                    
                                </div>
                            </div>                                                          
                        </div>  


                        <div className= "  col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                            <div className="">
                                <div className="card-header">
                                    <h5>Misión de la carrera</h5>
                                </div>
                                <div className="card-body">                                    
                                    <div className="mb-3">
                                        <p className="text-justificado">{this.state.carrera.mision_carrera}</p>
                                    </div>
                                    
                                </div>
                            </div>                                                          
                        </div>  

                        <div className= "  col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                            <div className="">
                                <div className="card-header">
                                    <h5>Visión de la carrera</h5>
                                </div>
                                <div className="card-body">                                    
                                    <div className="mb-3">
                                        <p className="text-justificado">{this.state.carrera.vision_carrera}</p>
                                    </div>
                                    
                                </div>
                            </div>                                                          
                        </div> 

                        <div className= "  col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div className="">
                                <div className="card-header">
                                    <h5>Perfil de egreso de la carrera</h5>
                                </div>
                                <div className="card-body">                                    
                                    <div className="mb-3">
                                        <p className="text-justificado">{this.state.carrera.perfil_egreso_carrera}</p>
                                    </div>
                                    
                                </div>
                            </div>                                                          
                        </div> 

                        <div className= "  col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div className="">
                                <div className="card-header">
                                    <h5>Campo Ocupacional</h5>
                                </div>
                                <div className="card-body">                                    
                                    <div className="mb-3">
                                        <p className="text-justificado">{this.state.carrera.campo_ocupacional_carrera}</p>
                                    </div>
                                    
                                </div>
                            </div>                                                          
                        </div> 

                    </div>

                    <div className="inscribirme" id="inscribirme">
                        <div className="row centrar" style={{width:"80%"}}>
                        
                        <div className="card shadow p-3 mb-5 bg-white rounded ">
                            <div className="card-header text-center head-form" >
                                        <h4>FORMULARIO DE INSCRIPCIÓN</h4>
                            </div>
                            
                            <div className="card-body ">
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item active">{this.state.estado}</li>
                                </ol>
                                <form className="" onSubmit={this.inscribirEstudiante} style={{padding:10}} id="create-course-form" >   
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
                                                <input type="text" name="ci"  onChange={this.handleChange} className="form-control" maxLength="10" placeholder="CI" required/>
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
                                        
                                        <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                            <div className="mb-3">
                                                <label  className="form-label">Edad:</label>
                                                <input type="number" name="edad"  onChange={this.handleChange} className="form-control" maxLength="10" placeholder="Edad" required/>
                                            </div>
                                        </div>  
                                        <div className="col-12 col-sm-12  col-lg-5 col-xl-5 centrar" >
                                            <div className="mb-3">
                                                <label  className="form-label">Tipo de Sangre:</label>
                                                <select className="form-select" name="idTipoSangre" value={this.state.value} onChange={this.handleChange} aria-label="Default select example">
                                                    <option value="undefined">Seleccione tipo de sangre</option>                                                   
                                                        { this.state.tipoSangre.map(sangre => <option key={sangre.id_tipo_sangre} value={sangre.id_tipo_sangre} > { sangre.descripcion_tipo_sangre}</option>)}                                                                                                     
                                                </select>


                                            </div>
                                        </div>  
                                    </div>    


                                    <div className="row">
                                        
                                        <div className="col-12 col-sm-12  col-lg-5 col-xl-5 centrar" >
                                            <div className="mb-3">
                                                <label  className="form-label">Etnia:</label>
                                                <select className="form-select" name="idetnia" value={this.state.value} onChange={this.handleChange} aria-label="Default select example">
                                                    <option value="undefined">Seleccione una etnia</option>                                                   
                                                        { this.state.etnia.map(etnias => <option key={etnias.id_etnia} value={etnias.id_etnia} > { etnias.descripcion_etnia}</option>)}                                                                                                     
                                                </select>


                                            </div>
                                        </div>  

                                        <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                            <div className="mb-3">
                                                <label  className="form-label">Nivel de Formación del Estudiante:</label>
                                                <select className="form-select" name="idFormacionEstudiante" value={this.state.value} onChange={this.handleChange} aria-label="Default select example">
                                                    <option value="undefined">Seleccione Formación académica</option>                                                   
                                                        { this.state.formacionEstudiante.map(fe => <option key={fe.id_nivel_formacion} value={fe.id_nivel_formacion} > { fe.descripcion_nivel_formacion}</option>)}                                                                                                     
                                                </select>
                                            </div>
                                        </div>  
                                    </div>  


                                    <div className="row "  hidden={this.state.mostrarText}>
                                        <div className="col-12 col-lg-11 col-xl-11 centrar" >
                                            <div className="mb-3">
                                                <label  className="form-label">Titulo Obtenido:</label>
                                                <input type="text" name="descTitAcad"  onChange={this.handleChange} className="form-control" placeholder="Ejemplo: Ingenieria En Sistemas" />
                                            </div>
                                        </div>  
                                       
                                    </div>   



                                    <div className="row">
                                        
                                        <div className="col-12 col-sm-12  col-lg-5 col-xl-5 centrar" >
                                            <div className="mb-3">
                                                <label  className="form-label">Ocupación:</label>
                                                <select className="form-select" name="idOcupacion" value={this.state.value} onChange={this.handleChange} aria-label="Default select example">
                                                    <option value="undefined">Seleccione una ocupación</option>                                                   
                                                        { this.state.ocupacion.map(ocu => <option key={ocu.id_ocupacion_estudiante} value={ocu.id_ocupacion_estudiante} > { ocu.descripcion_ocupacion_estudiante}</option>)}                                                                                                     
                                                </select>


                                            </div>
                                        </div>  

                                        <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                            <div className="mb-3">
                                                <label  className="form-label">Tipo Colegio:</label>
                                                <select className="form-select" name="idTipoColegio" value={this.state.value} onChange={this.handleChange} aria-label="Default select example">
                                                    <option value="undefined">Seleccione Formación académica</option>                                                   
                                                        { this.state.colegio.map(cole => <option key={cole.id_tipo_colegio} value={cole.id_tipo_colegio} > { cole.descripcion_tipo_colegio}</option>)}                                                                                                     
                                                </select>
                                            </div>
                                        </div>  
                                    </div>    


                                    <div className="row">
                                        
                                        <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                            <div className="mb-3">
                                                <label  className="form-label">Nombre del Colegio:</label>
                                                <input type="text" name="nombreColegio"  onChange={this.handleChange} className="form-control" placeholder="Nombre del Colegio" required/>
                                            </div>
                                        </div>  
                                        <div className="col-12 col-sm-12  col-lg-5 col-xl-5 centrar" >
                                            <div className="mb-3">
                                                <label  className="form-label">Tipo de Bachillerato Obtenido:</label>
                                                <select className="form-select" name="idBachillerato" value={this.state.value} onChange={this.handleChange} aria-label="Default select example">
                                                    <option value="undefined">Seleccione tipo de bachillerato</option>                                                   
                                                        { this.state.bachilleratos.map(bachi => <option key={bachi.id_tipo_bachillerato} value={bachi.id_tipo_bachillerato} > { bachi.descripcion_tipo_bachillerato}</option>)}                                                                                                     
                                                </select>


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
                                                <input type="text" name="direccion" onChange={this.handleChange} className="form-control"  placeholder="Dirección"  required />
                                            </div>
                                        </div>  

                                        <div className="col-12 col-sm-12  col-lg-5 col-xl-5 centrar" >
                                            <div className="mb-3">
                                                <label  className="form-label">Teléfono Convencional:</label>
                                                <input type="number" name="telfConvencional"  onChange={this.handleChange} className="form-control"  placeholder="Teléfono Celular" required/>
                                            </div>
                                        </div>  

                                    </div>      

                                    
                                    <div className="text-center ">
                                        <br/> 

                                        <button type="submit" className="btn  btn-outline-dark " style={{ width:"190px", margin:"5px"}}  > <b>Enviar Formulario</b></button>
                                        <Link to="/" >
                                            <button type="button" className="btn  btn-outline-dark "style={{ width:"190px", margin:"5px" }}  ><b>Cancelar Inscripción</b></button>
                                        </Link>
                                    </div>

                                </form>          
                            </div>
                        </div> 


                        
                    </div>




                    </div>
                    



                </div>

                <Modal isOpen={this.state.abierto} >
                    <ModalHeader>
                    Aviso
                    </ModalHeader>
                    <ModalBody>
                    <FormGroup>
                        <Label for="usuario">Usuario Agregado con éxito, Inicie Sesión</Label>
                        
                    </FormGroup>
                    
                    </ModalBody>

                    <ModalFooter>
                        <Link to="/login">
                            <Button color="primary">Iniciar Sesión</Button>
                        </Link>
                        <Button color="secondary" onClick={this.abrirModal}>Cerrar</Button>
                    </ModalFooter>
                </Modal>


                
                
            </div>
        )
    }
}
