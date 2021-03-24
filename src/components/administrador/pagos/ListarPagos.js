import axios from 'axios';
import React, { Component } from 'react'
import { Button, Media, Modal, ModalFooter, ModalHeader } from 'reactstrap';
import { ApiUrl } from '../../services/ApiRest';

export default class ListarPagos extends Component {
    constructor (props){
        super(props)
        this.state = {
            pensiones:[],
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
        axios.get(ApiUrl+"todas-pensiones")
        .then(respuesta=>{
            const pensiones = respuesta.data;
            this.setState({pensiones})
            console.log(pensiones);
        })
        
       
    }



    aprobarMatricula(consola){
       
        
        axios.put(ApiUrl+"aprobar-pension/"+consola.pension_id)
        .then(respuesta=>{
            const res = respuesta.data;            
            console.log(res);

            axios.get(ApiUrl+"todas-pensiones")
            .then(respuesta=>{
                const pensiones = respuesta.data;
                this.setState({pensiones})
                console.log(pensiones);
            })
           
        })

       
        

    } 

    rechazarMatricula(consola){
       
        
        axios.put(ApiUrl+"rechazar-pension/"+consola.pension_id)
        .then(respuesta=>{
            const res = respuesta.data;
            
            console.log(res);
            axios.get(ApiUrl+"todas-pensiones")
            .then(respuesta=>{
                const pensiones = respuesta.data;
                this.setState({pensiones})
                console.log(pensiones);
            })
        })
        

    } 


    abrirModal=(consola)=>{
        this.setState({abierto: !this.state.abierto});
        console.log("enviar datos");
        console.log(consola.comprobante_pension);
        this.setState({img: consola.comprobante_pension});
    }


    

    render() {
        return (

            <div className=" row animate__animated animate__fadeIn">
                


                <div className="card mb-4 " style={{marginTop:"20px"}}>
                    
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered"   width="100%" >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Matricula</th>
                                        <th>Fecha de Solicitud</th>
                                        <th>Valor Cancelado</th>
                                        <th>Estado de Deposito</th>
                                        <th>Comprobante de Pago</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                               
                                <tbody>
                                    {this.state.pensiones.map(consola=>(                                        
                                        <tr key={consola.pension_id}>
                                            <td>{consola.pension_id}</td>
                                            <td>{consola.matricula_id}</td>
                                            <td>{consola.fecha_pago_matricula}</td>
                                            <td>{consola.cantidad_pension}</td>
                                            <td>{consola.estado_pension}</td>
                                            <td style={{textAlign:"center"}}>
                                                                                              
                                                <button className="btn btn-outline-info" onClick={()=> this.abrirModal(consola)}  > 
                                                    <i className="far fa-eye"></i>
                                                </button>
                                                
                                            </td>

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
                    
                    <Media object src={"http://istmas.edu.ec/academicoISTMAS-V7/storage/pensiones/"+this.state.img}  style={{maxHeight:"200", maxWidth:"200"}}/>


                    <ModalFooter>
                        <Button color="secondary" onClick={this.abrirModal}>Cerrar</Button>
                    </ModalFooter>
                </Modal>

    </div>
        )
    }
}
