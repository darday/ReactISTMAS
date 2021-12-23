import axios from 'axios';
import { toast } from 'react-toastify';
import { ApiUrl } from '../components/services/ApiRest';
import { types } from '../types/types';
import { setError } from './ui';


const urlAgregarDocente= ApiUrl+"registro-admin";


export const adminAgregarDocente = (
    nombre_administrativo,
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
)=>
{
    return (dispatch)=>{
        axios.post(urlAgregarDocente,{
            nombres_administrativo:nombre_administrativo,
            apellidos_administrativo:apellidos_administrativo,
            numero_identificacion_administrativo:numero_identificacion_administrativo,
            fecha_nacimiento_administrativo:fecha_nacimiento_administrativo,
            email_administrativo:email_administrativo,
            celular_administrativo:celular_administrativo,
            password_administrativo:password_administrativo,
            direccion_administrativo:direccion_administrativo,
            convencional_administrativo:convencional_administrativo,
            rol_administrativo:rol_administrativo
        })
        .then(response=>{
            //console.log(response);
            if(response.data.success === true){
    
                estado="Exitoso";
                toast.success("Datos Agregados Correctamente ", {position: toast.POSITION.BOTTOM_RIGHT});
    
    
    
            }
            else{
                estado="Fallido";
                if( response.data.errors.numero_identificacion_administrativo){
                    dispatch(setError('Error: El usuario con el número de cédula ingresado ya existe'));
    
                   // estado="El usuario con el número de cédula ingresado ya existe";
                    toast.error("Error: El usuario con el número de cédula ingresado ya existe", {position: toast.POSITION.BOTTOM_RIGHT});
    
                }
    
                if( response.data.errors.email_administrativo){
                    //estado="El correo electrónico ingresado ya existe en el sistema";
                    dispatch(setError('Error: El correo electrónico ingresado ya existe en el sistema!'));

                    toast.error("Error: El correo electrónico ingresado ya existe en el sistema!", {position: toast.POSITION.BOTTOM_RIGHT});
    
                }
    
            
            }

            dispatch(adminAgregarDocenteAction(response,estado));
        })
        .catch(e=>{
            console.log("catch error");
            console.log(e);
            estado="Fallido";
        });


    }
}

///////ACTIONS/////////////////

export const adminAgregarDocenteAction = (data=[],estado)=>{
    return{
        type:types.adminAgregarDocente,
        payload:{
            data,
            estado
        }
    }
}

