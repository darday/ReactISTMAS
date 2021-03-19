import axios from 'axios'
import React, { Component } from 'react'
import { ApiUrl } from '../../services/ApiRest';

const url=ApiUrl+("api/user-signup");
export default class AgregarDocente extends Component {
    constructor(props) {
		super(props)

		this.state = {
			first_name: '',
			last_name: '',
			Full_name: '',
			email: '',
			phone: '',
            password: '',
            password_confirm: '',
            estado:''
		}
    }
    
    handleChange = async (e)=>{
        await this.setState({ [e.target.name]: e.target.value })
        this.setState({estado:""});
    }
    
    

    agregarDocentePost = async (e)=>{
        e.preventDefault();
        console.log(this.state)
        if(this.state.password === this.state.password_confirm){
            await axios
			.post(url, {name: this.state.first_name, email: this.state.email, password: this.state.password, phone: this.state.phone})
			.then(response => {
                console.log(response)
                
                if(response.data.success === true){
                    this.setState({estado: response.data.message});
                    e.target.reset(); //resetea valores del formulario
                }else{
                    this.setState({estado: response.data.message});
                }
			})
			.catch(error => {
                console.log(error);
                this.setState({estado:"Error No se pudo conectar con el servidor"});

            })            
            
        }else{
            this.setState({estado:"Las contraseñas no coinciden"});           
        }
		

      
        
       
       
            
    }



    
      


    render() {
        return (
        <div className="row animate__animated animate__fadeIn">
            <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item active">{this.state.estado}</li>
            </ol>


            <div className="card shadow p-3 mb-5 bg-white rounded">
                <div className="card-header">
                    <i className="fas fa-graduation-cap"></i>
                     Agregar Docente  
                </div>
                <div className="card-body">
                    <form className="" onSubmit={this.agregarDocentePost} style={{padding:10}} id="create-course-form" >   
                        <div className="row">
                            
                            <div className="col-12 col-sm-12 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Nombres Completos:</label>
                                    <input type="text" name="first_name"  onChange={this.handleChange} className="form-control"  placeholder="Nombres" required/>
                                </div>
                            </div>  
                            <div className="col-12 col-sm-12  col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Apellidos Completos:</label>
                                    <input type="text" name="last_name"  onChange={this.handleChange} className="form-control"  placeholder="Apellidos" required/>
                                </div>
                            </div>  
                        </div>    

                      
                         <div className="row">
                            <div className="col-12 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Correo Electrónico:</label>
                                    <input type="email" name="email"  onChange={this.handleChange} className="form-control" placeholder="Email" required/>
                                </div>
                            </div>  
                            <div className="col-12 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Fecha de Nacimiento:</label>
                                    <input type="date" name="full_name"  onChange={this.handleChange} className="form-control" required/>
                                </div>
                            </div>  
                        </div>    

                        <div className="row">
                            <div className="col-12 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Contraseña:</label>
                                    <input type="password" name="password" id="password"  onChange={this.handleChange}   className="form-control" placeholder="Password"   required />
                                    <div id="emailHelp" className="form-text "  ></div>
                                  

                                </div>
                            </div>  
                            <div className="col-12 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Confirmar Contraseña:</label>
                                    <input type="password" name="password_confirm" id="passwordConfirm" onChange={this.handleChange} className="form-control" placeholder="Password"   required />
                                </div>
                            </div>  
                        </div>  
                                                         

                        <div className="row">
                           
                            <div className="col-12 col-lg-5 col-xl-5" >
                                <div className="mb-3">
                                    <label  className="form-label">Teléfono Celular:</label>
                                    <input type="number" name="phone" onChange={this.handleChange} className="form-control"  placeholder="Teléfono" maxLength="9" required />
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
