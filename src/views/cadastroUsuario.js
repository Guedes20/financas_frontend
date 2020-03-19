import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';
import App from '../main/App';
import Card from '../compomentes/card';
import FormGroup from '../compomentes/form-group';
import { withRouter } from 'react-router-dom';
import UsuarioService from '../app/service/usuarioService'
import { mensagemSucesso, mensagemErro } from '../compomentes/toast'


class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }


    cadastrar = () => {
        const { nome, email, senha , senhaRepeticao} = this.state;
        const usuario = { nome, email, senha, senhaRepeticao }

        try{
           this.service.validar(usuario);
        }catch(erros){
            const msg = erros.mensagens;
             msg.forEach(msg => mensagemErro(msg));
            return false; 
        }

        this.service.salvar(usuario).then(response => {
            mensagemSucesso('Usuario cadastrado com sucesso!');
            this.props.history.push('/login');
        }).catch(error => {
            mensagemErro(error.response.data)
        })
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render() {
        return (

            <Card title="Cadastro de Usuario">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome : *" htmFor="inputNome">
                                <input type="text"
                                    id="inputNome"
                                    nome="nome"
                                    className="form-control"
                                    onChange={e => this.setState({ nome: e.target.value })} />
                            </FormGroup>

                            <FormGroup label="Email : *" htmFor="inputEmail">
                                <input type="email"
                                    id="inputEmail"
                                    nome="email"
                                    className="form-control"
                                    onChange={e => this.setState({ email: e.target.value })} />
                            </FormGroup>

                            <FormGroup label="Senha : *" htmFor="inputSenha">
                                <input type="password"
                                    id="inputSenha"
                                    nome="senha"
                                    className="form-control"
                                    onChange={e => this.setState({ senha: e.target.value })} />
                            </FormGroup>

                            <FormGroup label="Repita a Senha : *" htmFor="inputRepitaSenha">
                                <input type="password"
                                    id="inputRepitaSenha"
                                    nome="repitaSenha"
                                    className="form-control"
                                    onChange={e => this.setState({ senhaRepeticao: e.target.value })} />
                            </FormGroup>

                            <button onClick={this.cadastrar} 
                                    className="btn btn-success">
                                    <i className="pi pi-save"></i>   Salvar</button>
                            <button onClick={this.cancelar} 
                                    className="btn btn-danger">
                               <i className="pi pi-times"></i> Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>

        )
    }
}

export default withRouter(CadastroUsuario);