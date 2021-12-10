import { types } from "../../types/types";

/* state estará vacio cuando no esté autenticado 
cuando esté autenticado dpongo los datos que me gustaría que tenga el objeto
*/
export const authReducer = (state = {},action) => {
    switch (action.type) {
        case types.login:
            return{
                id:action.payload.uid,
                name:action.payload.displayName
            }
        case types.logout:
            return{
               
            }
            
    
        default:
            return state;
    }
}
