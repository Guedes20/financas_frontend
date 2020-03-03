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

    validar(){
        const msgs = [];
        
        if(!this.state.nome){
            msgs.push('O campo Nome é obrigatorio');
        }

        if(!this.state.email){
            msgs.push('O campo Email é obrigatorio');
        }else if(!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            msgs.push('Infome um Email válido.');
        }

        if(!this.state.senha || !this.state.senhaRepeticao){
            msgs.push('Digite a senha 2x.');         
        }else if(this.state.senha !== this.state.senhaRepeticao){
            msgs.push('As senhas não coincidem.');         
        }

        return msgs ;

    }

    cadastrar = () => {
        const msgs = this.validar();

        if(msgs &&  msgs.length > 0){
            msgs.forEach((msg, index) =>{
                mensagemErro(msg)
            });
            
            return false;
        }

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
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

                            <button onClick={this.cadastrar} className="btn btn-success">Salvar</button>
                            <button onClick={this.cancelar} className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>

        )
    }
}

export default withRouter(CadastroUsuario);