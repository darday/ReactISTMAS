import { Button, Link, makeStyles, Modal} from '@material-ui/core';
// import { Delete, Edit } from '@material-ui/icons';
import axios from 'axios'
// import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../services/ApiRest'



//1.- instalar npm i @material-ui/core @material-ui/icons axios

const urlListAdmin= ApiUrl+"admins";
const urlAgregarAdmin=(ApiUrl+"registro-admin");
const urlEliminarAdmin=(ApiUrl+"admins/");






///*****************ESTILO DEL MODAL****************** */
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
    modalDelete:{
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

  
  
export const ListarPersonalAdministrativo = () => {


    // *************************DESDE AQUIIIIIIIIIIIIIIIIIIIII******************************** */
    //use state inicializar variables 
    const styles = useStyles()
    
    const [data, setdata] = useState([]);
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalEditar, setmodalEditar] = useState(false);
    const [modalDelete, setmodalDelete] = useState(false);
    
    
    const [consolaSeleccionada, setconsolaSeleccionada] = useState({
        nombres_administrativo:"",
        apellidos_administrativo:"",
        numero_identificacion_administrativo:"",
        fecha_nacimiento_administrativo:"",
        email_administrativo:"",
        celular_administrativo:"",
        password:"",
        direccion_administrativo:"",
        convencional_administrativo:""
    })

    const handleChange=e=>{
        const {name, value}=e.target;
        setconsolaSeleccionada(prevState=>({
          ...prevState,
          [name]: value
        }));
        console.log(consolaSeleccionada);
    }


    //*******CONSULTA PARA LISTAR ADMINISTRADORES************** */
    const peticionGet=async()=>{
       //hacemos la peticion de datos 
        await axios.get(urlListAdmin)
        .then(response=>{
          setdata(response.data);
          console.log(response.data)
        })
         //cargamos los datos nuevos
         const script = document.createElement("script");
         script.src = `/assets/demo/datatables-demo.js`;
         script.async = true;
         document.body.appendChild(script); 
    }
    //Elimina la datatable
    const deleteTable=()=>{        
       const script1 = document.createElement("script");
       script1.src = `/assets/demo/datatable-destroy.js`;
       script1.async = true;
       document.body.appendChild(script1);   
    }
    
    //*******CONSULTA post PARA AGREGAR ADMINISTRADORES************** */
    const peticionPost=async()=>{
        deleteTable();
        await axios.post(urlAgregarAdmin,{
        nombres_administrativo: consolaSeleccionada.nombres_administrativo, 
        apellidos_administrativo: consolaSeleccionada.apellidos_administrativo, 
        numero_identificacion_administrativo: consolaSeleccionada.numero_identificacion_administrativo,
        fecha_nacimiento_administrativo: consolaSeleccionada.fecha_nacimiento_administrativo,
        email_administrativo: consolaSeleccionada.email_administrativo, 
        celular_administrativo:consolaSeleccionada.celular_administrativo,
        direccion_administrativo:consolaSeleccionada.direccion_administrativo,
        password_administrativo: consolaSeleccionada.password,
        convencional_administrativo:consolaSeleccionada.convencional_administrativo

        })
        .then(response=>{            
            setdata(data.concat(response.data.data))    
            abrirCerrarModalInsertar()
            peticionGet();       
        }
        )
    }

      
     //*******CONSULTA put PARA Actualizar ADMINISTRADORES************** */
    const peticionPut=async()=>{
        await axios.put()
    }

    const peticionDelete=async()=>{
        deleteTable();
        await axios.delete(urlEliminarAdmin+consolaSeleccionada.id_administrativo)
        .then(response=>{
            peticionGet();   
            abrirCerrarModalDelete();
        })
    }      
    
        //*******ABRIR CERRAR MODALES************** */

    const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
    }  
    const abrirCerrarModalEditar=()=>{
        setmodalEditar(!modalEditar);
    } 
    const abrirCerrarModalDelete=()=>{
        setmodalDelete(!modalDelete);
    }  

    const seleccionarConsola=(consola,caso)=>{
        setconsolaSeleccionada(consola);
        (caso==="Editar")? abrirCerrarModalEditar():abrirCerrarModalDelete();
        //abrirCerrarModalEditar();
         console.log("Editar");
         console.log(consola);
    }        
    
    //*******BODY DEL MODAL************** */

    const bodyInsertar=(
        <div className={styles.modal}>
          <h3>Agregar Nuevo Administrador</h3>
            {/* <AgregarPersAdmin/> */}
          <form className=""  style={{padding:10}} id="create-course-form" >                    
                            <div className="row ">                                        
                                <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Nombres Completos:</label>
                                        <input type="text" name="nombres_administrativo"  onChange={handleChange} className="form-control"  placeholder="Nombres" required/>
                                    </div>
                                </div>  
                                <div className="col-12 col-sm-12  col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Apellidos Completos:</label>
                                        <input type="text" name="apellidos_administrativo"  onChange={handleChange} className="form-control"  placeholder="Apellidos" required/>
                                    </div>
                                </div>  
                            </div>    

                            <div className="row">
                                
                                <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Cédula de Identidad:</label>
                                        <input type="text" name="numero_identificacion_administrativo"  onChange={handleChange} maxLength="10" className="form-control"  placeholder="CI" required/>
                                    </div>
                                </div>  
                                <div className="col-12 col-sm-12  col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Fecha de Nacimiento:</label>
                                        <input type="date" name="fecha_nacimiento_administrativo"  onChange={handleChange} className="form-control"  placeholder="Apellidos" required/>
                                    </div>
                                </div>  
                            </div>    

                        
                            <div className="row">
                                <div className="col-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Correo Electrónico:</label>
                                        <input type="email" name="email_administrativo"  onChange={handleChange} className="form-control" placeholder="Email" required/>
                                    </div>
                                </div>  
                                <div className="col-12 col-sm-12  col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Teléfono Celular:</label>
                                        <input type="number" name="celular_administrativo"  onChange={handleChange} className="form-control"  placeholder="Teléfono Celular" required/>
                                    </div>
                                </div>  
                            </div>    

                            <div className="row">
                                <div className="col-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Contraseña:</label>
                                        <input type="password" name="password" id="password"  onChange={handleChange}   className="form-control" placeholder="Password"   required />
                                        <div id="emailHelp" className="form-text "  ></div>
                                    

                                    </div>
                                </div>  
                                <div className="col-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Confirmar Contraseña:</label>
                                        <input type="password" name="passwordConfirm" id="passwordConfirm" onChange={handleChange} className="form-control" placeholder="Password"   required />
                                    </div>
                                </div>  
                            </div>  

                            <div className="row">
                                <div className="col-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Dirección:</label>
                                        <input type="text" name="direccion_administrativo" id="password"  onChange={handleChange}   className="form-control" placeholder="Dirección"   required />
                                                                     

                                    </div>
                                </div>  
                                <div className="col-12 col-lg-5 col-xl-5 centrar" >
                                    <div className="mb-3">
                                        <label  className="form-label">Teléfono Convencional:</label>
                                        <input type="text" name="convencional_administrativo" id=""  onChange={handleChange}   className="form-control" placeholder="Teléfono Convencional"   required />
                                      
                                    </div>
                                </div>  
                            </div>  

                            <div className="text-center">
                                <button type="button" onClick={peticionPost} className="btn  back-istmas centrar" style={{margin:"5px"}}  > <b>Enviar Formulario</b></button>
                                <Link to="/login">
                                    <button type="" className="btn  back-istmas centrar"style={{margin:"5px"}}  ><b>Cancelar Inscripción</b></button>
                                </Link>
                            
                            </div>
                        </form>       
        </div>
    )

    const bodyEditar=(
        <div className={styles.modal}>
          <h3>Editar Información Administrador</h3>
            {/* <AgregarPersAdmin/> */}
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
                                        <input type="password" name="passwordConfirm" id="passwordConfirm" onChange={handleChange} className="form-control" placeholder="Password"   required />
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


    const bodyDelete=(
        <div className={styles.modalDelete}>
          <h3>Eliminar al Administrador  {consolaSeleccionada.nombres_administrativo +" "+ consolaSeleccionada.apellidos_administrativo} </h3>
            <div className="text-center">
                <button type="button" className="btn btn-outline-success" style={{margin:"5px", width:"150px"}} onClick={()=>peticionDelete()} >Aceptar</button>
                <button type="button" className="btn btn-outline-danger" onClick={()=>abrirCerrarModalDelete()} style={{margin:"5px", width:"150px"}} >Cancelar</button>
                
            
            </div>
        </div>
    )


    
      //ejecutar efectos secundarios
    useEffect(()=>{
        peticionGet();
    },[])

    return (
        <div>

          <Button onClick={()=>abrirCerrarModalInsertar()}>Insertar</Button>

            <div className="card mb-4 " >
                <div className="card-header back-istmas">
                    <i className="fas fa-table mr-1"></i>
                    Lista Estudiantes Inscritos
                </div>
                
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped contenidoTabla"  id="dataTable" width="100%" >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombres</th>
                                    <th>Apellidos</th>
                                    <th>Cédula</th>
                                    <th>Celular</th>
                                    <th>Email</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {/* {console.log(this.state.estudiantes)} */}
                                {data.map((consola,index)=>(                                        
                                    <tr key={consola.id_administrativo}>
                                        <td>{index+1}</td>
                                        <td>{consola.nombres_administrativo}</td>
                                        <td>{consola.apellidos_administrativo}</td>
                                        <td>{consola.numero_identificacion_administrativo}</td>
                                        <td>{consola.celular_administrativo}</td>
                                        <td>{consola.email_administrativo}</td>
                                        <td className="" style={{textAlign:"center"}}> 
                                            <button className="btn btn-outline-success" onClick={()=>seleccionarConsola(consola,'Editar')} > 
                                                <i className="puntero fas fa-pen"  ></i>

                                            </button>
                                                <button className="btn btn-outline-danger"  onClick={()=>seleccionarConsola(consola,'Eliminar')} > 
                                                    <i className=" puntero fas fa-trash-alt" ></i>          
                                                </button>                                            
                                        </td>   
                                        {/* <td>{consola.email}</td>
                                        <td>{consola.first_name}</td>
                                        <td>{consola.last_name}</td>
                                        <td>{consola.full_name}</td>
                                        <td>{consola.phone}</td>                                            
                                        <td className="" style={{textAlign:"center"}}> 
                                            <i className=" puntero fas fa-trash-alt" ></i>                                               
                                            <span> - </span>
                                            <i className="puntero fas fa-pen"  ></i>
                                        </td>                                             */}
                                    </tr>
                                ))}
                                
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          

        <Modal style={{ overflow: 'scroll' }}
            open={modalInsertar}
            onClose={()=>abrirCerrarModalInsertar()}>
            {bodyInsertar}
        </Modal>

        
        <Modal style={{ overflow: 'scroll' }}
            open={modalEditar}
            onClose={()=>abrirCerrarModalEditar()}>
            {bodyEditar}
        </Modal>

        <Modal 
            open={modalDelete}
            onClose={()=>abrirCerrarModalDelete()}>
            {bodyDelete}
        </Modal>


          

        
            
        </div>
    )
}
