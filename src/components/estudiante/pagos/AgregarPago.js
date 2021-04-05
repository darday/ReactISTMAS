import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Button,Modal, FormGroup, Input, Label, ModalBody, ModalFooter, ModalHeader, Media, Form, FormText } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css';

import { ApiUrl } from '../../services/ApiRest'

const ApiPagos = ApiUrl+"listar-pensiones";

export default class AgregarPago extends Component {

    constructor(props){
        super(props)
        this.state ={
            listaPagos:[],     
            abierto: false,
            matriculaId:"",
            comprobante:"",
            cantidadPago:"",
            fechaPago:"",
            pagoId:""

       
        }
      //  this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        axios.get(ApiPagos)
        .then(respuesta=>{
            const listaPagos = respuesta.data;
            this.setState({listaPagos})
            //console.log(listaPagos);
        })
    }

    abrirModal=(consola)=>{
        this.setState({abierto: !this.state.abierto});
        console.log("enviar datos");
        console.log(consola.comprobante_pago);
        this.setState({img: consola.comprobante_pago});
    }

    enviarPago(){
        console.log("datos enviados");
    }

    /*handleChange(){
        await this.setState({ [e.target.name]: e.target.value})


    }*/
    
    render() {
       
        return (
            <div>
                
                <div className="card shadow p-3 mb-5 bg-white rounded" >
                    <div className="card-header back-istmas">
                    
                        <b><i className="fas fa-dollar-sign"></i> Agregar Pagos </b>
                    </div>

                    <div className="card-body">            
                        <div className="row ">                                        
                            <div className="col-12 col-sm-12 col-lg-11 col-xl-11 centrar" >
                                <div className="card text-center ">
                                    <div className="card-header ">
                                        PAGOS
                                    </div>
                                    <div className="card-body centrar " style={{width:"100%"}}>
                                        <div className="table-responsive">
                                            <table className="table  text-left">
                                                <thead >
                                                    <tr>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Descripción</th>
                                                    <th scope="col">Fecha de Vencimiento</th>
                                                    <th scope="col">Acciones</th>
                                                    
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {console.log(this.state.listaPagos)}
                                                    {this.state.listaPagos.map(consola=>(                                        
                                                    <tr key={consola.id_pension}>
                                                        <td>{consola.id_pension}</td>
                                                        <td>{consola.descripcion_pension}</td>
                                                        <td>{consola.fecha_vencimiento}</td>
                                                        <td className="" style={{textAlign:"center"}}> 
                                                            <button className="btn btn-outline-success" onClick={this.abrirModal} > 
                                                                <i className="fas fa-plus-square"></i>
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
                        </div>  
                        
                       
                    
                        
                            
                    </div>
                </div>

                <Modal isOpen={this.state.abierto} >
                    <ModalHeader>
                        COMPROBANTE DE PAGO
                    </ModalHeader>
                    
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">Cantidad Depositada</Label>
                                <Input type="number" name="email" id="exampleEmail" placeholder="$ 0.00" />
                            </FormGroup>                
                            <FormGroup>
                                <Label for="exampleFile">Comprobante de Pago</Label>
                                <Input type="file" name="file" id="exampleFile" />
                                {/* <FormText color="muted">
                                    Subir el comprobante de Pago
                                </FormText> */}
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    
                    <ModalFooter>
                    <Button onClick={this.enviarPago}>Submit</Button>
                        <Button color="secondary" onClick={this.abrirModal}>Cerrar</Button>
                    </ModalFooter>
                </Modal>


                {/* ************************ */}
                {/* <div className="card mb-4">
                            <div className="card-header">
                                <i className="fas fa-table mr-1"></i>
                                DataTable Example
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Office</th>
                                                <th>Age</th>
                                                <th>Start date</th>
                                                <th>Salary</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Office</th>
                                                <th>Age</th>
                                                <th>Start date</th>
                                                <th>Salary</th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            <tr>
                                                <td>Tiger Nixon</td>
                                                <td>System Architect</td>
                                                <td>Edinburgh</td>
                                                <td>61</td>
                                                <td>2011/04/25</td>
                                                <td>$320,800</td>
                                            </tr>
                                            <tr>
                                                <td>Garrett Winters</td>
                                                <td>Accountant</td>
                                                <td>Tokyo</td>
                                                <td>63</td>
                                                <td>2011/07/25</td>
                                                <td>$170,750</td>
                                            </tr>
                                            <tr>
                                                <td>Ashton Cox</td>
                                                <td>Junior Technical Author</td>
                                                <td>San Francisco</td>
                                                <td>66</td>
                                                <td>2009/01/12</td>
                                                <td>$86,000</td>
                                            </tr>
                                          
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div> */}


                
            </div>
        )
    }
}



  
