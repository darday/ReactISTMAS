import { types } from "../../types/types";

const initialState={
    loading:false,
    msgError:null,
    limpiar:null,
};

export const uiReducer = (state=initialState, action)=>{
    switch (action.type) {
        case types.uiSetError:
            return{
                ...state,
                msgError:action.payload
            }
        case types.uiRemoveError:
            return{
                ...state,
                msgError:null
            }
        case types.uiIniciarCarga:
            return{ 
                ...state,
                loading:true

            }
        case types.uiFinalizarCarga:
            return{
                ...state,
                loading:false
            }     
        case types.uiLimpiarFormulario:
            return{
                ...state,
                limpiar:true
            }  
        case types.uiMantenerFormulario:
            return{
                ...state,
                limpiar:null
            }               
    
        default:
            return state;
    }
};