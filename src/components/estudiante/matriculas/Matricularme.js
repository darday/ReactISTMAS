import axios from 'axios';
import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import "../../services/ApiRest";
import { ApiUrl } from '../../services/ApiRest';

const cookie = new Cookies();

const urlBase= ApiUrl+"cursos";
const idCarreraEstu = cookie.get("idCarreraEstu"); 
const idEstudiante = cookie.get('idEstudiante');


export default class Matricularme extends Component {

    constructor(props) {
		super(props)

		this.state = {
            ciclosAcademicos:[],      
            carrera:[],      
            paralelo:[],      
            periodos:[], 
            periodosId:[], 
            cursos:[],  
            cursoMatricularse:"",
            tipoMatricula:"1",
            estadoMatricula:"1",  
            costoMatricula:"353",
            estado:"" ,
            comprobante:"",
            valorCancelado:"",//CAMBIAR PARA QUE INGRESE EL ESTU
            fechaVencimiento: "2021-09-12",
            pagoId:"1",
            compromiso:"",
            mostrar:1,
            mostrarTexto:""


           
        }
        this.handleChange = this.handleChange.bind(this);

    }
    
    handleChange = async (e)=>{
        await this.setState({ [e.target.name]: e.target.value})
        this.setState({estado:""});
        console.log( "id Nivel"+this.state.nivel);
        console.log( "id Paralelo"+this.state.paraleloEstu);
        console.log( "id CArrera"+cookie.get("idCarreraEstu"));
       
        
        axios.get(ApiUrl+"cursos?carrera_id="+cookie.get("idCarreraEstu")+"&ciclo_academico_id="+this.state.nivel+"&paralelo_id="+this.state.paraleloEstu)
        .then(res => {
            const cursos = res.data;
            this.setState({ cursos });            
            
            if(res.data.length > 0){
                console.log("entro la condicion es diferente de 0")
                console.log("id_Curso="+res.data[0].id_curso)
                const cursoMatricularse=res.data[0].id_curso;
                this.setState({cursoMatricularse})
            }else{

                const cursoMatricularse=0;
                this.setState({cursoMatricularse})

            }
          })

          

    }

    handleImage = async (e)=>{
        await this.setState({comprobante: e.target.files})
        // console.log( "Comprobante");
         //console.log( this.state);
    }

    handleCompromiso = async (e)=>{
        await this.setState({compromiso: e.target.files})
        // console.log( "Comprobante");
         console.log( this.state.compromiso[0]);
    }

    

    componentDidMount(){        
        axios.get(ApiUrl+"periodos"   )
            .then(respuesta => {
            const periodos = respuesta.data.descripcion_periodo_academico;        
            const periodosId = respuesta.data.id_periodo_academico;        
            this.setState({ periodos });
            this.setState({ periodosId });
          // console.log("periodos"+periodosId);
        })
         //mostrar la carrera a la que pertenece el estudiante 
        axios.get(ApiUrl+"carreras/"+ cookie.get("idCarreraEstu") )
        .then(respuesta => {
        const carrera = respuesta.data;        
        console.log("esta es la carrera"+carrera.descripcion_carrera)
        
        this.setState({ carrera });
            //mostrar todos los ciclos(semestres)
     
        })
        
        axios.get(ApiUrl+"ciclos"   )
            .then(respuesta => {
            const ciclosAcademicos = respuesta.data;        
           // console.log(respuesta)
            this.setState({ ciclosAcademicos });
        })

        axios.get(ApiUrl+"paralelos"   )
            .then(respuesta => {
            const paralelo = respuesta.data;        
            this.setState({ paralelo });
            //console.log("paralelos"+paralelo);
        })

        //verificar

        axios
			.post(ApiUrl+"verificar", {estudiante_id: idEstudiante })
			.then(response => {
                console.log(response.data.success);       
                if(response.data.success == false){
                    console.log("ya tiene matrixcula");
                    console.log(response.data);
                    this.setState({mostrar:1, mostrarTexto:"Su Matricula está en Proceso"});            


                }  else{
                    this.setState({mostrar:0,mostrarTexto:""});            

                    
                }
            
			})
			.catch(error => {
                console.log(error);
                this.setState({estado:"Error No se pudo conectar con el servidor"});

        }) 
        
        
    
    }

    confirmarFormulario = async (e) =>{
        window.confirm("Está seguro que desea matricularse en este nivel?") &&
        this.matricularEstudiante(e)
    }

    matricularEstudiante = async (e)=>{
        e.preventDefault();
      
        var fecha = new Date();
        var dia=fecha.getDate();
        var mes=fecha.getDay();
        var anio=fecha.getFullYear();
        const fechaMatricula= `${anio}-${mes}-${dia}`;

        console.log(this.state.tipoMatricula);
        console.log(this.state.estadoMatricula);
        console.log(this.state.periodosId);
        console.log("holi"+this.state.cursoMatricularse);
        console.log(fechaMatricula);
        console.log(this.state.costoMatricula);
        //console.log(this.state);

        console.log("cursosssssssss");
            console.log(this.state.cursos);

        if(!this.state.cursoMatricularse){
            this.setState({estado:"No se ha seleccionado una horario válido"});
        }else{
            if(this.state.comprobante === undefined){
               this.setState({estado:"No se ha seleccionado una horario válido"});

           }else{
                 if( this.state.cursos.data != 0){
                const f = new FormData();
                f.append("tipo_matricula_id",this.state.tipoMatricula);
                f.append("estado_matricula_id",this.state.estadoMatricula);
                f.append("periodo_academico_id",this.state.periodosId);
                f.append("curso_id",this.state.cursoMatricularse);
                f.append("fecha_matricula",fechaMatricula);
               // f.append("costo_matricula",this.state.costoMatricula);
                f.append("url_comprobante",this.state.comprobante[0]);
                f.append("estudiante_id",cookie.get("idEstudiante"));
                f.append("cantidad_pago",this.state.valorCancelado);
                f.append("fecha_vencimiento",this.state.fechaVencimiento);
                f.append("pago_id",this.state.pagoId);
                f.append("valor_cancelado",this.state.valorCancelado);
                f.append("url_compromiso",this.state.compromiso[0]);
                f.append("ciclo_academico_id",this.state.nivel);

                const config = {     
                    headers: { 'content-type': 'multipart/form-data' }
                }

                console.log("yo envio");
                console.log(f);

                await axios
                .post(ApiUrl+"matriculas",f,config)
                .then(response => {
                    console.log(response)
                    this.setState({estado:"Su matrícula ha sido enviada para revisión"});       
                })
                .catch(error => {
                    console.log(error);
                    this.setState({estado:"Error No se pudo conectar con el servidor"});    
                })  

            }else{
                this.setState({estado:"No se ha seleccionado una horario válido"});
            }

           }
           
        }
        
       
       /* if(!this.state.cursoMatricularse){
            this.setState({estado:"No se ha seleccionado una horario válido"});
        }else{
            if( this.state.cursos.data !== 0){
                await axios
                .post(ApiUrl+"matriculas",{
                    tipo_matricula_id:this.state.tipoMatricula,
                    estado_matricula_id:this.state.estadoMatricula,
                    periodo_academico_id:this.state.periodosId,
                    curso_id:this.state.cursoMatricularse,
                    fecha_matricula:fecha_matricula,
                    costo_matricula:this.state.costoMatricula,
                    estudiante_id:cookie.get("idEstudiante")
    
                }).then(response => {
                    console.log(response)
                    this.setState({estado:"Su matrícula ha sido enviada para revisión"});
    
                
                })
                .catch(error => {
                    console.log(error);
                    this.setState({estado:"Error No se pudo conectar con el servidor"});
    
                })  

            }else{
                this.setState({estado:"No se ha seleccionado una horario válido"});


            }

           
        }*/
                  
        
    }


    render() {

        

        return (
                
        <div className="row animate__animated animate__fadeIn" >
            <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item active">{this.state.mostrarTexto}</li>
            </ol>



            <div className="card shadow p-3 mb-5 bg-white rounded" hidden={this.state.mostrar}>
                <div className="card-header back-istmas">
                <i className="far fa-sticky-note"></i>
                        <b>-Matriculas </b>
                </div>
                <div className="card-body">
                         
                    <form className="" onSubmit={this.confirmarFormulario} style={{padding:10}} id="create-course-form" >  
                        <div className="row ">                                        
                            <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Nivel en el que se va a matricular:</label>
                                    <select className="form-select" name="nivel" value={this.state.value} onChange={this.handleChange} aria-label="Default select example">
                                        <option value="undefined">Seleccione una Nivel</option>   
                                        
                                            { this.state.ciclosAcademicos.map(person => <option key={person.id_ciclo_academico} value={person.id_ciclo_academico} > { person.descripcion_ciclo_academico}</option>)}
                                                                                
                                    </select>
                                </div>
                            </div>  
                            <div className="col-12 col-sm-12  col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Carrera:</label><br/>
                                    <label  className="form-label">{this.state.carrera.descripcion_carrera}</label>
                                </div>
                            </div>  
                        </div>  


                        <div className="row ">                                        
                            <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Paralelo: </label>
                                    <select className="form-select" name="paraleloEstu" value={this.state.value} onChange={this.handleChange} aria-label="Default select example">
                                        <option value="undefined">Seleccione una Paralelo</option>
                                        
                                        
                                            { this.state.paralelo.map(person => <option key={person.id_paralelo} value={person.id_paralelo} > { person.descripcion_paralelo}</option>)}
                                            
                                        
                                    </select>
                                </div>
                            </div>  
                            <div className="col-12 col-sm-12  col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Periodo:</label><br/>
                                    <label  className="form-label">{this.state.periodos}</label>
                                </div>
                            </div>  
                        </div>   

                        <br/>

                        <div className="row ">                                        
                            <div className="col-12 col-sm-12 col-lg-11 col-xl-11 centrar" >
                                <div className="card text-center ">
                                    <div className="card-header ">
                                        ASIGNATURAS A TOMAR
                                    </div>
                                    <div className="card-body centrar " style={{width:"100%"}}>
                                        <table className="table  text-left">
                                            <thead >
                                                <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Asignatura</th>
                                                
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.cursos.map(consola=>(                                        
                                                <tr key={this.state.cursos.id_cursos}>
                                                    <td>{consola.id_cursos}</td>                                                   
                                                    <td>{consola.descripcion_asignatura}</td>                                            
                                                                                        
                                                </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        
                                    </div>
                                   
                                </div>
                            </div>  
                            
                        </div>  
                        <br/>

                        {/* escondidos */}



                        {/* fIN DE ESCONDIDOS */}
                        <div className="row ">                                        
                            <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label className="form-label">Subir Imagen del Comprobante de Pago</label>
                                    <input className="form-control" type="file" id="formFile" name="comprobante" onChange={this.handleImage} required/>
                                </div>
                            </div>  
                            <div className="col-12 col-sm-12  col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label className="form-label">Cantidad depositada</label>
                                    <input className="form-control" type="input" name="valorCancelado" onChange={this.handleChange} required placeholder="$ 0.00" />

                                </div>
                            </div>  
                        </div> 

                        <div className="row ">                                        
                            <div className="col-12 col-sm-12 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label className="form-label">Subir Documento de Compromiso</label>
                                    <input className="form-control" type="file" id="formFile" name="compromiso" onChange={this.handleCompromiso} required/>
                                </div>
                            </div>  
                            <div className="col-12 col-sm-12  col-lg-5 col-xl-5 centrar" >
                                
                            </div>  
                        </div> 

                       

                        <br/>
                        <div className="text-center">
                            <button type="submit" 
                                className="btn  back-istmas " 
                                style={{margin:"5px", width:"170px"}}
                                // onClick={e =>
                                //     window.confirm("Está seguro que desea matricularse en este nivel?") &&
                                //     this.matricularEstudiante(e)
                                // }                            
                                  
                            > 
                                <b>Aceptar Matrícula</b>
                            </button>
                            <Link to="/login">
                                <button type="" className="btn  back-istmas "style={{margin:"5px", width:"170px"}}  ><b>Cancelar </b></button>
                            </Link>
                        
                        </div>
                    </form>  
                     
                        <div className="alert alert-warning" role="alert" hidden={this.state.hidden}>
                            {this.state.estado} 
                        </div>       
                </div>
            </div> 

        </div>
        
        )
    }
}
