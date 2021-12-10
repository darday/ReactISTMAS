import axios from 'axios';
import React, { useState } from 'react';
import { ApiUrl } from '../../services/ApiRest'
import { toast } from 'react-toastify'



const urlAgregarDocente= ApiUrl+"registro-admin";

export const AgregarDocente = () => {
    const [data, setdata] = useState([]);
    const [consolaSeleccionada, setconsolaSeleccionada] = useState({
        nombres_administrativo:"",
        apellidos_administrativo:"",
        numero_identificacion_administrativo:"",
        fecha_nacimiento_administrativo:"",
        email_administrativo:"",
        celular_administrativo:"",
        password_administrativo:"",
        passwordConfirm:"",
        direccion_administrativo:"",
        convencional_administrativo:"",
        rol_administrativo:"Docente",
        estado:""
    });

    const handleChange=e=>{
        const {name, value}=e.target;
        setconsolaSeleccionada(prevState=>({
          ...prevState,
          [name]: value
        }));
        console.log(consolaSeleccionada);
    }

    const peticionPost = async(e)=>{

        e.preventDefault();
        if(consolaSeleccionada.password_administrativo == consolaSeleccionada.passwordConfirm){
            await axios.post(urlAgregarDocente,{
                nombres_administrativo:consolaSeleccionada.nombres_administrativo,
                apellidos_administrativo:consolaSeleccionada.apellidos_administrativo,
                numero_identificacion_administrativo:consolaSeleccionada.numero_identificacion_administrativo,
                fecha_nacimiento_administrativo:consolaSeleccionada.fecha_nacimiento_administrativo,
                email_administrativo:consolaSeleccionada.email_administrativo,
                celular_administrativo:consolaSeleccionada.celular_administrativo,
                password_administrativo:consolaSeleccionada.password_administrativo,
                direccion_administrativo:consolaSeleccionada.direccion_administrativo,
                convencional_administrativo:consolaSeleccionada.convencional_administrativo,
                rol_administrativo:consolaSeleccionada.rol_administrativo
            })
            .then(response=>{
                var data = response.data;
                console.log(data)
                if(response.data.success === true){
                  
                    // e.target.reset(); //resetea valores del formulario
                    // consolaSeleccionada={};
                    consolaSeleccionada.estado="Datos Agregados Correctamente Inicie Sesión";
                    toast.success("Datos Agregados Correctamente - Inicie Sesión", {position: toast.POSITION.BOTTOM_CENTER});



                }else{
                    if( response.data.errors.numero_identificacion_administrativo){
                        consolaSeleccionada.estado="El usuario con el número de cédula ingresado ya existe";
                        toast.error("El usuario con el número de cédula ingresado ya existe", {position: toast.POSITION.BOTTOM_CENTER});

                    }

                    if( response.data.errors.email_administrativo){
                        consolaSeleccionada.estado="El correo electrónico ingresado ya existe en el sistema";
                        toast.error("El correo electrónico ingresado ya existe en el sistema!", {position: toast.POSITION.BOTTOM_CENTER});

                    }

                
                }


            })
        }else{
            consolaSeleccionada.estado="Las contraseñas no coinciden";
            console.log("contraseña no coincide")      ;
            toast.error("Las contraseñas no coinciden!", {position: toast.POSITION.BOTTOM_CENTER});


        }

    }


    return (
        <div className="row animate__animated animate__fadeIn">
            <ol className="breadcrumb mb-4">
                            {/* <li className="breadcrumb-item active">{this.state.estado}</li> */}
            </ol>


            <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-header">
                    <i className="fas fa-graduation-cap"></i>
                     Agregar Docente  
                </div>
                <div className="card-body">
                    <form className="" style={{padding:10}} id="create-course-form" >   
                        <div className="row">
                            
                            <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Nombres Completos:</label>
                                    <input type="text" name="nombres_administrativo"  onChange={handleChange} className="form-control"  placeholder="Nombres" required/>
                                </div>
                            </div>  
                            <div className="col-12 col-sm-12  col-md-5 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Apellidos Completos:</label>
                                    <input type="text" name="apellidos_administrativo"  onChange={handleChange} className="form-control"  placeholder="Apellidos" required/>
                                </div>
                            </div>  
                        </div>    

                      
                         <div className="row">
                            <div className="col-12 col-md-5 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Correo Electrónico:</label>
                                    <input type="email" name="email_administrativo"  onChange={handleChange} className="form-control" placeholder="Email" required/>
                                </div>
                            </div>  
                            <div className="col-12 col-md-5 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Cédula de Identidad:</label>
                                    <input type="text" name="numero_identificacion_administrativo"  onChange={handleChange} className="form-control" placeholder="Ej: 0603935008" required/>
                                </div>
                            </div>  
                        </div>    

                        <div className="row">
                            <div className="col-12 col-md-5 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Contraseña:</label>
                                    <input type="password" name="password_administrativo" id="password"  onChange={handleChange}   className="form-control" placeholder="Password"   required />
                                    <div id="emailHelp" className="form-text "  ></div>
                                  

                                </div>
                            </div>  
                            <div className="col-12 col-md-5 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Confirmar Contraseña:</label>
                                    <input type="password" name="passwordConfirm" id="passwordConfirm" onChange={handleChange} className="form-control" placeholder="Password"   required />
                                </div>
                            </div>  
                        </div> 
                        <div className="row">
                           
                            <div className="col-12 col-md-5 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Fecha de Nacimiento:</label>
                                    <input type="date" name="fecha_nacimiento_administrativo" onChange={handleChange} className="form-control"  placeholder="Teléfono" maxLength="9" required />
                                </div>
                            </div> 

                            <div className="col-12 col-md-5 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Dirección:</label>
                                    <input type="text" name="direccion_administrativo" onChange={handleChange} className="form-control"  placeholder="Teléfono" maxLength="9" required />
                                </div>
                            </div> 
                        </div>      
                                                         

                        <div className="row">
                           
                            <div className="col-12 col-md-5 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Teléfono Celular:</label>
                                    <input type="text" name="celular_administrativo" onChange={handleChange} className="form-control"  placeholder="Teléfono" maxLength="9" required />
                                </div>
                            </div> 

                            <div className="col-12 col-md-5 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Teléfono Convencional:</label>
                                    <input type="number" name="convencional_administrativo" onChange={handleChange} className="form-control"  placeholder="Teléfono" maxLength="9" required />
                                </div>
                            </div> 
                        </div>      

                         


                        <button type="button" className="btn  back-istmas" onClick={peticionPost} ><b>Agregar Docente</b></button>
                    </form>          
                </div>
            </div> 

        </div>
    )
}
