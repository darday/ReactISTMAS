import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../services/ApiRest';


export const EditarEstudiantesScreen = (props) => {
    const urlListarEstudiantePorId= ApiUrl+"estudiantes/";
    const carrerasUrl=ApiUrl+"listarcarreras";




    const id= props.match.params.id;

    const [cargando, setcargando] = useState(true);
    const [data, setdata] = useState({
        carrera:[],
        carrera_seleccionada:''
    })

    

    console.log(id);

    const listarEstudiantePorId = async ()  =>{
        await axios.get(urlListarEstudiantePorId+id)
        .then(response=>{
            const carreraRecibida= response.data[0];
            //console.log(dataRecibida)

            // setdata({
            //     carrera_seleccionada:carreraRecibida.carrera_id,
            // })
            

            setcargando(false);
        })
        .catch (e =>{
            console.log(e)
        })

    }

    const listarCarreras = async () =>{
        await  axios.get(carrerasUrl   )
        .then(res => {  
            const carrera = res.data;
            setdata({
                carrera:carrera,
            })
            
        })
    }

    useEffect(() => {
        listarEstudiantePorId();
        listarCarreras();
    }, [])

    if(cargando){
        return(
            <div>
                <h5>Cargando Datos...</h5>
            </div>
        )
    }

    return (
        // <div className="row animate__animated animate__fadeIn">
        //         <ol className="breadcrumb mb-4">
        //                         {/* <li className="breadcrumb-item active">{this.state.estado}</li> */}
        //         </ol>


        //         <div className="card shadow p-3 mb-5 bg-white rounded">
        //             <div className="card-header">
        //                 <i className="fas fa-graduation-cap"></i>
        //                     <b>-Inscribir Estudiantes </b>
        //             </div>
        //             <div className="card-body ">
        //                 <ol className="breadcrumb mb-4">
        //                     {/* <li className="breadcrumb-item active">{this.state.estado}</li> */}
        //                 </ol>

        //                 <div className="row ">                                        
        //                     <div className="col-12 col-sm-5 col-md-6 col-lg-5 col-xl-5 centrar" >
        //                         <div className="mb-3">
        //                             <label  className="form-label"><b>Carrera</b></label>
        //                             <select className="form-select" name="idCarrera"  aria-label="Default select example" required>
        //                                 <option value=""></option>                                               
        //                                     { data.carrera.map(person => <option key={person.id_carrera} value={person.id_carrera} > { person.descripcion_carrera}</option>)}
                                            
                                        
        //                             </select>
        //                         </div>
        //                     </div>  
        //                     <div className="col-12 col-sm-5  col-md-6 col-lg-5 col-xl-5 centrar" >
        //                         <div className="mb-3">
                                    
        //                         </div>
        //                     </div>  
        //                 </div>    
                        
        //                 {/* <form className="" onSubmit={this.inscribirEstudiante} style={{padding:10}} id="create-course-form" >   
        //                     <div className="row ">
                                
        //                         <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 centrar" >
        //                             <div className="mb-3">
        //                                 <label  className="form-label">Nombres Completos:</label>
        //                                 <input type="text" name="firstName" value={this.state.firstName}  onChange={this.handleChange} className="form-control"  required/>
        //                             </div>
        //                         </div>  
        //                         <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
        //                             <div className="mb-3">
        //                                 <label  className="form-label">Apellidos Completos:</label>
        //                                 <input type="text" name="lastName"  onChange={this.handleChange}  value={this.state.lastName} className="form-control"   required/>
        //                             </div>
        //                         </div>  
        //                     </div>    

        //                     <div className="row">
                                
        //                         <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 centrar" >
        //                             <div className="mb-3">
        //                                 <label  className="form-label">Cédula de Identidad:</label>
        //                                 <input type="text" name="ci"  onChange={this.handleChange}  value={this.state.ci} className="form-control" maxLength="10"  required/>
        //                             </div>
        //                         </div>  
        //                         <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
        //                             <div className="mb-3">
        //                                 <label  className="form-label">Fecha de Nacimiento:</label>
        //                                 <input type="date" name="fechaNaci"  onChange={this.handleChange} onBlur={this.calcularEdad} value={this.state.fechaNaci} className="form-control" required />
        //                             </div>
        //                         </div>  
        //                     </div>    

        //                     <div className="row">
                                
        //                         <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 centrar" >
        //                             <div className="mb-3">
        //                                 <label  className="form-label">Edad:</label>
        //                                 <input type="number" name="edad"  onChange={this.handleChange}  value={this.state.edad} className="form-control" maxLength="10" readOnly/>
        //                             </div>
        //                         </div>  
        //                         <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
        //                             <div className="mb-3">
        //                                 <label  className="form-label">Tipo de Sangre:</label>
        //                                 <select className="form-select" name="idTipoSangre" value={this.state.value} onChange={this.handleChange} aria-label="Default select example" required> 
        //                                     <option value=""></option>                                                   
        //                                         { this.state.tipoSangre.map(sangre => <option key={sangre.id_tipo_sangre} value={sangre.id_tipo_sangre} > { sangre.descripcion_tipo_sangre}</option>)}                                                                                                     
        //                                 </select>


        //                             </div>
        //                         </div>  
        //                     </div>    


        //                     <div className="row">
                                
        //                         <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
        //                             <div className="mb-3">
        //                                 <label  className="form-label">Etnia:</label>
        //                                 <select className="form-select" name="idetnia" value={this.state.value} onChange={this.handleChange} aria-label="Default select example" required>
        //                                     <option value=""></option>                                                   
        //                                         { this.state.etnia.map(etnias => <option key={etnias.id_etnia} value={etnias.id_etnia} > { etnias.descripcion_etnia}</option>)}                                                                                                     
        //                                 </select>


        //                             </div>
        //                         </div>  

        //                         <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 centrar" >
        //                             <div className="mb-3">
        //                                 <label  className="form-label">Nivel de Formación:</label>
        //                                 <select className="form-select" name="idFormacionEstudiante" value={this.state.value} onChange={this.handleChange} aria-label="Default select example"required>
        //                                     <option value=""></option>                                                   
        //                                         { this.state.formacionEstudiante.map(fe => <option key={fe.id_nivel_formacion} value={fe.id_nivel_formacion} > { fe.descripcion_nivel_formacion}</option>)}                                                                                                     
        //                                 </select>
        //                             </div>
        //                         </div>  
        //                     </div>  


        //                     <div className="row "  hidden={this.state.mostrarText}>
        //                         <div className="col-12 col-lg-11 col-xl-11 centrar" >
        //                             <div className="mb-3">
        //                                 <label  className="form-label">Titulo Obtenido:</label>
        //                                 <input type="text" name="descTitAcad"  onChange={this.handleChange} className="form-control" placeholder="Ejemplo: Ingenieria En Sistemas" />
        //                             </div>
        //                         </div>  
                            
        //                     </div>   



        //                     <div className="row">
                                
        //                         <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
        //                             <div className="mb-3">
        //                                 <label  className="form-label">Ocupación:</label>
        //                                 <select className="form-select" name="idOcupacion" value={this.state.value} onChange={this.handleChange} aria-label="Default select example" required>
        //                                     <option value=""></option>                                                   
        //                                         { this.state.ocupacion.map(ocu => <option key={ocu.id_ocupacion_estudiante} value={ocu.id_ocupacion_estudiante} > { ocu.descripcion_ocupacion_estudiante}</option>)}                                                                                                     
        //                                 </select>


        //                             </div>
        //                         </div>  

        //                         <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 centrar" >
        //                             <div className="mb-3">
        //                                 <label  className="form-label">Tipo Colegio:</label>
        //                                 <select className="form-select" name="idTipoColegio" value={this.state.value} onChange={this.handleChange} aria-label="Default select example" required>
        //                                     <option value=""></option>                                                   
        //                                         { this.state.colegio.map(cole => <option key={cole.id_tipo_colegio} value={cole.id_tipo_colegio} > { cole.descripcion_tipo_colegio}</option>)}                                                                                                     
        //                                 </select>
        //                             </div>
        //                         </div>  
        //                     </div>    


        //                     <div className="row">
                                
        //                         <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 centrar" >
        //                             <div className="mb-3">
        //                                 <label  className="form-label">Nombre del Colegio:</label>
        //                                 <input type="text" name="nombreColegio"  onChange={this.handleChange}  value={this.state.nombreColegio}className="form-control"  required />
        //                             </div>
        //                         </div>  
        //                         <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
        //                             <div className="mb-3">
        //                                 <label  className="form-label">Tipo de Bachillerato Obtenido:</label>
        //                                 <select className="form-select" name="idBachillerato" value={this.state.value} onChange={this.handleChange} aria-label="Default select example" required>
        //                                     <option value=""></option>                                                   
        //                                         { this.state.bachilleratos.map(bachi => <option key={bachi.id_tipo_bachillerato} value={bachi.id_tipo_bachillerato} > { bachi.descripcion_tipo_bachillerato}</option>)}                                                                                                     
        //                                 </select>


        //                             </div>
        //                         </div>  
        //                     </div>   




                        
        //                     <div className="row">
        //                         <div className="col-12 col-md-6 col-lg-5 col-xl-5 centrar" >
        //                             <div className="mb-3">
        //                                 <label  className="form-label">Correo Electrónico:</label>
        //                                 <input type="email" name="email"  onChange={this.handleChange}  value={this.state.email} className="form-control" required />
        //                             </div>
        //                         </div>  
        //                         <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
        //                             <div className="mb-3">
        //                                 <label  className="form-label">Teléfono Celular:</label>
        //                                 <input type="text" name="telfCelular"  onChange={this.handleChange}  value={this.state.telfCelular} className="form-control"   required />
        //                             </div>
        //                         </div>  
        //                     </div>    

        //                     <div className="row">
        //                         <div className="col-12 col-md-6 col-lg-5 col-xl-5 centrar" >
        //                             <div className="mb-3">
        //                                 <label  className="form-label">Contraseña:</label>
        //                                 <input type="password" name="password" id="password"  onChange={this.handleChange}  value={this.state.password}  className="form-control"  required  />
        //                                 <div id="emailHelp" className="form-text "  ></div>
                                    

        //                             </div>
        //                         </div>  
        //                         <div className="col-12 col-md-6 col-lg-5 col-xl-5 centrar" >
        //                             <div className="mb-3">
        //                                 <label  className="form-label">Confirmar Contraseña:</label>
        //                                 <input type="password" name="passwordConfirm" id="passwordConfirm" onChange={this.handleChange}  value={this.state.passwordConfirm} className="form-control" placeholder="Password"  required  />
        //                             </div>
        //                         </div>  
        //                     </div>  
                                                            

        //                     <div className="row">
                            
        //                         <div className="col-12 col-md-6 col-lg-5 col-xl-5 centrar" >
        //                             <div className="mb-3">
        //                                 <label  className="form-label">Dirección:</label>
        //                                 <input type="text" name="direccion" onChange={this.handleChange}  value={this.state.direccion} className="form-control"   required />
        //                             </div>
        //                         </div>  

        //                         <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
        //                             <div className="mb-3">
        //                                 <label  className="form-label">Teléfono Convencional:</label>
        //                                 <input type="text" name="telfConvencional"  onChange={this.handleChange}  value={this.state.telfConvencional} className="form-control"  required />
        //                             </div>
        //                         </div>  

        //                     </div>      

                            
        //                     <div className="text-center ">
        //                         <br/> 

        //                         <button type="submit" className="btn  btn-outline-dark " style={{ width:"190px", margin:"5px"}}  > <b>Enviar Formulario</b></button>
        //                         {/* <Link to="/" >
        //                             <button type="button" className="btn  btn-outline-dark "style={{ width:"190px", margin:"5px" }}  ><b>Cancelar Inscripción</b></button>
        //                         </Link> */}
        //                     {/* </div>

        //                 </form>           */} */}
        //             </div>
        //         </div> 

        //     </div>
    )
}
