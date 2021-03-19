import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../../services/ApiRest"
import { ApiUrl } from '../../services/ApiRest';

export const ListarDocentes = () => {

    // const baseUrl= ApiUrl+"user-list"; 
    // const [data, setdata] = useState([]);

    //     const peticionGet=async()=>{
    //         await axios.get(baseUrl).
    //         then(response=>{
    //             setdata(response.data);
    //             console.log(response.data);
    //         })
    //     }
        
    //     useEffect(async () => {
    //         await peticionGet();
        
    //     }, []);
        


    return (
     
    <div className="row animate__animated animate__fadeIn">
            
            {/* <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-table mr-1"></i>
                        Lista de Docentes
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered"   width="100%" >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Email</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Full Name</th>
                                        <th>Phone</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                               
                                <tbody>
                                    {data.map(consola=>(                                        
                                        <tr key={consola.id}>
                                            <td>{consola.id}</td>
                                            <td>{consola.email}</td>
                                            <td>{consola.first_name}</td>
                                            <td>{consola.last_name}</td>
                                            <td>{consola.full_name}</td>
                                            <td>{consola.phone}</td>                                            
                                            <td className="" style={{textAlign:"center"}}> 
                                                <i className=" puntero fas fa-trash-alt" ></i>                                               
                                                <span> - </span>
                                                <i className="puntero fas fa-pen"  ></i>
                                            </td>                                            
                                        </tr>
                                    ))}
                                   
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> */}

    </div>

    )
}
