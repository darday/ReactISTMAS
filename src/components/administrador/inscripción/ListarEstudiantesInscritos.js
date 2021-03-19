import axios from 'axios';
import React, { Component } from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { ApiUrl } from '../../services/ApiRest';

const baseUrl=ApiUrl+"estudiantes"; 
export default class ListarEstudiantesInscritos extends Component {
    constructor(props) {
        super(props);
        this.state = {    
            estudiantes:[],
            abierto: false       
        };
    
      //  this.handleChange = this.handleChange.bind(this);
        
    }

    componentDidMount() {
        axios.get(baseUrl   )
          .then(res => {
            const estudiantes = res.data;
            this.setState({ estudiantes });
           //console.log(estudiantes);
          })
    }
    
    abrirModal=()=>{
        this.setState({abierto: !this.state.abierto});
    }

    seleccionarEstudiantes=(consola)=>{
        console.log("clic");
        console.log(consola);

    }
    


    render() {
        return (
            <div className="row animate__animated animate__fadeIn">
            
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-table mr-1"></i>
                        Lista Estudiantes Inscritos
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered"   width="100%" >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombres</th>
                                        <th>Apellidos</th>
                                        <th>Cédula</th>
                                        <th>Celular</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                               
                                <tbody>
                                    {console.log(this.state.estudiantes)}
                                    {this.state.estudiantes.map(consola=>(                                        
                                        <tr key={consola.id_estudiante}>
                                            <td>{consola.id_estudiante}</td>
                                            <td>{consola.nombres_estudiante}</td>
                                            <td>{consola.apellidos_estudiante}</td>
                                            <td>{consola.numero_identificacion_estudiante}</td>
                                            <td>{consola.celular_estudiante}</td>
                                            <td className="" style={{textAlign:"center"}}> 
                                                <button className="btn btn-outline-success" onClick={this.abrirModal} > 
                                                    <i className="puntero fas fa-pen"  ></i>

                                                </button>
                                                <Link to="/login">
                                                    <button className="btn btn-outline-danger" onClick={()=>this.seleccionarEstudiantes(consola)}  > 
                                                        <i className=" puntero fas fa-trash-alt" ></i>          
                                                    </button>

                                                </Link>
                                               
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

                


                {/* ************************** */}

                <Modal isOpen={this.state.abierto} >
        <ModalHeader>
          Iniciar Sesión
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="usuario">Usuario</Label>
            <Input type="text" id="usuario"/> 
          </FormGroup>
          <FormGroup>
            <Label for="password">Contraseña</Label>
            <Input type="text" id="password"/> 
          </FormGroup>
        </ModalBody>

        <ModalFooter>
            <Button color="primary">Iniciar Sesión</Button>
            <Button color="secondary" onClick={this.abrirModal}>Cerrar</Button>
        </ModalFooter>
      </Modal>

            </div>

            

            

        )
    }
}
