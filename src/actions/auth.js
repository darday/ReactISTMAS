//son solo funciones 

import axios from "axios";
import { ApiUrl } from "../components/services/ApiRest";
import { types } from "../types/types";
import { toast } from 'react-toastify';
import Cookies from "universal-cookie";
import { uiFinalizarCargaAction, uiIniciarCargaAction } from "./ui";


const baseUrl=ApiUrl+"auth";
const cookies = new Cookies(); 


//midleware
export const iniciarLogin = (rol,ci,password,isLogged,error)=>{
    return (dispatch) =>{

        dispatch(uiIniciarCargaAction());
        
        axios
        .post(baseUrl,{
            numero_identificacion: ci, 
            password: password, 
            rol:rol
        })
        .then(response =>{
            response=response.data;
            // console.log("response:")
            // console.log(response);
            if(response.success === true){

                

                toast.success("Iniciando Sesión", {position: toast.POSITION.BOTTOM_RIGHT});
                dispatch(uiFinalizarCargaAction());
                isLogged=true; //indica que se ha comenzado inicio de sesion

                var logeado = isLogged;
                var rolGuardado = rol;

                // console.log(rolGuardado);
                
                //declaracion de Cookies que van a ser usadas en todo momento
                cookies.set('log',logeado,{path:"/"})
                cookies.set('rol',rolGuardado,{path:"/"})
                cookies.set('token',response.token,{path:"/"})
               
                //eliminación de la cookie que viene de carreras
                cookies.remove('idCarrera',{path:"/"});

                // console.log("imprimo rol:");
                // console.log(cookies.get('rol'));

                
                //si el Rol de la Cookie es "" realiza alguna acción
                if(cookies.get('rol') === "Administrativo"){
                    //console.log(cookies.get('rol'));
                    cookies.set('idAdministrativo',response.administrativo_id,{path:"/"})
                    dispatch(login(response.administrativo_id,rolGuardado,logeado));
                    // console.log("vamos a redireccionar")
                    // return(<Redirect to="/administrativo" />);
                    window.location.href="/administrativo";
                }else{
                    if(cookies.get('rol') === "Docente"){
                        cookies.set('idDocente',response.administrativo_id,{path:"/"})
                        dispatch(login(response.administrativo_id,rolGuardado,logeado));

                        window.location.href="/docente";
                    }else{
                        if(cookies.get('rol') === "Estudiante"){
                            //console.log(cookies.get('token'));
                            cookies.set('idEstudiante',response.estudiante_id,{path:"/"})
                            cookies.set('carreraEstudiante',response.descripcion_carrera,{path:"/"})
                            dispatch(login(response.estudiante_id,rolGuardado,logeado));

                            window.location.href="/estudiante";
                        }else{
                            if(cookies.get('rol') === "Contable"){
                                //console.log(cookies.get('token'));
                                cookies.set('idEstudiante',response.estudiante_id,{path:"/"})
                                cookies.set('carreraEstudiante',response.descripcion_carrera,{path:"/"})
                                window.location.href="/contable";
                            }
                        }
                    }

                }
            }else{
                
                dispatch(uiFinalizarCargaAction());
                console.log("no llega") ;
                error='No se ha encontrado el usuario verifique los datos';
                console.log(error);
                toast.error("No se ha encontrado el usuario verifique los datos", {position: toast.POSITION.BOTTOM_RIGHT});


            }
        })
        .catch(error=>{
            dispatch(uiFinalizarCargaAction());
            console.log ("es igual a 0");
            error="No se ha encontrado el usuario verifique los datos";
            toast.error("No se ha encontrado el usuario verifique los datos", {position: toast.POSITION.BOTTOM_RIGHT});



        });



    }
}


//actions

export const login =(id,rol,isloged)=>{
    return {
        type:types.login,
        payload:{
            id,            
            rol,
            isloged
        }
    }
    
}

export const logout=()=>{
    return{
        type:types.logout,
    }
}