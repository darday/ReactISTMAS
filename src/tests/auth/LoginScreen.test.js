import React from 'react';
import {shallow} from 'enzyme';
import LoginScreen from '../../components/auth/LoginScreen';

describe('Pruebas en Login Screen (Auth)',()=>{    
    let wrapper = shallow(<LoginScreen />);
    beforeEach(()=>{
        wrapper = shallow(<LoginScreen />);
    })
    test('debe mostrar <LoginScreen Correctamente',()=>{
        expect (wrapper).toMatchSnapshot();
    })
    test('Debe de tener un select',()=>{
        const select = wrapper.find('select').text();
        expect(select).toBe('EstudianteDocenteAdministrativoContable');
    })
    test ('Debe tener un input para la CI',()=>{
        const ci = wrapper.find('#cedula').text();
        expect(ci).toBe("");
    })
    test('Debe tener un input para el password',()=>{
        const pass = wrapper.find('#password').text();
        expect(pass).toBe("");
    })
})