import axios from 'axios';
import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import { Footer } from '../footer/Footer';
import { NavbarLog } from '../navbar/NavbarLog'
import "../services/ApiRest"

import './CarrerasScreen.css';
import { ApiUrl } from '../services/ApiRest';

const baseUrl= ApiUrl + "listarcarreras";
const cookies = new Cookies();

export default class CarrerasScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {    
            carrera:[]       
        };
    
        this.handleChange = this.handleChange.bind(this);
        
    }

 

    handleChange = async(e)=> {
        await this.setState({[e.target.name]: e.target.value});
        var idCarrera = this.state.idCarrera;
        cookies.set('idCarrera', idCarrera,{path:"/"});
       // console.log(idCarrera);

        //cookies.set('id',dato.id,{path:"/"})
        window.location.href="/carrera";
       //console.log(this.state.idCarrera);
        
    }  

   componentDidMount() {
    axios.get(baseUrl   )
      .then(res => {
        const carrera = res.data;
        this.setState({ carrera });
       
      })
    }

    render() {
       
        return (
            <div className="Login-component">
                <NavbarLog/>
                
                <div className="container ">                    
                        <div className="row ">
                            <div className= "carrera-select   col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 color-istmas">
                                <div className="card shadow p-3 mb-5 bg-white rounded">
                                    <div className="card-header text-center">
                                        <h4>CARRERAS ISTMAS</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <label  className="form-label">Seleccione una carrera</label>
                                                <select className="form-select" name="idCarrera" value={this.state.value} onChange={this.handleChange} aria-label="Default select example">
                                                    <option value="undefined">Seleccione una carrera</option>
                                                   
                                                    
                                                     { this.state.carrera.map(person => <option key={person.id_carrera} value={person.id_carrera} > { person.descripcion_carrera}</option>)}
                                                       
                                                 
                                                </select>
                                        </div>
                                      
                                    </div>
                                </div>                                                          
                            </div>

                            <div className=" col col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
                                <div className="">
                                    <img src={"./assets/img/Presencial-Software.jpg"}  className="img-login rounded " width="100%" height="auto" />
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <Footer />
            </div>
        )
    }
}
