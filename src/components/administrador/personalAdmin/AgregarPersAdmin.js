import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ApiUrl } from '../../services/ApiRest';

const urlAgregarAdmin=(ApiUrl+"registro-admin");

export const AgregarPersAdmin = () => {

    let estado;
    const [formState, setFormState] = useState({
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
        

    });
    

    const {firstName, lastName,ci,fechaNaci,email,telfCelular,password,passwordConfirm,direccion,telfConvencional} = formState;

    //Primera Forma
    // const handleInputChange = (e)=>{        
    //     setFormState({
    //         ...formState,
    //         [e.target.name]:e.target.value
    //     });
    // }
    //Forma abreviada y no repetitiva

    const handleInputChange = ({target})=>{
        
        setFormState({
            ...formState,
            [target.name]:target.value
        });
    }

    const agregarAdministrativo = async (e)=>{       
        e.preventDefault();
        console.log("Se ejecuta");
        if(password=== passwordConfirm){
            
            await axios
            .post(urlAgregarAdmin, {
                nombres_administrativo: firstName, 
                apellidos_administrativo: lastName, 
                numero_identificacion_administrativo: ci,
                fecha_nacimiento_administrativo: fechaNaci,
                email_administrativo: email, 
                celular_administrativo:telfCelular,
                direccion_administrativo:direccion,
                password_administrativo: password,
                convencional_administrativo:telfConvencional

            })
			.then(response => {
                console.log(response);
                
                if(response.data.success === true){
                    //this.setState({estado: response.data.message});
                    estado=response.data.message;
                    e.target.reset(); //resetea valores del formulario
                    estado="Datos Agregados Correctamente";
                    toast.success("Datos Agregados Correctamente!", {position: toast.POSITION.BOTTOM_CENTER});
                    setFormState({
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
                    });

                }else{
                   // this.setState({estado: response.data.message});
                   estado=response.data.message;
                    toast.warning(estado, {position: toast.POSITION.BOTTOM_CENTER});

                }
			})
			.catch(error => {
                console.log(error);
                estado="Error No se pudo conectar con el servidor";
                toast.error("Error No se pudo conectar con el servidor", {position: toast.POSITION.BOTTOM_CENTER});


            })            
            
        }else{
            estado="Las contraseñas no coinciden";  
            toast.error("Las contraseñas no coinciden", {position: toast.POSITION.BOTTOM_CENTER});
            console.log("contraseña no coincide");
        }
    }	

    return (
        <div className="row animate__animated animate__fadeIn">
        <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item active">{estado}</li>
        </ol>


        <div className="card shadow p-3 mb-5 bg-white rounded">
            <div className="card-header back-istmas">
                <i className="fas fa-hospital-user"></i>       
                    <b>-Agregar Administrativo </b>
            </div>
            <div className="card-body">
                   
                <form className=""  onSubmit={agregarAdministrativo} style={{padding:10}} id="create-course-form" >                    
                    <div className="row ">                                        
                        <div className="col-12 col-sm-6 col-lg-5 col-xl-5 centrar" >
                            <div className="mb-3">
                                <label  className="form-label">Nombres Completos:</label>
                                <input type="text" onChange={handleInputChange} name="firstName" value={firstName} onChange={handleInputChange} className="form-control"  placeholder="Nombres" required/>
                            </div>
                        </div>  
                        <div className="col-12 col-sm-6  col-lg-5 col-xl-5 centrar" >
                            <div className="mb-3">
                                <label  className="form-label">Apellidos Completos:</label>
                                <input type="text" onChange={handleInputChange} name="lastName" value={lastName} className="form-control"  placeholder="Apellidos" required/>
                            </div>
                        </div>  
                    </div>    

                    <div className="row">
                        
                        <div className="col-12 col-sm-6 col-lg-5 col-xl-5 centrar" >
                            <div className="mb-3">
                                <label  className="form-label">Cédula de Identidad:</label>
                                <input type="text" onChange={handleInputChange} name="ci" value={ci} maxLength="10" className="form-control"  placeholder="CI" required/>
                            </div>
                        </div>  
                        <div className="col-12 col-sm-6  col-lg-5 col-xl-5 centrar" >
                            <div className="mb-3">
                                <label  className="form-label">Fecha de Nacimiento:</label>
                                <input type="date" onChange={handleInputChange} name="fechaNaci" value={fechaNaci} className="form-control"  placeholder="Apellidos" required/>
                            </div>
                        </div>  
                    </div>    

                
                    <div className="row">
                        <div className="col-12 col-sm-6 col-lg-5 col-xl-5 centrar" >
                            <div className="mb-3">
                                <label  className="form-label">Correo Electrónico:</label>
                                <input type="email" onChange={handleInputChange} name="email" value={email} className="form-control" placeholder="Email" required/>
                            </div>
                        </div>  
                        <div className="col-12 col-sm-6  col-lg-5 col-xl-5 centrar" >
                            <div className="mb-3">
                                <label  className="form-label">Teléfono Celular:</label>
                                <input type="number" onChange={handleInputChange} name="telfCelular" value={telfCelular} className="form-control"  placeholder="Teléfono Celular" required/>
                            </div>
                        </div>  
                    </div>    

                    <div className="row">
                        <div className="col-12 col-sm-6 col-lg-5 col-xl-5 centrar" >
                            <div className="mb-3">
                                <label  className="form-label">Contraseña:</label>
                                <input type="password" onChange={handleInputChange} name="password" value={password} id="password"    className="form-control" placeholder="Password"   required />
                                <div id="emailHelp" className="form-text "  ></div>
                            

                            </div>
                        </div>  
                        <div className="col-12 col-sm-6 col-lg-5 col-xl-5 centrar" >
                            <div className="mb-3">
                                <label  className="form-label">Confirmar Contraseña:</label>
                                <input type="password" onChange={handleInputChange} name="passwordConfirm" value={passwordConfirm} id="passwordConfirm" className="form-control" placeholder="Password"   required />
                            </div>
                        </div>  
                    </div>  

                    <div className="row">
                        <div className="col-12 col-sm-6 col-lg-5 col-xl-5 centrar" >
                            <div className="mb-3">
                                <label  className="form-label">Dirección:</label>
                                <input type="text" onChange={handleInputChange} name="direccion" value={direccion} id="password"    className="form-control" placeholder="Dirección"   required />
                                                             

                            </div>
                        </div>  
                        <div className="col-12 col-sm-6 col-lg-5 col-xl-5 centrar" >
                            <div className="mb-3">
                                <label  className="form-label">Teléfono Convencional:</label>
                                <input type="text" onChange={handleInputChange} name="telfConvencional" value={telfConvencional} id=""    className="form-control" placeholder="Teléfono Convencional"   required />
                              
                            </div>
                        </div>  
                    </div>  

                    <div className="text-center">
                        <button type="submit" className="btn  btn btn-outline-dark "  style={{margin:"5px", width:"180px"}} > <b>Enviar Formulario</b></button>
                        <Link to="/login">
                            <button type="" className="btn  btn btn-outline-dark "  style={{margin:"5px", width:"180px"}}  ><b>Cancelar Inscripción</b></button>
                        </Link>
                    
                    </div>
                </form>          
            </div>
        </div> 

    </div>
    )
}
