import { makeStyles, Modal } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../../services/ApiRest"
import { ApiUrl } from '../../services/ApiRest';
import { toast } from 'react-toastify'


// estilos del modal 
const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: "80%",
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      //overflow:'scroll',
      top: '0%',
      left: '50%',
      transform: 'translate(-50%, 10%)',
    //   top: '50%',
    //   left: '50%',
    //   transform: 'translate(-50%, -50%)',
      
    },
    modalEliminar:{
        position: 'absolute',
        width: "65%",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        //overflow:'scroll',
        // top: '0%',
        // left: '50%',
        // transform: 'translate(-50%, 10%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }, 
    inputMaterial:{
      width: '100%'
    }
}));



export const ListarDocentes = () => {

    const styles = useStyles()

    const baseUrl= ApiUrl+"listarDocentes"; 
    const [data, setdata] = useState([]);

    const [modalEditar, setmodalEditar] = useState(false);
    const [modalEliminar, setmodalEliminar] = useState(false);

    const [cargando, setcargando] = useState(true);

    const [consolaSeleccionada, setconsolaSeleccionada] = useState({
        nombres_administrativo:"",
        apellidos_administrativo:"",
        numero_identificacion_administrativo:"",
        fecha_nacimiento_administrativo:"",
        email_administrativo:"",
        celular_administrativo:"",
        password:"",
        password_confirm:'',
        direccion_administrativo:"",
        convencional_administrativo:"",
        id_administrativo:''
    })

    const handleChange=e=>{
        const {name, value}=e.target;
        setconsolaSeleccionada(prevState=>({
          ...prevState,
          [name]: value
        }));
    }
    // CONSULTAS A LA BASE DE DATOS
    const peticionGet=async()=>{
        await axios.get(baseUrl).
        then(response=>{
            setdata(response.data);
            console.log("response")
            console.log(response.data);
        })
        //cargamos los datos nuevos
        const script = document.createElement("script");
        script.src = `/assets/demo/datatables-demo.js`;
        script.async = true;
        document.body.appendChild(script); 
        setcargando(false);
    }

    const peticionPut=async()=>{
        // await axios.put(ApiUrl+"admins/"+consolaSeleccionada.id_administrativo,{
        //     nombres_administrativo: consolaSeleccionada.nombres_administrativo,
        //     apellidos_administrativo: consolaSeleccionada.apellidos_administrativo,
        //     rol_administrativo: 'Docente',
        //     email_administrativo:consolaSeleccionada.email_administrativo,
        //     celular_administrativo: consolaSeleccionada.celular_administrativo,
        //     convencional_administrativo: consolaSeleccionada.convencional_administrativo,
        //     direccion_administrativo: consolaSeleccionada.direccion_administrativo,
        //     password_administrativo: consolaSeleccionada.password,

        // })      
        // .then(response =>{
        //     console.log(response);
        // })
        // .catch (error =>{
        //     console.log(error);
        // })  

        if(!consolaSeleccionada.password || !consolaSeleccionada.password_confirm ){
            toast.error("Para Modificar los datos se debe ingresar una contraseña nueva", {position: toast.POSITION.BOTTOM_RIGHT});
        }else{
            if(consolaSeleccionada.password === consolaSeleccionada.password_confirm){
                
                await axios.put(ApiUrl+"admins/"+consolaSeleccionada.id_administrativo,{
                    nombres_administrativo: consolaSeleccionada.nombres_administrativo,
                    apellidos_administrativo: consolaSeleccionada.apellidos_administrativo,
                    rol_administrativo: 'Docente',
                    email_administrativo:consolaSeleccionada.email_administrativo,
                    celular_administrativo: consolaSeleccionada.celular_administrativo,
                    convencional_administrativo: consolaSeleccionada.convencional_administrativo,
                    direccion_administrativo: consolaSeleccionada.direccion_administrativo,
                    password_administrativo: consolaSeleccionada.password,

                })      
                .then(response =>{
                    console.log(response);
                })
                .catch (error =>{
                    console.log(error);
                })  
            }else{
                toast.error("Las contaseñas no coinciden", {position: toast.POSITION.BOTTOM_RIGHT});
            }

            

        }

     

    }

    const peticionEliminar=async()=>{
        deleteTable();
        await axios.delete(ApiUrl+"admins/"+consolaSeleccionada.id_administrativo)
        .then(response=>{
            peticionGet();   
            abrirCerrarModalEliminar();
        })
    }
    
    





    const abrirCerrarModalEditar=()=>{
        setmodalEditar(!modalEditar);
    } 

    const abrirCerrarModalEliminar=()=>{
        setmodalEliminar(!modalEliminar);
    }  

    const seleccionarConsola=(consola,caso)=>{
        setconsolaSeleccionada(consola);
        (caso==="Editar")? abrirCerrarModalEditar():abrirCerrarModalEliminar();
        //abrirCerrarModalEditar();
         console.log("Editar");
         console.log(consola);
    }

    // BODY DE LOS MODALES

    const bodyEditar=(
        <div className={styles.modal}>
        <h3>Editar Información Docente</h3>
            
            <form className=""  style={{padding:10}} id="create-course-form" >                    
                <div className="row ">                                        
                    <div className="col-12 col-sm-5 col-lg-5 col-xl-5 centrar" >
                        <div className="mb-3">
                            <label  className="form-label">Nombres Completos:</label>
                            <input type="text" name="nombres_administrativo"  onChange={handleChange} value={consolaSeleccionada  && consolaSeleccionada.nombres_administrativo} className="form-control"  placeholder="Nombres" required/>
                        </div>
                    </div>  
                    <div className="col-12 col-sm-5  col-lg-5 col-xl-5 centrar" >
                        <div className="mb-3">
                            <label  className="form-label">Apellidos Completos:</label>
                            <input type="text" name="apellidos_administrativo"  onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.apellidos_administrativo}className="form-control"  placeholder="Apellidos" required/>
                        </div>
                    </div>  
                </div>    

                <div className="row">
                    
                    <div className="col-12 col-sm-5 col-lg-5 col-xl-5 centrar" >
                        <div className="mb-3">
                            <label  className="form-label">Cédula de Identidad:</label>
                            <input type="text" name="numero_identificacion_administrativo"  onChange={handleChange} value={consolaSeleccionada.numero_identificacion_administrativo} maxLength="10" className="form-control"  placeholder="CI" required/>
                        </div>
                    </div>  
                    <div className="col-12 col-sm-5  col-lg-5 col-xl-5 centrar" >
                        <div className="mb-3">
                            <label  className="form-label">Fecha de Nacimiento:</label>
                            <input type="date" name="fecha_nacimiento_administrativo"  onChange={handleChange} value={consolaSeleccionada.fecha_nacimiento_administrativo} className="form-control"  placeholder="Apellidos" required/>
                        </div>
                    </div>  
                </div>    

            
                <div className="row">
                    <div className="col-12 col-sm-5 col-lg-5 col-xl-5 centrar" >
                        <div className="mb-3">
                            <label  className="form-label">Correo Electrónico:</label>
                            <input type="email" name="email_administrativo"  onChange={handleChange} value={consolaSeleccionada.email_administrativo} className="form-control" placeholder="Email" required/>
                        </div>
                    </div>  
                    <div className="col-12 col-sm-5  col-lg-5 col-xl-5 centrar" >
                        <div className="mb-3">
                            <label  className="form-label">Teléfono Celular:</label>
                            <input type="number" name="celular_administrativo"  onChange={handleChange} value={consolaSeleccionada.celular_administrativo} className="form-control"  placeholder="Teléfono Celular" required/>
                        </div>
                    </div>  
                </div>    

                <div className="row">
                    <div className="col-12 col-sm-5 col-lg-5 col-xl-5 centrar" >
                        <div className="mb-3">
                            <label  className="form-label">Contraseña:</label>
                            <input type="password" name="password" id="password"  onChange={handleChange}   className="form-control" placeholder="Password"   required />
                            <div id="emailHelp" className="form-text "  ></div>
                        

                        </div>
                    </div>  
                    <div className="col-12 col-sm-5 col-lg-5 col-xl-5 centrar" >
                        <div className="mb-3">
                            <label  className="form-label">Confirmar Contraseña:</label>
                            <input type="password" name="password_confirm" id="passwordConfirm" onChange={handleChange} className="form-control" placeholder="Password"   required />
                        </div>
                    </div>  
                </div>  

                <div className="row">
                    <div className="col-12 col-sm-5 col-lg-5 col-xl-5 centrar" >
                        <div className="mb-3">
                            <label  className="form-label">Dirección:</label>
                            <input type="text" name="direccion_administrativo" id="password"  onChange={handleChange}   value={consolaSeleccionada.direccion_administrativo}className="form-control" placeholder="Dirección"   required />
                                                            

                        </div>
                    </div>  
                    <div className="col-12 col-sm-5 col-lg-5 col-xl-5 centrar" >
                        <div className="mb-3">
                            <label  className="form-label">Teléfono Convencional:</label>
                            <input type="text" name="convencional_administrativo" id=""  onChange={handleChange}  value={consolaSeleccionada.convencional_administrativo}  className="form-control" placeholder="Teléfono Convencional"   required />
                            
                        </div>
                    </div>  
                </div>  

                <div className="text-center">
                    
                    <button type="button" className="btn btn-outline-success" onClick={peticionPut} style={{margin:"5px", width:"150px"}} >Aceptar</button>
                    <button type="button" className="btn btn-outline-danger" onClick={()=>abrirCerrarModalEditar()} style={{margin:"5px", width:"150px"}} >Cancelar</button>
    
                
                </div>
            </form>       
        </div>
    )

    
    const bodyEliminar=(
        <div className={styles.modalEliminar}>
          <h3>Eliminar al Docente  {consolaSeleccionada.nombres_administrativo +" "+ consolaSeleccionada.apellidos_administrativo} </h3>
            <div className="text-center">
                <button type="button" className="btn btn-outline-success" style={{margin:"5px", width:"150px"}} onClick={()=>peticionEliminar()} >Aceptar</button>
                <button type="button" className="btn btn-outline-danger" onClick={()=>abrirCerrarModalEliminar()} style={{margin:"5px", width:"150px"}} >Cancelar</button>
                
            
            </div>
        </div>
    )

    //Elimina la datatable
    const deleteTable=()=>{        
        const script1 = document.createElement("script");
        script1.src = `/assets/demo/datatable-destroy.js`;
        script1.async = true;
        document.body.appendChild(script1);   
    }


    
    useEffect(async () => {
        peticionGet();
    
    }, []);
        


    if(cargando){
        return(
            <div>
                <h5>Cargando Datos...</h5>
            </div>
        )
    }


    return (
     
    <div className="row animate__animated animate__fadeIn">
            
        <div className="card mb-4">
                <div className="card-header back-istmas">
                    <i className="fas fa-table mr-1"></i>
                    Lista de Docentes
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped contenidoTabla"  id="dataTable" width="100%" >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Teléfono</th>
                                    <th>Correo</th>
                                    <th>Dirección</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {data.map((consola,index)=>(                                        
                                    <tr key={consola.id_administrativo}>
                                        <td>{index+1}</td>
                                        <td>{consola.nombres_administrativo}</td>
                                        <td>{consola.apellidos_administrativo}</td>
                                        <td>{consola.celular_administrativo}</td>
                                        <td>{consola.email_administrativo}</td>                                            
                                        <td>{consola.email_administrativo}</td>                                            
                                        <td className="" style={{textAlign:"center"}}> 
                                            <button className="btn btn-outline-success" onClick={()=>seleccionarConsola(consola,'Editar')} > 
                                                <i className="puntero fas fa-pen"  ></i>

                                            </button>
                                            <button className="btn btn-outline-danger"  onClick={()=>seleccionarConsola(consola,'Eliminar')} > 
                                                <i className=" puntero fas fa-trash-alt" ></i>          
                                            </button>                                            
                                        </td>                                             
                                    </tr>
                                ))}
                                
                                
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>

        <Modal style={{ overflow: 'scroll' }}
            open={modalEditar}
            onClose={()=>abrirCerrarModalEditar()}>
            {bodyEditar}
        </Modal>   

        <Modal 
            open={modalEliminar}
            onClose={()=>abrirCerrarModalEliminar()}>
            {bodyEliminar}
        </Modal>  


    </div>

    )
}
