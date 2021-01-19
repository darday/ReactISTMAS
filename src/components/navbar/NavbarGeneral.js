import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavbarGeneral extends Component {
    render() {
        return (
            
                <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark ">
                    <Link to="/"> <a className="navbar-brand" href="index.html"> ISTMAS</a></Link>
                    <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"><i className="fas fa-bars"></i></button>
                    {/* <!-- Navbar Search--> */}
                    <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                        <div className="input-group">
                            <input className="form-control" type="text" placeholder="Buscar..." aria-label="Search" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button"><i className="fas fa-search"></i></button>
                            </div>
                        </div>
                    </form>
                    {/* <!-- Navbar--> */}
                    <ul className="navbar-nav ml-auto ml-md-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-user fa-fw"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                <a className="dropdown-item" href="#">Editar Información</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="login.html">Salir</a>
                            </div>
                        </li>
                    </ul>
                </nav>

                
                
            
        )
    }
}
