import React, { Component } from 'react'

export default class VerInfoAdministrativo extends Component {

    constructor(props){
        super(props);
        this.state = {    
            padministrativo:[],
            enviarDatosObj:[]       
        };
        
    }
    render() {
        return (
            <div>
                <h1>Holaaaaaaaaas     {this.props.enviarDatos}</h1>
           
            </div>
        )
    }
}
