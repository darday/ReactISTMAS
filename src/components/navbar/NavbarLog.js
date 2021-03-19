import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export const NavbarLog = () => {
    return (
        <div>
            <nav className="navbar navbar-color ">
                <div className="container-fluid">
                    <Link to="/">
                        <div className="navbar-brand" href="#">                  
                         <img src={"./assets/img/logoITSMAS.png"} alt="" width="60%" height="auto" className="navbar-img" />
                        </div>
                    </Link>
                    <div className="d-flex">
                        <Link to="/">
                            <button type="button" className="btn "><b>Carreras</b></button>
                        </Link>
                        <Link to="/login">
                            <button type="button" className="btn btn-outline-dark"><b>Iniciar Sesión</b></button>
                        </Link>
                        
                    </div>

                    
                </div>
            </nav>
                        
        </div>
    )
}
