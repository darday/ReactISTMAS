import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Button,Modal, FormGroup, Input, Label, ModalBody, ModalFooter, ModalHeader, Media } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css';

import '../../services/ApiRest'

import { ApiUrl } from '../../services/ApiRest'

console.log("Cambiando");
        const script = document.createElement("script");
        script.src = `/assets/demo/datatable-destroy.js`;
        script.async = true;
        document.body.appendChild(script); 
        
export default class ListarSolicitudMatricula extends Component {
    constructor (props){
        super(props)
        this.state = {
            matriculas:[],
            carreras:[],
            ciclos:[],
            paralelos:[],
            idCiclo:"",
            abierto: false,
            img:"" ,
            mostrarTable:1,
            mostrarMensaje:1,
        }
    }

    componentDidMount(){
       //destruye la tabla para des´pues cponstruirla de nuevo
        


        //obtener carreras
        axios.get(ApiUrl+"carreras")
        .then(respuesta=>{
            const carreras = respuesta.data;
            this.setState({carreras})
            //console.log(respuesta);
        })
        //obtener ciclos académicos
        axios.get(ApiUrl+"ciclos")
        .then(respuesta=>{
            const ciclos=respuesta.data;
            this.setState({ciclos});
            //console.log(ciclos.sort());
        })
        //obtener paralelos
       
    }

    handleChange = async(e) =>{        
        e.preventDefault();
        this.setState({mostrarTable:1})

        console.log("Cambiando");
        const script = document.createElement("script");
        script.src = `/assets/demo/datatable-destroy.js`;
        script.async = true;
        document.body.appendChild(script); 
        await this.setState({[e.target.name]: e.target.value});
        //obtener matrículas
        axios.get(ApiUrl+"matriculas?carrera_id="+this.state.idCarrera+"&ciclo_academico_id="+this.state.idCiclo)
        .then(respuesta=>{
            const matric = respuesta.data;
            if(respuesta.data.length !== 0){
                const script = document.createElement("script");
                script.src = `/assets/demo/datatables-demo.js`;
                script.async = true;
                document.body.appendChild(script); 
                this.setState({mostrarTable:0})
            }
             this.setState({matriculas:matric})
             console.log(this.state.matriculas);
         })
    }

    aprobarMatricula(consola){   
         //Destruir la tabla para crear una nueva con lo9s datos
        // const script1 = document.createElement("script");
        // script1.src = `/assets/demo/datatable-destroy.js`;
        // script1.async = true;
        // document.body.appendChild(script1); 

        axios.put(ApiUrl+"matriculas/"+consola.id_matricula)
        .then(respuesta=>{
            const res = respuesta.data;
            
            console.log(res);
            axios.get(ApiUrl+"matriculas?carrera_id="+this.state.idCarrera+"&ciclo_academico_id="+this.state.idCiclo)
            .then(respuesta=>{
                const matric = respuesta.data;
                this.setState({matriculas:matric})
                console.log(this.state.matriculas);
                // const script = document.createElement("script");
                // script.src = `/assets/demo/datatables-demo.js`;
                // script.async = true;
                // document.body.appendChild(script);

                
            })
        })       

    } 

    refrescarDataTable(){
         //     Destruir la tabla para crear una nueva con lo9s datos
        const script1 = document.createElement("script");
        script1.src = `/assets/demo/datatable-destroy.js`;
        script1.async = true;
        document.body.appendChild(script1);    

        const script = document.createElement("script");
        script.src = `/assets/demo/datatables-demo.js`;
        script.async = true;
        document.body.appendChild(script);


    }

    rechazarMatricula(consola){      
        
          //Destruir la tabla para crear una nueva con lo9s datos
        //   const script1 = document.createElement("script");
        //   script1.src = `/assets/demo/datatable-destroy.js`;
        //   script1.async = true;
        //   document.body.appendChild(script1); 


        axios.put(ApiUrl+"rechazar/"+consola.id_matricula)
        .then(respuesta=>{
            const res = respuesta.data;
            
            console.log(res);
            axios.get(ApiUrl+"matriculas?carrera_id="+this.state.idCarrera+"&ciclo_academico_id="+this.state.idCiclo)
            .then(respuesta=>{
                const matric = respuesta.data;
                this.setState({matriculas:matric})
                // console.log(this.state.matriculas);
                // const script = document.createElement("script");
                // script.src = `/assets/demo/datatables-demo.js`;
                // script.async = true;
                // document.body.appendChild(script);
                // console.log(this.state.matriculas);

                
            })
        })
        

    } 

    abrirModal=(consola)=>{
        this.setState({abierto: !this.state.abierto});
        console.log("enviar datos");
        console.log(consola.comprobante_pago);
        this.setState({img: consola.comprobante_pago});
    }  

    render() {
        return (
            <div className=" row animate__animated animate__fadeIn">
                 <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item active">{this.state.estado}</li>
                </ol>
                <div className="card ">
                    <div className="card-header back-istmas ">
                        {/* <h5><b>FILTRAR DATOS</b></h5> */}
                        <b>-Listar Solicitud de Matriculas </b>
                    </div>
                    <div className="card-body">
                        <div className="row" >
                            <div className="mb-3 col-12 col-sm-12 col-lg-4 col-xl-4 centrar">
                                <label  className="form-label">Seleccione una carrera</label>
                                    <select className="form-select" name="idCarrera"  onChange={this.handleChange} aria-label="Default select example">
                                        <option value="undefined">Seleccione una carrera</option>                                 
                                        
                                            { this.state.carreras.map(person => <option key={person.id_carrera} value={person.id_carrera} > { person.descripcion_carrera}</option>)}
                                            
                                        
                                    </select>
                            </div>  

                            <div className="mb-3 col-12 col-sm-12 col-lg-4 col-xl-4 centrar">
                                <label  className="form-label">Seleccione una ciclo académico</label>

                                    <select className="form-select" name="idCiclo" onChange={this.handleChange} aria-label="Default select example">
                                        <option value="undefined">Ciclo Académico</option>                                 
                                        {/* <option value="66">Mostrar Todos</option>                                  */}
                                        
                                            { this.state.ciclos.map(person => <option key={person.id_ciclo_academico} value={person.id_ciclo_academico} > { person.descripcion_ciclo_academico}</option>)}
                                                                             
                                    </select>
                            </div>


                             
                        
                        </div>       
                        
                    </div>
                   
                </div>


                <div className="card mb-4 animate__animated animate__fadeIn " style={{marginTop:"20px"}}  hidden={this.state.mostrarTable}>
                    <div className="card-header ">
                        <button type="button" className="btn btn-outline-secondary" onClick={this.refrescarDataTable}><i className="fas fa-sync-alt"></i>Preparar Página Para Exportación</button>

                    </div>
                    <div className="card-body ">
                        <div className="table-responsive">
                            <table className="table table-bordered contenidoTabla"  id="dataTableListarMatriculas" width="100%"   >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Estudiante</th>
                                        <th>Ciclo</th>
                                        <th>Fecha de Solicitud</th>
                                        <th >Valor Cancelado</th>
                                        <th>Valor Pendiente</th>
                                        <th>Comprobante</th>
                                        <th>Matricula</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                               
                                <tbody>
                                    {this.state.matriculas.map((consola,index)=>(                                        
                                        <tr key={consola.id_matricula}>
                                            <td>{index+1}</td>
                                            <td>{consola.apellidos_estudiante+" "+ consola.nombres_estudiante}</td>
                                            <td>{consola.descripcion_ciclo_academico}</td>
                                            <td>{consola.fecha_matricula}</td>
                                            <td>{consola.valor_cancelado}</td>
                                            <td>{consola.valor_pendiente}</td>
                                            <td style={{textAlign:"center"}}>
                                                                                              
                                                <button className="btn btn-outline-info" onClick={()=> this.abrirModal(consola)}  > 
                                                    <i className="far fa-eye " ></i>
                                                </button>
                                                
                                            </td>
                                            <td>{consola.descripcion_estado_matricula}</td>

                                            <td style={{textAlign:"center"}}>
                                                {/* */}
                                                <button className="btn btn-outline-success "  onClick={()=> this.aprobarMatricula(consola)} > 
                                                    <i className="puntero fas fa-user-check"  ></i>
                                                </button>
                                                
                                               
                                                    <button className="btn btn-outline-danger "  onClick={()=> this.rechazarMatricula(consola)}  > 
                                                        <i className=" puntero fas fa-user-times" ></i>   
                                                    </button>
                                                
                                            </td>                                             
                                        </tr>
                                    ))} 
                                   
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <Modal isOpen={this.state.abierto} >
                    <ModalHeader>
                        COMPROBANTE DE PAGO
                    </ModalHeader>
                    
                    <Media object src={"http://istmas.edu.ec/academicoISTMAS-V7/storage/comprobantes/"+this.state.img}  style={{maxHeight:"200", maxWidth:"200"}}/>


                    <ModalFooter>
                        <Button color="secondary" onClick={this.abrirModal}>Cerrar</Button>
                    </ModalFooter>
                </Modal>

    </div>
        )
    }
}
