import React from 'react'

export const IngresarCalificaciones = () => {
    console.log("estoy aqui ");
    return (
        <div className="row animate__animated animate__fadeIn">
            <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item active">{}</li>
            </ol>


            <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-header back-istmas">
                    <i className="fas fa-hospital-user"></i>       
                        <b>-Agregar Calificaciones </b>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3 ">                        
                            <label for="exampleFormControlSelect1">Seleccionar  Carrera:</label>
                            <select className="form-select" id="exampleFormControlSelect1">
                                <option selected>Seleccionar Carrera</option>                                
                            </select>                                   
                        </div>

                        <div className="col-md-3 ">
                            <label for="exampleFormControlSelect1">Seleccionar Nivel:</label>
                            <select className="form-select" id="exampleFormControlSelect1">
                                <option selected>Seleccionar Nivel</option>                                
                            </select>
                        </div>
                        
                        <div className="col-md-3 ">
                            <label for="exampleFormControlSelect1">Seleccionar  Asignatura:</label>
                            <select className="form-select" id="exampleFormControlSelect1">
                                <option selected>Seleccionar Asignatura</option>                                
                            </select>
                        </div>

                        <div className="col-md-3 ">
                            <label for="exampleFormControlSelect1">Seleccionar Paralelo:</label>
                            <select className="form-select" id="exampleFormControlSelect1">
                                <option selected>Seleccionar Paralelo</option>                                
                            </select>
                        </div>
                    </div>
                    
                          
                </div>
            </div> 

        </div>
    )
}
