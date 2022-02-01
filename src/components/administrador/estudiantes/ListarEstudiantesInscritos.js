import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, makeStyles, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { ApiUrl } from '../../services/ApiRest';

const baseUrl=ApiUrl+"estudiantes"; 
const urlEliminarEstu=(ApiUrl+"estudiantes/");


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

export const ListarEstudiantesInscritos = () => {
    const styles = useStyles();

    const [data, setdata] = useState([]);
    const [modalEliminar, setmodalEliminar] = useState(false);
    const [modalEditar, setmodalEditar] = useState(false);
    const [consolaSeleccionada, setconsolaSeleccionada] = useState({});

    const [cargando, setcargando] = useState(true);


    const peticionGet=async()=>{
        await axios.get(baseUrl)
        .then(response=>{
            setdata(response.data);
            console.log(data);
        });
        
        //cargamos los datos nuevos
        const script = document.createElement("script");
        script.src = `/assets/demo/datatables-demo.js`;
        script.async = true;
        document.body.appendChild(script); 
        setcargando(false)
    }

    const peticionDelete=async()=>{
        deleteTable();
        await axios.delete(urlEliminarEstu+consolaSeleccionada.id_estudiante)
        .then(response=>{
            peticionGet();   
            abrirCerrarModalEliminar();
        })
    }      
    

    const abrirCerrarModalEliminar=()=>{
        setmodalEliminar(!modalEliminar);
    } 
    
    const abrirCerrarModalEditar=()=>{

    }

    const seleccionarConsola=(consola,caso)=>{
        setconsolaSeleccionada(consola);
        (caso==="Editar")? abrirCerrarModalEditar():abrirCerrarModalEliminar();
        //abrirCerrarModalEditar();
         console.log("Mostrando Data");
         console.log(consola);
    } 


    const bodyDelete=(
        <div className={styles.modalEliminar}>
          <h3>Eliminar al Estudiante  {consolaSeleccionada.apellidos_estudiante +" "+ consolaSeleccionada.nombres_estudiante} </h3>
            <div className="text-center">
                <button type="button" className="btn btn-outline-success" style={{margin:"5px", width:"150px"}} onClick={()=>peticionDelete()} >Aceptar</button>
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

    useEffect(()=>{
        peticionGet();
    },[])


    if(cargando){
        return(
            <div>
                <h5>Cargando Datos...</h5>
            </div>
        )
    }

    return (
        <div className="row animate__animated animate__fadeIn">
            <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item active">{}</li>
            </ol>
            <div className="card mb-4 " >
                <div className="card-header back-istmas">
                    <i className="fas fa-table mr-1"></i>
                    Lista Estudiantes Inscritos
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped contenidoTabla table-sm"  id="dataTable" width="100%" >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombres</th>
                                    <th>Apellidos</th>
                                    <th>Carrera</th>
                                    <th>Cédula</th>
                                    <th>Celular</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {console.log(data)}
                                {data.map((consola,index)=>(                                        
                                    <tr key={consola.id_estudiante}>
                                        <td>{index+1}</td>
                                        <td>{consola.nombres_estudiante}</td>
                                        <td>{consola.apellidos_estudiante}</td>
                                        <td>{consola.carreras[0].descripcion_carrera}</td>
                                        <td>{consola.numero_identificacion_estudiante}</td>
                                        <td>{consola.celular_estudiante}</td>
                                        <td className="" style={{textAlign:"center"}}> 
                                            <Link className="btn btn-outline-success" to={"/administrativo/EditarEstudiantes/"+consola.id_estudiante} > 
                                                <i className="puntero fas fa-pen"></i>{consola.id_estudiante}
                                            </Link>

                                            <button className="btn btn-outline-danger" onClick={()=>seleccionarConsola(consola,'Eliminar')}  > 
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
            <Modal 
                open={modalEliminar}
                onClose={()=>abrirCerrarModalEliminar()}>
                {bodyDelete}
            </Modal>
        </div>
    )
}
