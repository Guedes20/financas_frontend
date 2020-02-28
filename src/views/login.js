import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';
import App from '../main/App';
import Card from '../compomentes/card';
import FormGroup from '../compomentes/form-group';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import UsuarioService from '../app/service/usuarioService';

class Login extends React.Component {

    state = {
        email: '',
        senha: '',
        mensagem: null

    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }


    entrar = () => {
         this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
         }).then( response => { 
            console.log(" Passou aqui")
            localStorage.setItem('_usuario_logado', JSON.stringify(response.data))
            this.props.history.push('/home')
        }).catch(erro => {
            console.log(erro.response.data)
            this.setState({mensagem: erro.response.data})  
        })
    }

    prepareCasdatrar = () =>{
        this.props.history.push('/cadastro-usuario')
    }

    render() {
        return (
    
                <div className="row">
                    <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                        <div className="bs-docs-section">
                            <Card title="Login">

                            <div className="row">
                              <span>{this.state.mensagem}</span>
                            </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="bs-component">
                                            <fieldset>
                                                <FormGroup label="Email: *" htmlForm="exampleImputEmail1">
                                                    <input type="email"
                                                        value={this.state.email}
                                                        onChange={e => this.setState({ email: e.target.value })}
                                                        className="form-control"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Digite o Email" />
                                                </FormGroup>
                                                <FormGroup label="Senha: *" htmlForm="exampleInputPassword1">
                                                    <input type="password"
                                                        value={this.state.senha}
                                                        onChange={e => this.setState({ senha: e.target.value })}
                                                        className="form-control"
                                                        id="exampleInputPassword1"
                                                        placeholder="Password" />
                                                </FormGroup>
                                                <button onClick={this.entrar} className="btn btn-success">Entrar</button>
                                                <button onClick={this.prepareCasdatrar} className="btn btn-danger">Cadastrar</button>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
        
        )
    }

}

export default  withRouter  (Login);