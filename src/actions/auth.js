//son solo funciones 

import { types } from "../types/types"

export const iniciarLogin = (ci,password,rol)=>{
    return (dispatch) =>{
        setTimeout(() => {
            dispatch(login(ci,password,rol))
        }, 3500);
    }
}

export const login =(ci,password,rol)=>{
    return {
        type:types.login,
        payload:{
            ci,
            password,
            rol
        }
    }
    
}