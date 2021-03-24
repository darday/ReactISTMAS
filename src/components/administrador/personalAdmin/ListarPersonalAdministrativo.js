import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../../services/ApiRest";
import { ApiUrl } from '../../services/ApiRest';
import VerInfoAdministrativo from './VerInfoAdministrativo';

export default class ListarPersonalAdministrativo extends Component {
    constructor(props){
        super(props);
        this.state = {    
            padministrativo:[],
            enviarDatosObj:[]       
        };
        
    }


    componentDidMount(){
        axios.get(ApiUrl+"admins")
        .then(res=>{
            const padministrativo=res.data;
            this.setState({padministrativo})
            console.log(padministrativo);
            
        })
    }

     enviarDatos(consola){
        console.log("enviar datos");
        console.log(consola);
        this.setState({enviarDatos:consola})
        
    }
    


    render() {
        return (
            <div className="row animate__animated animate__fadeIn">
                
                <div style={{textAlign:"center"}}>
                    <h5>
                    <br/>
                        <i className="fas fa-table mr-1"></i>
                        Lista del Personal Administrativo
                        
                    </h5>
                </div>

                <div className="card mb-4">
                    <div className="card-header">

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
                                        <th>Apellidos</th>
                                        <th>Nombres</th>
                                        <th>Cédula Identidad</th>
                                        <th>Celular</th>
                                        <th>Email</th>
                                        {/* <th>Acciones</th> */}
                                    </tr>
                                </thead>
                            
                                <tbody>
                                    { this.state.padministrativo.map(consola=>(                                        
                                        <tr key={consola.id_administrativo}>
                                            <td>{consola.id_administrativo}</td>
                                            <td>{consola.apellidos_administrativo}</td>
                                            <td>{consola.nombres_administrativo}</td>
                                            <td>{consola.numero_identificacion_administrativo}</td>
                                            <td>{consola.celular_administrativo}</td>
                                            <td>{consola.email_administrativo}</td>
                                            {/* <td style={{textAlign:"center"}}>
                                                <Link to="/administrativo/VerInfoAdministrativo" >                                                    
                                                    <button className="btn btn-outline-info" onClick={()=> this.enviarDatos(consola)}  > 
                                                        <i className="far fa-eye"></i><VerInfoAdministrativo datos={this.enviarDatosObj}  />
                                                    </button>
                                                </Link>
                                                <button className="btn btn-outline-success"  > 
                                                    <i className="puntero fas fa-pen"  ></i>
                                                </button>
                                                
                                                <Link to="/administrativo">
                                                    <button className="btn btn-outline-danger"   > 
                                                        <i className=" puntero fas fa-trash-alt" ></i>          
                                                    </button>
                                                </Link>    
                                            </td>                                       */}
                                        </tr>
                                    ))} 
                                
                                
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
