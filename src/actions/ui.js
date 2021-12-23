import { types } from "../types/types"

export const setError = (err)=>{
    return{
        type:types.uiSetError,
        payload:err
    }
}

export const uiRemoveError = ()=>{
    return{
        type:types.uiRemoveError
    }
}

export const uiIniciarCargaAction = ()=>{
    return{
        type:types.uiIniciarCarga
    }
}

export const uiFinalizarCargaAction = ()=>{
    return{
        type:types.uiFinalizarCarga
    }
}

export const uiLimpiarFormularioAction = ()=>{
    return{
        type:types.uiLimpiarFormulario
    }
}

export const uiMantenerFormularioAction =()=>{
    return {
        type:types.uiMantenerFormulario
    }
}