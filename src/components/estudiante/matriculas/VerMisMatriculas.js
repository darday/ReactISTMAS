import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { ApiUrl } from '../../services/ApiRest';


const cookie= new Cookies();
const idEstudiante = cookie.get("idEstudiante");    //declaramos una variable para usar la cookie del login
const verMatriculasUrl= ApiUrl+ "matriculas-estudiante?estudiante_id="; //pasar id del estudiante
const urlCarrera= ApiUrl+ "carreras/"; //pasar id del estudiante
export default class VerMisMatriculas extends Component {


    constructor(props) {
		super(props)

		this.state = {
			matriculas: ""
			
		}
    }
    
    componentDidMount(){
        axios.get(verMatriculasUrl +idEstudiante  )
        .then(res => {
            const matriculas = res.data;
           // this.setState({matriculas:this.state.matriculas})
          console.log(matriculas);
       })

       axios.get(verMatriculasUrl +idEstudiante   )
          .then(res => {
            const matriculas = res.data[0];
            this.setState({ matriculas });
            console.log(this.state.matriculas);
        })


    }

    render() {
        return (
            <div>
                
            <div className="card shadow p-3 mb-5 bg-white rounded" >
                <div className="card-header back-istmas">
                <i className="far fa-sticky-note"></i>
                        <b>-Mis Matriculas </b>
                </div>
                <div className="card-body">
                  

                        <div className="row ">                                        
                            <div className="col-12 col-sm-12 col-lg-11 col-xl-11 centrar" >
                                <div className="card text-center ">
                                    <div className="card-header ">
                                        MATRICULAS
                                    </div>
                                    <div className="card-body centrar " style={{width:"100%"}}>
                                        <table className="table  text-left">
                                            <thead >
                                                <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Estado de Maatricula</th>
                                                <th scope="col">Valor Cancelado</th>
                                                <th scope="col">Valor Pendiente</th>
                                                
                                                </tr>
                                            </thead>
                                            <tbody>
                                                                                 
                                                <tr >
                                                    <td>{this.state.matriculas.id_matricula}</td>                                                   
                                                    <td>{this.state.matriculas.descripcion_estado_matricula}</td>                                                   
                                                    <td>{this.state.matriculas.valor_cancelado}</td>                                                   
                                                    <td>{this.state.matriculas.valor_pendiente}</td>                                                   
                                                                                        
                                                </tr>
                                            
                                            </tbody>
                                        </table>
                                        
                                    </div>
                                   
                                </div>
                            </div>  
                            
                        </div>  
                        <br/>

                       
                       

                       

                        <br/>
                        <div className="text-center">
                            
                            <Link to="/estudiante">
                                <button type="" className="btn  back-istmas "style={{margin:"5px", width:"170px"}}  ><b>Cancelar </b></button>
                            </Link>
                        
                        </div>
                 
                     
                        
                </div>
            </div>
                
            </div>
        )
    }
}
