import { types } from "../../types/types";

const initialState ={
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
};



export const administrativoReducer = (state=initialState,action)=>{
    switch (action.type) {
        case types.adminAgregarDocente:
            return{
                data:action.payload.data,
                estado:action.payload.estado
                
            }
            
            
    
        default:
            return state;
    }
}