import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavbarLog } from '../navbar/NavbarLog';
import { Footer } from '../footer/Footer';
import { ApiUrl } from '../services/ApiRest';


import './CarrerasScreen.css';
import Cookies from 'universal-cookie/es6';

const baseUrl= ApiUrl + "listarcarreras";
const cookies = new Cookies();


export const CarrerasScreen = () => {

    
    const [data, setdata] = useState([]);

    const handleChange = (e)=>{
        const {name, value} = e.target;
       
        var idCarrera = value;
        cookies.set('idCarrera', idCarrera,{path:"/"});
        window.location.href="/carrera";
        // console.log(name);
        // console.log(value);
    }

    useEffect(() => {
        axios.get(baseUrl)
        .then(res=>{
            setdata(res.data);
            console.log(data);
        });
    
    }, []);


    return (
        <div className="Login-component colorb "  >
            <NavbarLog/>                
                <div className="container " style={{ width:"90%" ,height:"100vh"}}>                    
                    <div className="row ">
                        <div className= "carrera-select   col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 color-istmas">
                            <div className="card shadow p-3 mb-5 bg-white rounded animate__animated animate__fadeInLeft">
                                <div className="card-header text-center">
                                    <h4>CARRERAS ISTMAS</h4>
                                </div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label  className="form-label">Seleccione una carrera</label>
                                            <select className="form-select" name="idCarrera"  onChange={handleChange} aria-label="Default select example">
                                                <option value="undefined">Seleccione una carrera</option>
                                                
                                                
                                                    { data.map(person => <option key={person.id_carrera} value={person.id_carrera} > { person.descripcion_carrera}</option>)}
                                                    
                                                
                                            </select>
                                    </div>
                                    
                                </div>
                            </div>                                                          
                        </div>

                        {/* <div className=" col col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
                                <img src={"./assets/img/Presencial-Software.jpg"}  className="img-login rounded " width="100%" height="auto" />
                        </div> */}
                    </div>
                    
                </div>
            <Footer />
        </div>
    )
}
