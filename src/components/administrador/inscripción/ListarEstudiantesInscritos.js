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
        this.componentDidMount = this.componentDidMount.bind(this);
    
        
    }

    

    componentDidMount() {
          //Código para llamar el script de la carpeta prinmcipal
        //   const script = document.createElement("script");
        //   script.src = `/assets/demo/datatables-demo.js`;
        //   script.async = true;
        //   document.body.appendChild(script); 

        //Trae los estudiantes Inscritos
        axios.get(baseUrl   )
        .then(res => {
            const estudiantes = res.data;
            //si el vector es mayor 
            if(res.data.length !== 0){
                const script = document.createElement("script");
                script.src = `/assets/demo/datatables-demo.js`;
                script.async = true;
                document.body.appendChild(script); 
            }else{
                if(res.data.length === 1){
                    const script = document.createElement("script");
                    script.src = `/assets/demo/datatables-demo.js`;
                    script.async = true;
                    document.body.appendChild(script); 
                }
            }
            this.setState({ estudiantes });
            
            

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
                            <table className="table table-striped contenidoTabla"  id="dataTable" width="100%" >
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


      {/* <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table mr-1"></i>
                                DataTable Example
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
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
