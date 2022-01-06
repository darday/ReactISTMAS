// import axios from 'axios';
import React, { useState } from 'react';
// import { ApiUrl } from '../../services/ApiRest'
import { toast } from 'react-toastify'
// import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { setError, uiRemoveError } from '../../../actions/ui';
import { adminAgregarDocente } from '../../../actions/administrativo';



// const urlAgregarDocente= ApiUrl+"registro-admin";

export const AgregarDocente = () => {

    const dispatch = useDispatch();

    const validacion = useSelector( state => state.ui );

    const state = useSelector( state => state.administrativoReducer );
    console.log("Validacion:");
    console.log(validacion.msgError);

    console.log("Data:");
    console.log(state);

   

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
    const {
        nombres_administrativo,
        apellidos_administrativo,
        numero_identificacion_administrativo,
        fecha_nacimiento_administrativo,
        email_administrativo,
        celular_administrativo,
        password_administrativo,
        passwordConfirm,
        direccion_administrativo,
        convencional_administrativo,
        rol_administrativo,
        estado} = consolaSeleccionada;

    const handleChange=e=>{
        const {name, value}=e.target;
        setconsolaSeleccionada(prevState=>({
          ...prevState,
          [name]: value
        }));
        // console.log(consolaSeleccionada);
    }

    const validarFormulario =()=>{
        //si el campo está fuera(!) de ese rango acepta tildes y la ñ 
        if((/[^a-zA-ZÀ-ÿ\s]/.test(nombres_administrativo)) || (/[^a-zA-ZÀ-ÿ\s]/.test(apellidos_administrativo))){
            toast.error("Error: Los campos Nombres y Apellidos solo pueden ser letras", {position: toast.POSITION.BOTTOM_RIGHT});            
            dispatch(setError('Error: Los campos Nombres y Apellidos solo pueden ser letras'));
            return false;
        }else{
            if(/[^\d]/.test(celular_administrativo) || /[^\d]/.test(convencional_administrativo)){
                toast.error("Error: Los campos Teléfono Celular y Teléfono Convencional deben ser solamente números", {position: toast.POSITION.BOTTOM_RIGHT});           
                dispatch(setError('Error: Los campos Teléfono Celular y Teléfono Convencional deben ser solamente números'));

                return false;
            }else{
                if(/[^\d]/.test(numero_identificacion_administrativo)){
                    toast.error("Error: El campo Cédula de Identidad debe contener solamente números", {position: toast.POSITION.BOTTOM_RIGHT});   
                    dispatch(setError('Error: El campo Cédula de Identidad debe contener números'));        
                    return false;
                }
            }
        }
        
        dispatch(uiRemoveError())
        return true;
    }

    const peticionPost = async(e)=>{
        e.preventDefault();
        if(password_administrativo === passwordConfirm){
            if (validarFormulario()){
                const agregarDocenteFunction = async () =>{

                    await dispatch(adminAgregarDocente(
                        nombres_administrativo,
                        apellidos_administrativo,
                        numero_identificacion_administrativo,
                        fecha_nacimiento_administrativo,
                        email_administrativo,
                        celular_administrativo,
                        password_administrativo,
                        passwordConfirm,
                        direccion_administrativo,
                        convencional_administrativo,
                        rol_administrativo,
                        estado,  
                    ));
                    
                    const estadoRec = await  state.estado;
                    
                    if(await  estadoRec === true){
                       await setconsolaSeleccionada({
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
                            estado:null
                        });
    
                    }
                    else{
                        console.log("no es exitoso y no se borras");
                    }    

                }
                  
                agregarDocenteFunction();
            }
        }else{
            //estado="Las contraseñas no coinciden";            
            console.log("contraseña no coincide")      ;
            toast.error("Error: Las contraseñas no coinciden!", {position: toast.POSITION.BOTTOM_RIGHT});   
        }
    }

    if(state.estado === 'Exitoso'){
        console.log("exito me imprimo ")
        setconsolaSeleccionada({
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
        state.estado = null;
        return;
    } 
    else{
        console.log("no estoy ingresando")
    }
   
    


    return (
        <div className="row animate__animated animate__fadeIn">
            <ol className="breadcrumb mb-4">
                {
                    
                    validacion.msgError&&(
                        <li className="breadcrumb-item active">{validacion.msgError}</li>
                    )
                }
            </ol>


            <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-header">
                    <i className="fas fa-graduation-cap"></i>
                     Agregar Docente  
                </div>
                <div className="card-body">
                    <form className="" onSubmit={peticionPost} style={{padding:10}} id="create-course-form" >   
                        <div className="row">
                            
                            <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Nombres Completos:</label>
                                    <input type="text" name="nombres_administrativo"  onChange={handleChange} value={ nombres_administrativo} className="form-control"  placeholder="Nombres" required/>
                                </div>
                            </div>  
                            <div className="col-12 col-sm-12  col-md-5 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Apellidos Completos:</label>
                                    <input type="text" name="apellidos_administrativo"  onChange={handleChange} value={apellidos_administrativo} className="form-control"  placeholder="Apellidos" required/>
                                </div>
                            </div>  
                        </div>    

                      
                         <div className="row">
                            <div className="col-12 col-md-5 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Correo Electrónico:</label>
                                    <input type="email" name="email_administrativo"  onChange={handleChange} value={email_administrativo} className="form-control" placeholder="Email" autoComplete="off" required />
                                </div>
                            </div>  
                            <div className="col-12 col-md-5 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Cédula de Identidad:</label>
                                    <input type="text" name="numero_identificacion_administrativo"  onChange={handleChange} value={numero_identificacion_administrativo} className="form-control" placeholder="Ej: 0603935008" maxLength="10" required/>
                                </div>
                            </div>  
                        </div>    

                        <div className="row">
                            <div className="col-12 col-md-5 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Contraseña:</label>
                                    <input type="password" name="password_administrativo" id="password"  onChange={handleChange} value={password_administrativo}  className="form-control" placeholder="Password"  autoComplete="off" required />
                                    <div id="emailHelp" className="form-text "  ></div>
                                  

                                </div>
                            </div>  
                            <div className="col-12 col-md-5 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Confirmar Contraseña:</label>
                                    <input type="password" name="passwordConfirm" id="passwordConfirm" onChange={handleChange} value={passwordConfirm} className="form-control" placeholder="Password"   required />
                                </div>
                            </div>  
                        </div> 
                        <div className="row">
                           
                            <div className="col-12 col-md-5 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Fecha de Nacimiento:</label>
                                    <input type="date" name="fecha_nacimiento_administrativo" onChange={handleChange} className="form-control" value={fecha_nacimiento_administrativo}  required />
                                </div>
                            </div> 

                            <div className="col-12 col-md-5 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Dirección:</label>
                                    <input type="text" name="direccion_administrativo" onChange={handleChange} value={direccion_administrativo} className="form-control"  placeholder="Dirección"  required />
                                </div>
                            </div> 
                        </div>      
                                                         

                        <div className="row">
                           
                            <div className="col-12 col-md-5 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Teléfono Celular:</label>
                                    <input type="text" name="celular_administrativo" onChange={handleChange} value={celular_administrativo} className="form-control"  placeholder="Teléfono Celular" maxLength="10" required />
                                </div>
                            </div> 

                            <div className="col-12 col-md-5 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Teléfono Convencional:</label>
                                    <input type="text" name="convencional_administrativo" onChange={handleChange} value={convencional_administrativo} className="form-control"  placeholder="Ej: 032307039" maxLength="11" required />
                                </div>
                            </div> 
                        </div>      

                         


                        <button type="submit" className="btn  back-istmas"  ><b>Agregar Docente</b></button>
                    </form>          
                </div>
            </div> 

        </div>
    )
}
