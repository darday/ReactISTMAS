import axios from 'axios';
import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import { ApiUrl } from '../../services/ApiRest'

const cookie= new Cookies();
const idEstudiante = cookie.get("idEstudiante");    //declaramos una variable para usar la cookie del login
const ultimaMatricula = ApiUrl + "matricula-estudiante?estudiante_id="

const valor="";
const urlMisPagos=ApiUrl+"pension-matricula?id_matricula="
export default class EstadoMisPagosPension extends Component {

    constructor(props){
        super(props)
        this.state ={
            idMatricula:"",
            misPagos:[]

       
        }
       
    }

    componentDidMount(){

        axios.get(ultimaMatricula +idEstudiante   )
        .then(res => {
          const idMatricula = res.data[0].id_matricula;
          this.setState({ idMatricula });
          console.log(this.state.idMatricula);
          const valor=this.state.idMatricula;

          axios.get(urlMisPagos+idMatricula)
          .then(respuesta=>{
              const misPagos = respuesta.data;
              this.setState({misPagos})
              console.log(misPagos);
          })
        })

        console.log("ultima matricula");
        console.log("valor");
        console.log(valor);
        console.log("valor");


       


    }
    render() {
        return (
            <div>
                
                <div className="card shadow p-3 mb-5 bg-white rounded" >
                    <div className="card-header back-istmas">
                    
                        <b><i className="fas fa-dollar-sign"></i> Listar Pagos de Pensiones</b>
                    </div>

                    <div className="card-body">            
                        <div className="row ">                                        
                            <div className="col-12 col-sm-12 col-lg-11 col-xl-11 centrar" >
                                <div className="card text-center ">
                                    <div className="card-header ">
                                        PAGOS DE PENSIONES
                                    </div>
                                    <div className="card-body centrar " style={{width:"100%"}}>
                                        <table className="table  text-left">
                                            <thead >
                                                <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Enstado Pensión</th>
                                                <th scope="col">Cantidad Pensión</th>
                                                <th scope="col">Fecha Pago Pensión</th>
                                                <th scope="col">Acciones</th>
                                                
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.misPagos.map(consola=>(                                        
                                        <tr key={consola.pension_id}>
                                            <td>{consola.pension_id}</td>
                                            <td>{consola.matricula_id}</td>
                                            <td>{consola.fecha_pago_matricula}</td>
                                            <td>{consola.cantidad_pension}</td>
                                            <td>{consola.estado_pension}</td>
                                            

                                                                                       
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
        )
    }
}
