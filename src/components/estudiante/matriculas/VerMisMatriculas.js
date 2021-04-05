import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Cookies from 'universal-cookie';
import { ApiUrl } from '../../services/ApiRest';


const cookie= new Cookies();
const idEstudiante = cookie.get("idEstudiante");    //declaramos una variable para usar la cookie del login
const verMatriculasUrl= ApiUrl+ "matriculas-estudiante?estudiante_id="; //pasar id del estudiante
const urlCarrera= ApiUrl+ "carreras/"; //pasar id del estudiante
const ultimaMatricula = ApiUrl + "matricula-estudiante?estudiante_id="
export default class VerMisMatriculas extends Component {


    constructor(props) {
		super(props)

		this.state = {
			matriculas: "",
            abierto: false,
            cantidadDepositada:"",
            comprobante:"",
            idMatricula:"",
            pagoId:"1",
            mostrar:"1",
            noHayDatos:"No hay datos"


			
		}
    }
    
    componentDidMount(){
      
       axios.get(verMatriculasUrl +idEstudiante   )
          .then(res => {
            const matriculas = res.data[0];
            if(matriculas == undefined){
                console.log("no hay datos")
                this.setState({mostrar:"0"});
                
            }else{
                this.setState({ matriculas });
            }
            //console.log(matriculas);
        })

       // Ultima Matricula

       axios.get(ultimaMatricula +idEstudiante   )
          .then(res => {
            const idMatricula = res.data[0].id_matricula;
            this.setState({ idMatricula });
            console.log("ultima matricula");
            console.log(this.state.idMatricula);
            

        })


    }

    handleChange = async (e)=>{
        await this.setState({ [e.target.name]: e.target.value })
        //this.setState({estado:""});
        console.log(this.state)
    }

    handleImage = async (e)=>{
        await this.setState({comprobante: e.target.files})
        // console.log( "Comprobante");
         console.log( this.state);
    }
    

    

    abrirModal=(consola)=>{
        this.setState({abierto: !this.state.abierto});
        console.log("enviar datos");
        console.log(consola.comprobante_pago);
        this.setState({img: consola.comprobante_pago});
    }


    pagarMatricula = async (e)=>{
        e.preventDefault();
      
        var fecha = new Date();
        var dia=fecha.getDate();
        var mes=fecha.getDay();
        var anio=fecha.getFullYear();
        const fechaMatricula= `${anio}-${mes}-${dia}`;


        
        console.log(this.state.idMatricula);
        //console.log(this.state.comprobante[0]);
        console.log(this.state.cantidadDepositada);
        console.log(fechaMatricula);
        console.log(this.state.pagoId);

    
                
                const f = new FormData();
                f.append("matricula_id",this.state.idMatricula);
                
                f.append("url_comprobante",this.state.comprobante[0]);
                //f.append("estudiante_id",cookie.get("idEstudiante"));
                f.append("valor_cancelado",this.state.cantidadDepositada);
                f.append("fecha_matricula",fechaMatricula);
                f.append("pago_id",this.state.pagoId);
               

                const config = {     
                    headers: { 'content-type': 'multipart/form-data' }
                
                }
                console.log("yo envio");
                console.log(f);

                await axios
                .post(ApiUrl+"pagos",f,config)
                .then(response => {
                    console.log(response)
                    this.setState({estado:"Su matrícula ha sido enviada para revisión"});       
                })
                .catch(error => {
                    console.log(error);
                    this.setState({estado:"Error No se pudo conectar con el servidor"});    
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
                                        <div className="table-responsive">  
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
                                                        <td>{(this.state.mostrar === "0")? this.state.noHayDatos : this.state.matriculas.id_matricula}</td>                                                   
                                                        <td>{(this.state.mostrar === "0")? this.state.noHayDatos : this.state.matriculas.descripcion_estado_matricula}</td>                                                   
                                                        <td>{(this.state.mostrar === "0")? this.state.noHayDatos : this.state.matriculas.valor_cancelado}</td>                                                   
                                                        <td>{(this.state.mostrar === "0")? this.state.noHayDatos : this.state.matriculas.valor_pendiente}</td>                                                   
                                                        {/*<td>{this.state.matriculas.descripcion_estado_matricula}</td>                                                   
                                                        <td>{this.state.matriculas.valor_cancelado}</td>                                                   
                                                        <td>{this.state.matriculas.valor_pendiente}</td>                                                    */}
                                                                                            
                                                    </tr>
                                                
                                                </tbody>
                                            </table>
                                        </div>
                                        
                                    </div>
                                   
                                </div>
                            </div>  
                            
                        </div>  
                        <br/>

                       
                       

                       

                        <br/>
                        <div className="text-center">
                            
                        {/* <Button color="secondary" onClick={this.abrirModal} disabled>Agregar Pago</Button> */}

                            <Link to="/estudiante">
                                <button type="" className="btn  back-istmas "style={{margin:"5px", width:"170px"}}  ><b>Cancelar </b></button>
                            </Link>
                        
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
                                <Input type="number" name="cantidadDepositada" id="exampleEmail" onChange={this.handleChange} placeholder="$ 0.00" />
                            </FormGroup>                
                            <FormGroup>
                                <Label for="exampleFile">Comprobante de Pago</Label>
                                <Input type="file" name="comprobante" onChange={this.handleImage} id="exampleFile" />
                                
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    
                    <ModalFooter>
                    <Button onClick={this.pagarMatricula}>Submit</Button>
                        <Button color="secondary" onClick={this.abrirModal}>Cerrar</Button>
                    </ModalFooter>
                </Modal>
                
            </div>
        )
    }
}
