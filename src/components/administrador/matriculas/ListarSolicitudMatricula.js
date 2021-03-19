import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Button,Modal, FormGroup, Input, Label, ModalBody, ModalFooter, ModalHeader, Media } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css';

import '../../services/ApiRest'

import { ApiUrl } from '../../services/ApiRest'


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
            img:"" 
        }
    }

    componentDidMount(){
       
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
        await this.setState({[e.target.name]: e.target.value});
       // var ciclos = this.state.ciclos;
        console.log(this.state);
         //obtener matrículas
         axios.get(ApiUrl+"matriculas?carrera_id="+this.state.idCarrera+"&ciclo_academico_id="+this.state.idCiclo)
         .then(respuesta=>{
             const matric = respuesta.data;
             this.setState({matriculas:matric})
             console.log(this.state.matriculas);
         })
    }

    aprobarMatricula(consola){
       
        
        axios.put(ApiUrl+"matriculas/"+consola.id_matricula)
        .then(respuesta=>{
            const res = respuesta.data;
            
            console.log(res);
        })

       
        

    } 

    rechazarMatricula(consola){
       
        
        axios.put(ApiUrl+"rechazar/"+consola.id_matricula)
        .then(respuesta=>{
            const res = respuesta.data;
            
            console.log(res);
        })
        

    } 

    mostrarComprobante(consola){
        
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
                <div className="card text-center">
                    <div className="card-header">
                        <h5><b>FILTRAR DATOS</b></h5>
                    </div>
                    <div className="card-body">
                        <div className="row" >
                            <div className="mb-3 col-12 col-sm-12 col-lg-4 col-xl-4 centrar">
                                <label  className="form-label">Seleccione una carrera</label>
                                    <select className="form-select" name="idCarrera" onChange={this.handleChange} aria-label="Default select example">
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


                <div className="card mb-4 " style={{marginTop:"20px"}}>
                    <div className="card-header ">
                        <div className="row">
                            
                           
                            <div className="col-12 col-sm-12 col-lg-12 col-xl-12 ">
                                <form className="d-md-inline-block  ">
                                    <div className="input-group">
                                    
                                        <div className="input-group text-right">
                                            <label style={{margin:"5px"}}><b>Buscar : </b> </label>

                                            <input className="form-control" type="text" placeholder="Cédula de Identidad..." aria-label="Search" aria-describedby="basic-addon2" />
                                            <div className="input-group-append">
                                                <button className="btn btn-primary" type="button"><i className="fas fa-search"></i></button>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </form>
                            </div>
                        </div>
                     
                        
                           
                        
                       
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered"   width="100%" >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Estudiante</th>
                                        <th>Fecha de Solicitud</th>
                                        <th>Ciclo</th>
                                        <th>Valor Cancelado</th>
                                        <th>Valor Pendiente</th>
                                        <th>Comprobante de Pago</th>
                                        <th>Matricula</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                               
                                <tbody>
                                    {this.state.matriculas.map(consola=>(                                        
                                        <tr key={consola.id_matricula}>
                                            <td>{consola.id_matricula}</td>
                                            <td>{consola.apellidos_estudiante+" "+ consola.nombres_estudiante}</td>
                                            <td>{consola.fecha_matricula}</td>
                                            <td>{consola.descripcion_ciclo_academico}</td>
                                            <td>{consola.valor_cancelado}</td>
                                            <td>{consola.valor_pendiente}</td>
                                            <td style={{textAlign:"center"}}>
                                                                                              
                                                <button className="btn btn-outline-info" onClick={()=> this.abrirModal(consola)}  > 
                                                    <i className="far fa-eye"></i>
                                                </button>
                                                
                                            </td>

                                            <td>{consola.descripcion_estado_matricula}</td>
                                            <td style={{textAlign:"center"}}>
                                                {/* */}
                                                <button className="btn btn-outline-success"  onClick={()=> this.aprobarMatricula(consola)} > 
                                                    <i className="puntero fas fa-user-check"  ></i>
                                                </button>
                                                
                                               
                                                    <button className="btn btn-outline-danger"  onClick={()=> this.rechazarMatricula(consola)}  > 
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
