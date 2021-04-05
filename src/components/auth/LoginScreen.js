import React, { Component } from 'react';
import axios from 'axios';

import { Footer } from '../footer/Footer';
import { NavbarLog } from '../navbar/NavbarLog';
import './Login.css';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import "../services/ApiRest";
import { ApiUrl } from '../services/ApiRest';

import { toast } from 'react-toastify'
  import 'react-toastify/dist/ReactToastify.css';


const baseUrl=ApiUrl+"auth";
const cookies = new Cookies();





export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rol: 'Estudiante',
            ci: '',
            password:'',
            islogged:false,     //pregunta si ya ha estado logeado
            error:'',

            
        };
    
        this.handleChange = this.handleChange.bind(this);
        
      
    }



    handleChange = async(e)=> {
        await this.setState({[e.target.name]: e.target.value});
        this.setState({error:""});

        // console.log(this.state);
    }

   
      

    iniciarSesion = async(e)=>{
        e.preventDefault();
        this.setState({islogged:true}); //indica que se ha comenzado inicio de sesion
        //post q devuelve token,id del estudiante, mensaje, success
        await axios
        .post(baseUrl,{
            numero_identificacion: this.state.ci, 
            password: this.state.password, 
            rol:this.state.rol
        })
        .then(response=>{
            return (response.data); //similar a hacer response=response.data
        }).then(response =>{
             //console.log(response);
            if(response.success == true){
                toast("Iniciando Sesión", {position: toast.POSITION.TOP_LEFT});

                var logeado = this.state.islogged;
                var rol = this.state.rol;

                
                //declaracion de Cookies que van a ser usadas en todo momento
                cookies.set('log',logeado,{path:"/"})
                cookies.set('rol',rol,{path:"/"})
                cookies.set('token',response.token,{path:"/"})
               
                //eliminación de la cookie que viene de carreras
                cookies.remove('idCarrera',{path:"/"});

                //si el Rol de la Cookie es "" realiza alguna acción
                if(cookies.get('rol') === "Administrativo"){
                    //console.log(cookies.get('rol'));
                    cookies.set('idAdministrativo',response.administrativo_id,{path:"/"})
                    window.location.href="/administrativo";
                }else{
                    if(cookies.get('rol') === "Docente"){
                        //console.log(cookies.get('rol'));
                        window.location.href="/docente";
                    }else{
                        if(cookies.get('rol') === "Estudiante"){
                            //console.log(cookies.get('token'));
                            cookies.set('idEstudiante',response.estudiante_id,{path:"/"})
                            cookies.set('carreraEstudiante',response.descripcion_carrera,{path:"/"})
                            window.location.href="/estudiante";
                        }
                    }

                }
            }else{
              console.log("no llega") ;
              this.setState({error:"No se ha encontrado el usuario verifique los datos"});
              //toast.error("No se ha encontrado el usuario verifique los datos", {position: toast.POSITION.TOP_CENTER});


            }
        })
        .catch(error=>{
           // console.log ("es igual a 0");
            this.setState({error:"No se ha encontrado el usuario verifique los datos"});

        });
    }

   

    render() {
        
        if(cookies.get('log')){             
             if(cookies.get('rol') === "Administrativo"){
                return(<Redirect to="/administrativo" />);
             }else{
                if(cookies.get('rol') === "Docente"){
                    return(<Redirect to="/docente" />);
                 } else{
                    if(cookies.get('rol') === "Estudiante"){
                        return(<Redirect to="/estudiante" />);
                    }
                 } 
             }
        }
        

        return (
            
            <div className="colorb">
                <NavbarLog />
                    <div className="container" style={{width:"85%",height:"100vh"}}>
                        <div className="row ">

                            <div className= "formulario   col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 color-istmas">
                                <div className="card shadow p-3 mb-5 bg-white rounded animate__animated animate__fadeInLeft">
                                    <div className="card-header">
                                        <h4>Inicio de Sesión</h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={this.iniciarSesion} className="" style={{padding:2}}>                                        
                                        <div className="mb-3">
                                            <label  className="form-label">Tipo de Usuario</label>
                                                <select className="form-select" name="rol" value={this.state.value} onChange={this.handleChange} aria-label="Default select example">
                                                    <option value="Estudiante">Estudiante</option>
                                                    <option value="Docente">Docente</option>
                                                    <option value="Administrativo">Administrativo</option>
                                                </select>
                                        </div>
                                        <div className="mb-3">
                                            <label  className="form-label">Cédula de Identidad</label>
                                            <input type="text" name="ci" onChange={this.handleChange} className="form-control" id="exampleInputEmail1" placeholder="Cédula sin guion" maxLength="10" aria-describedby="emailHelp" required/>
                                            <div id="emailHelp" className="form-text">{this.state.error}</div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Contraseña</label>
                                            <input type="password" name="password" onChange={this.handleChange} className="form-control" id="exampleInputPassword1" required/>
                                        </div>
                                    
                                        <button type="submit"  className="btn  back-istmas"><b>Iniciar Sesión</b></button>
                                        </form>          
                                    </div>
                                </div>                                                          
                            </div>

                            {/* <div className=" col col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
                                <div className="">
                                    <img src={"./assets/img/presencial.jpg"}  className="img-login" width="100%" height="auto" />
                                </div>
                            </div> */}
                        </div>
                        
                    </div>

                    <Footer />
                    
            </div>
        )
    }
}
