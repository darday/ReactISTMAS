import axios from 'axios'
import React, { Component } from 'react'
import { toast } from 'react-toastify'

import { ApiUrl } from '../../services/ApiRest';

const inscribirUrl=ApiUrl+"registro";
const carrerasUrl=ApiUrl+"listarcarreras";

const tipoSangreUrl= ApiUrl+"tiposangre";
const etniaUrl= ApiUrl+"etnias";
const formacionEstudianteUrl= ApiUrl+"formacion";
const ocupacionUrl= ApiUrl+"ocupaciones";
const colegiosUrl= ApiUrl+"colegios";
const bachilleratosUrl= ApiUrl+"bachilleratos";

export default class RegistrarEstudiantes extends Component {

    constructor(props) {
		super(props)

		this.state = {
            carrera:[],
            carrera_seleccionada:'',    
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
        }
        this.handleChange = this.handleChange.bind(this);

    }
    
    handleChange = async (e)=>{
        await this.setState({ [e.target.name]: e.target.value });  
        this.setState({carrera_seleccionada:this.state.idCarrera});       
        this.setState({estado:""});
        console.log("carrera selec"+this.state.carrera_seleccionada);

        if(this.state.idFormacionEstudiante != 8 || this.state.idFormacionEstudiante == ""  ){
            this.setState({mostrarText:1});            
            console.log("No mostrar");
            this.setState({tituloAcademico : this.state.ninguno  });
            console.log("es 4 y ")
            console.log(this.state.tituloAcademico)
        }else{
            
            this.setState({mostrarText:0});
            console.log("mostrar");
            this.setState({tituloAcademico : this.state.descTitAcad });

        }
    }

    validarFormulario =()=>{
        console.log("estoy validando")
        //console.log(this.state.idCarrera);
        //si el campo está fuera(!) de ese rango acepta tildes y la ñ 
        if((/[^a-zA-ZÀ-ÿ\s]/.test(this.state.firstName)) || (/[^a-zA-ZÀ-ÿ\s]/.test(this.state.lastName))){
            toast.error("Error: Los campos Nombres y Apellidos solo pueden ser letras", {position: toast.POSITION.BOTTOM_RIGHT});            
            return false;
        }else{
            if(/[^\d]/.test(this.state.telfConvencional) || /[^\d]/.test(this.state.telfCelular )){
                toast.error("Error: Los campos Teléfono Celular y Teléfono Convencional deben ser solamente números", {position: toast.POSITION.BOTTOM_RIGHT});           

                return false;
            }else{
                if(/[^\d]/.test(this.state.ci)){
                    toast.error("Error: El campo Cédula de Identidad debe contener solamente números", {position: toast.POSITION.BOTTOM_RIGHT});   
                    return false;
                }
                    
                
            }
        }
        
        return true;
    }

    calcularEdad = (e)=>{
        e.preventDefault();
        console.log("fechaactual");
        console.log(new Date());
        console.log(this.state.fechaNaci);
        var birthday = this.state.fechaNaci;
        var birthday_arr = birthday.split("-");
        var birthday_date = new Date(birthday_arr[0], birthday_arr[1] - 1, birthday_arr[2]);
        var ageDifMs = Date.now() - birthday_date.getTime();
        var ageDate = new Date(ageDifMs);
        var edadA = Math.abs(ageDate.getUTCFullYear() - 1970);
        console.log("edad");
        console.log(edadA);
        this.setState({edad:edadA});
       
    }

    inscribirEstudiante = async (e)=>{
        e.preventDefault();
        
        if(this.state.password === this.state.passwordConfirm){
            if(await this.validarFormulario()){
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
                    carrera_id: this.state.carrera_seleccionada,
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

                        this.setState(
                            {
                                carrera:[],
                                carrera_seleccionada:'',    
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
                            }
                        )
                        this.setState({estado:"Datos Agregados Correctamente "});
                        this.setState({abierto: !this.state.abierto});
                        toast.success("Datos Agregados Correctamente ", {position: toast.POSITION.BOTTOM_RIGHT});



                    }else{
                        if( response.data.errors.numero_identificacion_estudiante){
                            this.setState({estado:"El usuario con el número de cédula ingresado ya existe"});
                            toast.error("El usuario con el número de cédula ingresado ya existe", {position: toast.POSITION.BOTTOM_RIGHT});

                        }

                        if( response.data.errors.email_estudiante){
                            this.setState({estado:"El correo electrónico ingresado ya existe en el sistema"});
                            toast.error("El correo electrónico ingresado ya existe en el sistema!", {position: toast.POSITION.BOTTOM_RIGHT});

                        }
                        if(response.data.message=="validation_error"){
                            this.setState({estado:"Error: No se han seleccionado todos los campos"});
                            toast.error("Error: No se han seleccionado todos los campos", {position: toast.POSITION.BOTTOM_RIGHT});
                        }

                    
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.setState({estado:"Error No se pudo conectar con el servidor"});
                    toast.error("No se pudo conectar con el Servidor!", {position: toast.POSITION.BOTTOM_RIGHT});


                })  

            }            
            
        }else{
            this.setState({estado:"Las contraseñas no coinciden"});     
            console.log("contraseña no coincide")      ;
            toast.error("Las contraseñas no coinciden!", {position: toast.POSITION.BOTTOM_RIGHT});


        }
    }	
    
    componentDidMount() {
        axios.get(carrerasUrl   )
        .then(res => {  
        const carrera = res.data;
        this.setState({ carrera });

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
                    <div className="card-body ">
                                    <ol className="breadcrumb mb-4">
                                        <li className="breadcrumb-item active">{this.state.estado}</li>
                                    </ol>

                                    <div className="row ">                                        
                                        <div className="col-12 col-sm-5 col-md-6 col-lg-5 col-xl-5 centrar" >
                                            <div className="mb-3">
                                                <label  className="form-label"><b>Carrera</b></label>
                                                <select className="form-select" name="idCarrera" value={this.state.carrera_seleccionada} onChange={this.handleChange} aria-label="Default select example" required>
                                                    <option value=""></option>                                               
                                                        { this.state.carrera.map(person => <option key={person.id_carrera} value={person.id_carrera} > { person.descripcion_carrera}</option>)}
                                                        
                                                    
                                                </select>
                                            </div>
                                        </div>  
                                        <div className="col-12 col-sm-5  col-md-6 col-lg-5 col-xl-5 centrar" >
                                            <div className="mb-3">
                                                
                                            </div>
                                        </div>  
                                    </div>    
                                    
                                    <form className="" onSubmit={this.inscribirEstudiante} style={{padding:10}} id="create-course-form" >   
                                        <div className="row ">
                                            
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 centrar" >
                                                <div className="mb-3">
                                                    <label  className="form-label">Nombres Completos:</label>
                                                    <input type="text" name="firstName" value={this.state.firstName}  onChange={this.handleChange} className="form-control"  required/>
                                                </div>
                                            </div>  
                                            <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
                                                <div className="mb-3">
                                                    <label  className="form-label">Apellidos Completos:</label>
                                                    <input type="text" name="lastName"  onChange={this.handleChange}  value={this.state.lastName} className="form-control"   required/>
                                                </div>
                                            </div>  
                                        </div>    

                                        <div className="row">
                                            
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 centrar" >
                                                <div className="mb-3">
                                                    <label  className="form-label">Cédula de Identidad:</label>
                                                    <input type="text" name="ci"  onChange={this.handleChange}  value={this.state.ci} className="form-control" maxLength="10"  required/>
                                                </div>
                                            </div>  
                                            <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
                                                <div className="mb-3">
                                                    <label  className="form-label">Fecha de Nacimiento:</label>
                                                    <input type="date" name="fechaNaci"  onChange={this.handleChange} onBlur={this.calcularEdad} value={this.state.fechaNaci} className="form-control" required />
                                                </div>
                                            </div>  
                                        </div>    

                                        <div className="row">
                                            
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 centrar" >
                                                <div className="mb-3">
                                                    <label  className="form-label">Edad:</label>
                                                    <input type="number" name="edad"  onChange={this.handleChange}  value={this.state.edad} className="form-control" maxLength="10" readOnly/>
                                                </div>
                                            </div>  
                                            <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
                                                <div className="mb-3">
                                                    <label  className="form-label">Tipo de Sangre:</label>
                                                    <select className="form-select" name="idTipoSangre" value={this.state.value} onChange={this.handleChange} aria-label="Default select example" required> 
                                                        <option value=""></option>                                                   
                                                            { this.state.tipoSangre.map(sangre => <option key={sangre.id_tipo_sangre} value={sangre.id_tipo_sangre} > { sangre.descripcion_tipo_sangre}</option>)}                                                                                                     
                                                    </select>


                                                </div>
                                            </div>  
                                        </div>    


                                        <div className="row">
                                            
                                            <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
                                                <div className="mb-3">
                                                    <label  className="form-label">Etnia:</label>
                                                    <select className="form-select" name="idetnia" value={this.state.value} onChange={this.handleChange} aria-label="Default select example" required>
                                                        <option value=""></option>                                                   
                                                            { this.state.etnia.map(etnias => <option key={etnias.id_etnia} value={etnias.id_etnia} > { etnias.descripcion_etnia}</option>)}                                                                                                     
                                                    </select>


                                                </div>
                                            </div>  

                                            <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 centrar" >
                                                <div className="mb-3">
                                                    <label  className="form-label">Nivel de Formación:</label>
                                                    <select className="form-select" name="idFormacionEstudiante" value={this.state.value} onChange={this.handleChange} aria-label="Default select example"required>
                                                        <option value=""></option>                                                   
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
                                            
                                            <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
                                                <div className="mb-3">
                                                    <label  className="form-label">Ocupación:</label>
                                                    <select className="form-select" name="idOcupacion" value={this.state.value} onChange={this.handleChange} aria-label="Default select example" required>
                                                        <option value=""></option>                                                   
                                                            { this.state.ocupacion.map(ocu => <option key={ocu.id_ocupacion_estudiante} value={ocu.id_ocupacion_estudiante} > { ocu.descripcion_ocupacion_estudiante}</option>)}                                                                                                     
                                                    </select>


                                                </div>
                                            </div>  

                                            <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 centrar" >
                                                <div className="mb-3">
                                                    <label  className="form-label">Tipo Colegio:</label>
                                                    <select className="form-select" name="idTipoColegio" value={this.state.value} onChange={this.handleChange} aria-label="Default select example" required>
                                                        <option value=""></option>                                                   
                                                            { this.state.colegio.map(cole => <option key={cole.id_tipo_colegio} value={cole.id_tipo_colegio} > { cole.descripcion_tipo_colegio}</option>)}                                                                                                     
                                                    </select>
                                                </div>
                                            </div>  
                                        </div>    


                                        <div className="row">
                                            
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 centrar" >
                                                <div className="mb-3">
                                                    <label  className="form-label">Nombre del Colegio:</label>
                                                    <input type="text" name="nombreColegio"  onChange={this.handleChange}  value={this.state.nombreColegio}className="form-control"  required />
                                                </div>
                                            </div>  
                                            <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
                                                <div className="mb-3">
                                                    <label  className="form-label">Tipo de Bachillerato Obtenido:</label>
                                                    <select className="form-select" name="idBachillerato" value={this.state.value} onChange={this.handleChange} aria-label="Default select example" required>
                                                        <option value=""></option>                                                   
                                                            { this.state.bachilleratos.map(bachi => <option key={bachi.id_tipo_bachillerato} value={bachi.id_tipo_bachillerato} > { bachi.descripcion_tipo_bachillerato}</option>)}                                                                                                     
                                                    </select>


                                                </div>
                                            </div>  
                                        </div>   




                                    
                                        <div className="row">
                                            <div className="col-12 col-md-6 col-lg-5 col-xl-5 centrar" >
                                                <div className="mb-3">
                                                    <label  className="form-label">Correo Electrónico:</label>
                                                    <input type="email" name="email"  onChange={this.handleChange}  value={this.state.email} className="form-control" required />
                                                </div>
                                            </div>  
                                            <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
                                                <div className="mb-3">
                                                    <label  className="form-label">Teléfono Celular:</label>
                                                    <input type="text" name="telfCelular"  onChange={this.handleChange}  value={this.state.telfCelular} className="form-control"   required />
                                                </div>
                                            </div>  
                                        </div>    

                                        <div className="row">
                                            <div className="col-12 col-md-6 col-lg-5 col-xl-5 centrar" >
                                                <div className="mb-3">
                                                    <label  className="form-label">Contraseña:</label>
                                                    <input type="password" name="password" id="password"  onChange={this.handleChange}  value={this.state.password}  className="form-control"  required  />
                                                    <div id="emailHelp" className="form-text "  ></div>
                                                

                                                </div>
                                            </div>  
                                            <div className="col-12 col-md-6 col-lg-5 col-xl-5 centrar" >
                                                <div className="mb-3">
                                                    <label  className="form-label">Confirmar Contraseña:</label>
                                                    <input type="password" name="passwordConfirm" id="passwordConfirm" onChange={this.handleChange}  value={this.state.passwordConfirm} className="form-control" placeholder="Password"  required  />
                                                </div>
                                            </div>  
                                        </div>  
                                                                        

                                        <div className="row">
                                        
                                            <div className="col-12 col-md-6 col-lg-5 col-xl-5 centrar" >
                                                <div className="mb-3">
                                                    <label  className="form-label">Dirección:</label>
                                                    <input type="text" name="direccion" onChange={this.handleChange}  value={this.state.direccion} className="form-control"   required />
                                                </div>
                                            </div>  

                                            <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
                                                <div className="mb-3">
                                                    <label  className="form-label">Teléfono Convencional:</label>
                                                    <input type="text" name="telfConvencional"  onChange={this.handleChange}  value={this.state.telfConvencional} className="form-control"  required />
                                                </div>
                                            </div>  

                                        </div>      

                                        
                                        <div className="text-center ">
                                            <br/> 

                                            <button type="submit" className="btn  btn-outline-dark " style={{ width:"190px", margin:"5px"}}  > <b>Enviar Formulario</b></button>
                                            {/* <Link to="/" >
                                                <button type="button" className="btn  btn-outline-dark "style={{ width:"190px", margin:"5px" }}  ><b>Cancelar Inscripción</b></button>
                                            </Link> */}
                                        </div>

                                    </form>          
                                </div>
                </div> 

            </div>
        )
    }
}
