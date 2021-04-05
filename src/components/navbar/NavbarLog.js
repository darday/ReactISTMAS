import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export const NavbarLog = () => {
    return (
        <div>
            {/* <nav className="navbar navbar-color ">
                <div className="container-fluid">
                    <Link to="/">
                        <div className="navbar-brand" href="#">                  
                         <img src={"./assets/img/logoITSMAS.png"} alt="" width="50%" height="auto" className="navbar-img" />
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
            </nav> */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{position:"fixed", width:"100%", zIndex:"1000" }}>
        <Link to="/">
            <div className="navbar-brand" href="#">
                <img src={"./assets/img/logoITSMAS.png"} width="200vw" height="auto" className="d-inline-block align-top" alt=""/>
                
            </div>
        </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                
                </ul>
                
                
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
