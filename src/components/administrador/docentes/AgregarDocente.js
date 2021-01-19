import React, { Component } from 'react'

export default class AgregarDocente extends Component {
    render() {
        return (
            
                <div className="row animate__animated animate__fadeIn">
                    <div className="card shadow p-3 mb-5 bg-white rounded">
                            <div className="card-header">
                                <i className="fas fa-graduation-cap"></i>
                                 Agregar Docente  
                            </div>
                            <div className="card-body">
                                <form className="" style={{padding:10}}>   
                                    <div className="row">
                                        
                                        <div className="col-12 col-sm-12 col-lg-5 col-xl-5" >
                                            <div className="mb-3">
                                                <label  className="form-label">Nombres Completos:</label>
                                                <input type="text" className="form-control"  placeholder="Nombres" required/>
                                            </div>
                                        </div>  
                                        <div className="col-12 col-sm-12  col-lg-5 col-xl-5" >
                                            <div className="mb-3">
                                                <label  className="form-label">Apellidos Completos:</label>
                                                <input type="text" className="form-control"  placeholder="Apellidos" required/>
                                            </div>
                                        </div>  
                                    </div>    

                                    <div className="row">
                                        <div className="col-12 col-lg-5 col-xl-5" >
                                            <div className="mb-3">
                                                <label  className="form-label">Fecha de Nacimiento:</label>
                                                <input type="date" className="form-control" required/>
                                            </div>
                                        </div>  
                                        <div className="col-12 col-lg-5 col-xl-5" >
                                            <div className="mb-3">
                                                <label  className="form-label">Teléfono Celular:</label>
                                                <input type="number" className="form-control"  placeholder="Teléfono" maxLength="9" required />
                                            </div>
                                        </div>  
                                    </div>      

                                     <div className="row">
                                        <div className="col-12 col-lg-5 col-xl-5" >
                                            <div className="mb-3">
                                                <label  className="form-label">Correo Electrónico:</label>
                                                <input type="email" className="form-control" placeholder="Email" required/>
                                            </div>
                                        </div>  
                                        <div className="col-12 col-lg-5 col-xl-5" >
                                            <div className="mb-3">
                                                <label  className="form-label">Contraseña:</label>
                                                <input type="password" className="form-control" placeholder="Password"   required />
                                            </div>
                                        </div>  
                                    </div>                                     
                                                     
                                
                                    <button type="submit" className="btn  back-istmas"><b>Agregar Docente</b></button>
                                </form>          
                            </div>
                        </div> 

                </div>
                
            
        )
    }
}
