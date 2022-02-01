import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ApiUrl } from '../../services/ApiRest';


export const EditarEstudiantesScreen = (props) => {

    const id= props.match.params.id;

    // Cookies
    const urlListarEstudiantePorId= ApiUrl+"estudiantes/";
    const carrerasUrl=ApiUrl+"listarcarreras";

    // Declaración de estados

    const [cargando, setcargando] = useState(true);
    const [data, setdata] = useState({
        id_carrera:'',
        nombres:'',
        apellidos:'',
        numero_identificacion_estudiante:'',
        fecha_nacimiento:'',
        edad:'',
        idTipoSangre:'',
        idEtnia:'',
        formacion_estu:'',
        ocupacionEstu:'',
        // tipoColegio:'',
        nombreColegio:'',
        tipoBachillerato:'',
        email:'',
        telfCelular:'',
        password:'',
        passwordConfirm:'',
        direccion:'',
        telfConvencional:''

        
    });
    const [posicionCarrera, setposicionCarrera] = useState(); 

    // const {nombres,apellidos,numero_identificacion_estudiante} = data;
    
    const [carrera, setcarrera] = useState([]);
    const [tipoSangre, settipoSangre] = useState([]);
    const [etnias, setetnias] = useState([]);
    const [formacionEstu, setformacionEstu] = useState([]);
    const [ocupaciones, setocupaciones] = useState([]);
    const [tipoColegios, settipoColegios] = useState([]);
    const [tiposBachilleratos, settiposBachilleratos] = useState([]);


    // Funciones
    const handleChange = (e)=>{
        e.preventDefault();
        setdata({...data,
            [e.target.name]:e.target.value,            
        })
       
        
    }

    const calcularEdad = (e)=>{
        e.preventDefault();
        console.log("fechaactual");
        console.log(new Date());
        console.log(data.fecha_nacimiento);
        var birthday = data.fecha_nacimiento;
        var birthday_arr = birthday.split("-");
        var birthday_date = new Date(birthday_arr[0], birthday_arr[1] - 1, birthday_arr[2]);
        var ageDifMs = Date.now() - birthday_date.getTime();
        var ageDate = new Date(ageDifMs);
        var edadA = Math.abs(ageDate.getUTCFullYear() - 1970);
        console.log("edad");
        console.log(edadA);
        setdata({... data, edad:edadA});
       
    }



    const listarEstudiantePorId = async ()  =>{
        await axios.get(urlListarEstudiantePorId+id)
        .then(response=>{
           var dataObtenida=response.data[0];
            console.log("dataObtenida")
            console.log(dataObtenida);
            console.log(dataObtenida.carreras[0].id_carrera);
            setdata({
                id_carrera:dataObtenida.carreras[0].id_carrera,
                nombres:dataObtenida.nombres_estudiante,
                apellidos:dataObtenida.apellidos_estudiante,
                numero_identificacion_estudiante:dataObtenida.numero_identificacion_estudiante,
                fecha_nacimiento:dataObtenida.fecha_nacimiento_estudiante,
                edad:dataObtenida.edad,
                idTipoSangre: dataObtenida.tipo_sangre_id,
                idEtnia:dataObtenida.etnia_id,
                formacion_estu:dataObtenida.nivel_formacion_estudiante_id,
                ocupacionEstu:dataObtenida.ocupacion_estudiante_id,
                // tipoColegio:dataObtenida.tipo_bachillerato_id,
                // nombreColegio:dataObtenida.tipo_bachillerato_id,
                tipoBachillerato:dataObtenida.tipo_bachillerato_id,
                email:dataObtenida.email_estudiante ,
                telfCelular:dataObtenida.celular_estudiante,
                direccion:dataObtenida.direccion_estudiante ,
                telfConvencional:dataObtenida.convencional_estudiante ,

            })
                        
            
            setcargando(false);
        })
        .catch (e =>{
            console.log("errorCatch")
            console.log(e)
        })
        


    }

    const listarCarreras = async () =>{
        await  axios.get(carrerasUrl   )
        .then(res => {  
            const carreraRecibida = res.data;            
            setcarrera(carreraRecibida)

            console.log("listaCarrera")
            console.log(carreraRecibida);
            for(var i=0; i<carreraRecibida.length;i++){
                if(carreraRecibida[i].id_carrera == 2){
                    console.log("Encontre:"+i+":"+carreraRecibida[i].descripcion_carrera);
                    setposicionCarrera(i);
                    console.log("esta es:"+posicionCarrera);
                }
            }

            
        })
    }



    const listarTipoSangre = async () =>{
        await axios.get(ApiUrl+"tiposangre")
        .then(res=>{
            const tipoSangre = res.data;
            // console.log(tipoSangre)
            settipoSangre(tipoSangre);
        })
    }

    const listarTipoEtnia = async () =>{
        await axios.get(ApiUrl+"etnias")
        .then(res=>{
            const etnias = res.data;
            // console.log(etnias)
            setetnias(etnias)
        })
    }

    const listarFormacionEstu = async () =>{
        await axios.get(ApiUrl+"formacion")
        .then(res=>{
            const formacion_estudiante = res.data;
            //console.log(formacion_estudiante);
            setformacionEstu(formacion_estudiante);

        })
    }

    const listarOcupaciones = async () =>{
        await axios.get(ApiUrl+"ocupaciones")
        .then(res=>{
            const ocupacion = res.data;
            setocupaciones(ocupacion);
        })
    }

    const listarTipoColegios = async () =>{
        await axios.get(ApiUrl+"colegios")
        .then(res=>{
            const colegios = res.data;
            settipoColegios(colegios);
        })
    }

    const listarTipoBachilleratos = async () =>{
        await axios.get(ApiUrl+"bachilleratos")
        .then(res=>{
            const bachilleratos = res.data;
            console.log("Bachilleratos"+bachilleratos);
            settiposBachilleratos(bachilleratos);
        })
    }



    

    useEffect(() => {
        listarCarreras();
        listarTipoSangre();
        listarTipoEtnia();
        listarFormacionEstu();
        listarOcupaciones();
        listarTipoColegios();
        listarTipoBachilleratos();

        listarEstudiantePorId();
    }, [])

    if(cargando){
        return(
            <div>
                <h5>Cargando Datos...</h5>
            </div>
        )
    }

    return (
      
        <div className="row animate__animated animate__fadeIn">
            <ol className="breadcrumb mb-4">
                            {/* <li className="breadcrumb-item active">{state.estado}</li> */}
            </ol>
            <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-header back-istmas">
                    <i className="fas fa-graduation-cap"></i>
                        <b>-Modificar Información de Estudiante </b>
                </div>
                <div className="card-body ">
                    <ol className="breadcrumb mb-4">
                        {/* <li className="breadcrumb-item active">{state.estado}</li> */}
                    </ol>
                    <div className="row ">                                        
                        <div className="col-12 col-sm-5 col-md-6 col-lg-5 col-xl-5 centrar" >
                            <div className="mb-3">
                                <label  className="form-label"><b>Carrera</b></label>
                                <select className="form-select" name="idCarrera"  aria-label="Default select example" onChange={handleChange} required> 
                                    <option value={carrera[posicionCarrera].id_carrera} >{carrera[posicionCarrera].descripcion_carrera}</option>                                                
                                    { carrera.map(person => 
                                        <option key={person.id_carrera} value={person.id_carrera} > 
                                            { person.descripcion_carrera}
                                        </option>)
                                    }                                             
                                </select>
                            </div>
                        </div>  
                        <div className="col-12 col-sm-5  col-md-6 col-lg-5 col-xl-5 centrar" >
                            <div className="mb-3">
                                
                            </div>
                        </div>  
                    </div>    
                    
                    <form className=""  style={{padding:10}} id="create-course-form" >   
                        <div className="row ">                            
                            <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Nombres Completos:</label>
                                    <input type="text" name="nombres" value={data.nombres} onChange={handleChange} className="form-control"   required/>
                                </div>
                            </div>  
                            <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Apellidos Completos:</label>
                                    <input type="text" name="apellidos" value={data.apellidos} onChange={handleChange}  className="form-control"   required/>
                                </div>
                            </div>  
                        </div>  

                        <div className="row">                                
                            <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Cédula de Identidad:</label>
                                    <input type="text" name="numero_identificacion_estudiante" value={data.numero_identificacion_estudiante || "" }  onChange={handleChange}   className="form-control" maxLength="10"  required/>
                                </div>
                            </div>  
                            <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Fecha de Nacimiento:</label>
                                    <input type="date" name="fecha_nacimiento" value={data.fecha_nacimiento}  onChange={handleChange} onBlur={calcularEdad} className="form-control" required />
                                </div>
                            </div>  
                        </div> 

                        <div className="row">
                                            
                            <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Edad:</label>
                                    <input type="number" name="edad"  onChange={handleChange}  value={data.edad}   className="form-control"  readOnly/>
                                </div>
                            </div>  
                            <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Tipo de Sangre:</label>
                                    <select className="form-select" name="idTipoSangre" value={data.idTipoSangre} onChange={handleChange} aria-label="Default select example" required> 
                                        { tipoSangre.map(sangre => 
                                            <option key={sangre.id_tipo_sangre} value={sangre.id_tipo_sangre} > 
                                                { sangre.descripcion_tipo_sangre}
                                            </option>)}                                                                                                     
                                    </select>


                                </div>
                            </div>  
                        </div>  

                        <div className="row">                                            
                            <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Etnia:</label>
                                    <select className="form-select" name="idEtnia" value={data.idEtnia} onChange={handleChange} aria-label="Default select example" required>
                                        { etnias.map(etnias => 
                                            <option key={etnias.id_etnia} value={etnias.id_etnia} > 
                                                { etnias.descripcion_etnia}
                                            </option>)
                                        }                                                                                                     
                                    </select>
                                </div>
                            </div>  

                            <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Nivel de Formación:</label>
                                    <select className="form-select" name="formacion_estu" value={data.formacion_estu} onChange={handleChange} aria-label="Default select example"required>
                                            { formacionEstu.map(fe => 
                                                <option key={fe.id_nivel_formacion} value={fe.id_nivel_formacion} > 
                                                    { fe.descripcion_nivel_formacion}
                                                </option>)
                                            }                                                                                                     
                                    </select>
                                </div>
                            </div>  
                        </div>     

                        <div className="row "  hidden={console.log("formacion"+data.formacion_estu), (data.formacion_estu == 8) ? 0 : 1}>
                            <div className="col-12 col-lg-11 col-xl-11 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Titulo Obtenido:</label>
                                    <input type="text" name="descTitAcad"  onChange={handleChange} className="form-control" placeholder="Ejemplo: Ingenieria En Sistemas" />
                                </div>
                            </div>  
                        
                        </div>   

                        <div className="row">
                                            
                            <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Ocupación:</label>
                                    <select className="form-select" name="ocupacionEstu" value={data.ocupacionEstu} onChange={handleChange} aria-label="Default select example" required>
                                            {ocupaciones.map(ocu => <option key={ocu.id_ocupacion_estudiante} value={ocu.id_ocupacion_estudiante} > { ocu.descripcion_ocupacion_estudiante}</option>)}                                                                                                     
                                    </select>


                                </div>
                            </div>  

                            <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Tipo Colegio:</label>
                                    <select className="form-select" name="tipoColegio" value={data.tipoColegio} onChange={handleChange} aria-label="Default select example" required>
                                            {/* { tipoColegios.map(cole => <option key={cole.id_tipo_colegio} value={cole.id_tipo_colegio} > { cole.descripcion_tipo_colegio}</option>)}                                                                                                      */}
                                    </select>
                                </div>
                            </div>  
                        </div>    

                        <div className="row">
                                            
                            <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Nombre del Colegio:</label>
                                    {/* <input type="text" name="nombreColegio"  onChange={handleChange}  value={state.nombreColegio}className="form-control"  required /> */}
                                </div>
                            </div>  
                            <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Tipo de Bachillerato Obtenido:</label>
                                    <select className="form-select" name="tipoBachillerato" value={data.tipoBachillerato} onChange={handleChange} aria-label="Default select example" required>
                                        <option value=""></option>                                                   
                                            { tiposBachilleratos.map(bachi => <option key={bachi.id_tipo_bachillerato} value={bachi.id_tipo_bachillerato} > { bachi.descripcion_tipo_bachillerato}</option>)}                                                                                                     
                                    </select>


                                </div>
                            </div>  
                        </div>  

                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Correo Electrónico:</label>
                                    <input type="email" name="email"  onChange={handleChange}  value={data.email} className="form-control" required />
                                </div>
                            </div>  
                            <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Teléfono Celular:</label>
                                    <input type="text" name="telfCelular"  onChange={handleChange}  value={data.telfCelular} className="form-control"   required />
                                </div>
                            </div>  
                        </div> 

                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Contraseña:</label>
                                    <input type="password" name="password" id="password"  onChange={handleChange}  value={data.password}  className="form-control"  required  />
                                    <div id="emailHelp" className="form-text "  ></div>
                                

                                </div>
                            </div>  
                            <div className="col-12 col-md-6 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Confirmar Contraseña:</label>
                                    <input type="password" name="passwordConfirm" id="passwordConfirm" onChange={handleChange}  value={data.passwordConfirm} className="form-control"  required  />
                                </div>
                            </div>  
                        </div>  

                        <div className="row">
                                        
                            <div className="col-12 col-md-6 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Dirección:</label>
                                    <input type="text" name="direccion" onChange={handleChange}  value={data.direccion} className="form-control"   required />
                                </div>
                            </div>  

                            <div className="col-12 col-sm-12  col-md-6 col-lg-5 col-xl-5 centrar" >
                                <div className="mb-3">
                                    <label  className="form-label">Teléfono Convencional:</label>
                                    <input type="text" name="telfConvencional"  onChange={handleChange}  value={data.telfConvencional} className="form-control"  required />
                                </div>
                            </div>  

                        </div>  

                        <div className="text-center ">
                            <br/> 

                            <button type="submit" className="btn  btn-outline-dark " style={{ width:"190px", margin:"5px"}}  > <b>Guardar</b></button>
                            {/* <Link to="/" >
                                <button type="button" className="btn  btn-outline-dark "style={{ width:"190px", margin:"5px" }}  ><b>Cancelar Inscripción</b></button>
                            </Link> */}
                        </div>  

                    
                         

                        

                    </form>           
                </div>
            </div> 

        </div>
    )
}
