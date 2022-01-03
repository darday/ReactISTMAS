import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Button, Link, makeStyles, Modal} from '@material-ui/core';

import { ApiUrl } from '../../services/ApiRest';

const urlHorarios=(ApiUrl+"horarios");


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


export const AgregarDiaHora = () => {

    const styles = useStyles()
    let estado;
    const [formData, setformData] = useState({
        dia_horario:'',
        hora_inicio_horario:'',
        hora_fin_horario:'',
        descripcion_horario:''
    });
    const {dia_horario,hora_inicio_horario,hora_fin_horario,descripcion_horario} = formData;

    const [data, setdata] = useState([]);
    const [modalEliminar, setmodalEliminar] = useState(false);
    const [modalEditar, setmodalEditar] = useState(false);


    const handleChange = ({target})=>{
        setformData({
            ...formData,
            [target.name]:target.value,
        });
        console.log([target.value]);
    }

    const peticionGet = async(e) =>{
        await axios.get(urlHorarios)
        .then(response=>{
          setdata(response.data);
        //   console.log(response.data)
        })
         //cargamos los datos nuevos
         const script = document.createElement("script");
         script.src = `/assets/demo/datatables-demo.js`;
         script.async = true;
         document.body.appendChild(script); 
    }

    const peticionPost = async(e) =>{
        e.preventDefault();
        deleteTable();
        // console.log(dia_horario);
        // console.log(hora_inicio_horario);
        // console.log(hora_fin_horario);
        if(dia_horario !== '' && hora_inicio_horario !== '' && hora_fin_horario !== '' && descripcion_horario !==''){
            await axios.post( urlHorarios,{
                dia_horario:dia_horario,
                hora_inicio_horario:hora_inicio_horario,
                hora_fin_horario:hora_fin_horario,
                descripcion_horario:descripcion_horario
            })
            .then(response=>{
                // console.log(response);
    
                if(response.data.success === true){
                    peticionGet();
                    //this.setState({estado: response.data.message});
                    estado=response.data.message;
                    // e.target.reset(); //resetea valores del formulario
                    estado="Datos Agregados Correctamente";
                    toast.success("Datos Agregados Correctamente!", {position: toast.POSITION.BOTTOM_CENTER});
                    setformData({                   
                        dia_horario:'',
                        hora_inicio_horario:'',
                        hora_fin_horario:'',
                        descripcion_horario:''
                    });
    
                }else{
                   // this.setState({estado: response.data.message});
                   estado=response.data.message;
                    toast.warning(estado, {position: toast.POSITION.BOTTOM_CENTER});
    
                }
    
            })
            .catch(error => {
                console.log(error);
                estado="Error No se pudo conectar con el servidor";
                toast.error("Error No se pudo conectar con el servidor", {position: toast.POSITION.BOTTOM_CENTER});
    
    
            })
        }else{
            toast.warning("Todos los campos deben ser Seleccionados", {position: toast.POSITION.BOTTOM_CENTER});
        }
        
    }

    const peticionDelete = async(e) =>{
        //deleteTable();
        console.log("vamos a eliminar");
        console.log(formData.id_horario);
        await axios.delete(urlHorarios+"/"+formData.id_horario)
        .then(response=>{
            peticionGet();   
            abrirCerrarModalEliminar();
        })
    }

    const seleccionarConsola  = (consola,caso)=>{
        setformData(consola);
        
        (caso==='Eliminar')?abrirCerrarModalEliminar():abrirCerrarModalEditar();

    }

    const abrirCerrarModalEliminar = ()=>{
        setmodalEliminar(!modalEliminar);
    }

    const abrirCerrarModalEditar = () =>{
        setmodalEditar(!modalEditar);
    }

    //Elimina la datatable
    const deleteTable=()=>{        
        const script1 = document.createElement("script");
        script1.src = `/assets/demo/datatable-destroy.js`;
        script1.async = true;
        document.body.appendChild(script1);   
    }

    const bodyEliminar=(
        <div className={styles.modalEliminar}>
          <h3>Eliminar El día:  {dia_horario +" "+ hora_inicio_horario} a {hora_fin_horario }  </h3>
            <div className="text-center">
                <button type="button" className="btn btn-outline-success" style={{margin:"5px", width:"150px"}} onClick={()=>peticionDelete()} >Aceptar</button>
                <button type="button" className="btn btn-outline-danger" onClick={()=>abrirCerrarModalEliminar()} style={{margin:"5px", width:"150px"}} >Cancelar</button>
                
            
            </div>
        </div>
    )

    useEffect(() => {
        peticionGet();
       
    }, [])


    return (
        <div className="row animate__animated animate__fadeIn" style={{padding:'4vh'}}>
            <ol className="breadcrumb mb-4">
                            {/* <li className="breadcrumb-item active">{this.state.estado}</li> */}
            </ol>
            <div className="card shadow p-3 mb-5 bg-white col-md-4 rounded">
                <div className="card-header back-istmas">
                <i className="far fa-calendar-alt"></i>
                        <b>-Agregar Dia y Hora a Horario </b>
                </div>
                <div className="card-body">
                    <form onSubmit={peticionPost}>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label >Seleccione Día</label>
                                    <select className="form-select" name="dia_horario" value={dia_horario}  onChange={handleChange}>
                                        <option>Seleccione Día</option>
                                        <option value="Lunes">Lunes</option>
                                        <option value="Martes" >Martes</option>
                                        <option value="Miercoles">Miercoles</option>
                                        <option value="Jueves">Jueves</option>
                                        <option value="Viernes">Viernes</option>
                                        <option value="Sábado">Sábado</option>
                                    
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label >Hora de Inicio</label>
                                    <select className="form-select" name="hora_inicio_horario" value={hora_inicio_horario} onChange={handleChange}>
                                        <option >Seleccione Hora</option>
                                        <option value="07:00">07:00</option>
                                        <option value="08:00">08:00</option>
                                        <option value="09:00">09:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                        <option value="13:00">13:00</option>
                                        <option value="14:00">14:00</option>
                                        <option value="15:00">15:00</option>
                                        <option value="16:00">16:00</option>
                                        <option value="17:00">17:00</option>
                                        <option value="18:00">18:00</option>
                                        
                                    
                                    </select>
                                </div>
                            </div>
                                

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label >Hora de Inicio</label>
                                    <select className="form-select" name="hora_fin_horario" value={hora_fin_horario} onChange={handleChange}>
                                        <option >Seleccione Hora</option>
                                        <option value="07:00">07:00</option>
                                        <option value="08:00">08:00</option>
                                        <option value="09:00">09:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                        <option value="13:00">13:00</option>
                                        <option value="14:00">14:00</option>
                                        <option value="15:00">15:00</option>
                                        <option value="16:00">16:00</option>
                                        <option value="17:00">17:00</option>
                                        <option value="18:00">18:00</option>
                                    </select>
                                </div>

                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <label >Descripción:</label>
                                    <input type="text" className="form-control" name="descripcion_horario" value={descripcion_horario} onChange={handleChange} placeholder="Ej: Lunes Primera Hora" ></input>
                                </div>
                            </div>
                                
                        </div>

                        <div className="row text-center">
                            <div className="col-md-12 text-center">
                                <button type="submit" className="btn btn-outline-dark">Guardar Dia y Hora</button>
                            </div>
                        </div>
                    
                    </form>
                   
                </div>
            </div> 


            <div className="col-md-8">
                <div className="card mb-4 " >
                    
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped contenidoTabla"  id="dataTable" width="100%" >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Día</th>
                                        <th>H. Inicio </th>
                                        <th>H. Fin</th>
                                        <th>Descripción</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {/* {console.log(data)} */}
                                    {data.map((consola,index)=>(                                        
                                        <tr key={consola.id_horario}>
                                            <td>{index+1}</td>
                                            <td>{consola.dia_horario}</td>
                                            <td>{consola.hora_inicio_horario}</td>
                                            <td>{consola.hora_fin_horario}</td>
                                            <td>{consola.descripcion_horario}</td>
                                            <td className="" style={{textAlign:"center"}}> 
                                                <button className="btn btn-outline-success"  > 
                                                    <i className="puntero fas fa-pen"></i>
                                                </button>

                                                <button className="btn btn-outline-danger" onClick={()=>seleccionarConsola(consola,'Eliminar')}  > 
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

            </div>

            <Modal
                open={modalEliminar}
                onClose={()=>abrirCerrarModalEliminar()}
            >
                {bodyEliminar}
            </Modal>

        </div>
    )
}
