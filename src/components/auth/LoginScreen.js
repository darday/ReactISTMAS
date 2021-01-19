import React, { Component } from 'react';
import { Footer } from '../footer/Footer';
import { NavbarLog } from '../navbar/NavbarLog';
import './Login.css';

export default class LoginScreen extends Component {
    render() {
        return (
            <div>
                <NavbarLog />
                    <div className="container">
                        <div className="row ">

                            <div className= "formulario   col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                <div className="card shadow p-3 mb-5 bg-white rounded">
                                    <div className="card-header">
                                        <h4>Inicio de Sesión</h4>
                                    </div>
                                    <div className="card-body">
                                        <form className="" style={{padding:18}}>                                        
                                        <div className="mb-3">
                                            <label  className="form-label">Correo Electrónico</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="ejemplo@gmail.com" aria-describedby="emailHelp"/>
                                            <div id="emailHelp" className="form-text">Correo electronico o contraseña erroneos.</div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Contraseña</label>
                                            <input type="password" className="form-control" id="exampleInputPassword1"/>
                                        </div>
                                    
                                        <button type="submit" className="btn  back-istmas"><b>Iniciar Sesión</b></button>
                                        </form>          
                                    </div>
                                </div>                                                          
                            </div>

                            <div className=" col col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                <div className="">
                                    <img src={"./assets/img/presencial.jpg"}  className="img-login" width="100%" height="auto" />
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <Footer />
                    
            </div>
        )
    }
}
