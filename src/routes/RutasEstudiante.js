import axios from 'axios'
import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import Cookies from 'universal-cookie'
// import Contenido from '../components/contenido/Contenido'
import Matricularme from '../components/estudiante/matriculas/Matricularme'
import EditarPerfil from '../components/estudiante/perfil/EditarPerfil'
import VerPerfil from '../components/estudiante/perfil/VerPerfil'
import FooterDashboard from '../components/footer/FooterDashboard'
import {NavbarGeneral} from '../components/navbar/NavbarGeneral'
import SidebarEstudiante from '../components/sidebar/SidebarEstudiante'
import "../components/services/ApiRest";
import { ApiUrl } from '../components/services/ApiRest'
import VerMisMatriculas from '../components/estudiante/matriculas/VerMisMatriculas'
import AgregarPago from '../components/estudiante/pagos/AgregarPago'
import AgregarPagoMatricula from '../components/estudiante/matriculas/AgregarPagoMatricula'
import EstadoMisPagosPension from '../components/estudiante/pagos/EstadoMisPagosPension'




const cookie= new Cookies();
const carreraEstudiante = cookie.get("carreraEstudiante");    //declaramos una variable para usar la cookie del login
const idEstudiante = cookie.get("idEstudiante");    //declaramos una variable para usar la cookie del login
const urlEstudiante= ApiUrl+ "estudiantes/"; //pasar id del estudiante
const urlCarrera= ApiUrl+ "carreras/"; //pasar id del estudiante

//console.log(idEstudiante);

export default class RutasEstudiante extends Component {
    constructor(props) {
        super(props);
        this.state = {
            estudiante: [],
            carrera:[],
            nombreCarrera:""
            
        };
    
        //this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    componentDidMount() {
        // Get que devuelve los datos de un estudiante recibiendo un id devuelve dos valores de un array por eso lo separamos con [0] y[1]
  
          
      /* comentada por que parece que no hace nada
       axios.get(urlCarrera+cookie.get("idCarreraEstu")   )
          .then(res => {
                //console.log("carreraaaaaaaaaaaaa");
                const nombreCarrera = res.data.descripcion_carrera;
                this.setState({nombreCarrera});
                
              

                // cookie.set('nombreCarrera',nombreCarrera,{path:"/"})
                // console.log(cookie.get("nombreCarrera")); 
            
               
          })*/

          //window.location.href = window.location.href;

          axios.get(urlEstudiante+idEstudiante   )
          .then(res => {
            const estudiante = res.data[1];
            const carrera = res.data[0];
            this.setState({ estudiante });
            this.setState({ carrera });
            // console.log(estudiante);
            // console.log(carrera[0]);
            // console.log("carrera"+ carrera[0].carrera_id);
           
            cookie.set('nombres',estudiante.nombres_estudiante,{path:"/"})
            cookie.set('apellidos',estudiante.apellidos_estudiante,{path:"/"})
            cookie.set('idCarreraEstu',carrera[0].carrera_id,{path:"/"})

            
            // console.log(cookie.get("nombres"));
            // console.log(cookie.get("apellidos")); 
            //console.log(cookie.get("idCarreraEstu")); 
         })

          


    }

    render() {
        
        //const nomCarrera=this.state.descripcion_carrera;

        

        //si no está logeado redireccionamos a login
        if(!cookie.get("log")){
            return(<Redirect to="/login" />);
        }
        //si el rol es diferente de Estudiante mandamnos a error
        if(cookie.get("rol") !== 'Estudiante'){
            return(<Redirect to="/errorpermiso" />);
        }

        return (
            <>
                <NavbarGeneral /> 
                <div id="layoutSidenav" >
                    <SidebarEstudiante />
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid">                       
                                {/* <Contenido />  */}
                                <div className="animate__animated animate__fadeIn" style={{}}>
                                    <br/>
                                    <br/>
                                    <h5 className="mt-4 "><b>Carrera de { carreraEstudiante}</b></h5>
                                </div>   
                                    <Route  path="/estudiante/EstudianteMatricula"  component={Matricularme} />                         
                                    <Route  path="/estudiante/EstudianteVerPerfil"  component={VerPerfil} />                         
                                    <Route  path="/estudiante/EditarPerfil"  component={EditarPerfil} />                         
                                   
                                    <Route  path="/estudiante/EstudianteMisMatriculas"  component={VerMisMatriculas} />   
                                    <Route  path="/estudiante/AgregarPagoMatricula" component={AgregarPagoMatricula} />   

                                    <Route path="/estudiante/EstudianteAgregarPago" component={AgregarPago}/>                      
                                    <Route path="/estudiante/EstadoMisPagosPension" component={EstadoMisPagosPension}/>                      
                                                           
                            </div>
                        </main>
                        <FooterDashboard />                        
                    </div>                 
                </div>            
            </>
        )
    }
}
