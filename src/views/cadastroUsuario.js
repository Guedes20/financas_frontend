import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';
import App from '../main/App';
import Card from '../compomentes/card';
import FormGroup from '../compomentes/form-group';

class CadastroUsuario extends React.Component {
    
    state = {
        nome :'',
        email :'',
        senha :'',
        senhaRepeticao :''
    }

cadastrar = () =>{
   console.log(this.state);
}

    render() {
        return (

                <Card title="Cadastro de Usuario"> 
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                          <FormGroup label="Nome : *" htmFor="inputNome">
                                 <input  type = "text" 
                                         id = "inputNome" 
                                         nome="nome"
                                         className ="form-control"
                                         onChange={e => this.setState({nome : e.target.value})} /> 
                          </FormGroup>
                          
                          <FormGroup label="Email : *" htmFor="inputEmail">
                                 <input  type = "email" 
                                         id = "inputEmail" 
                                         nome="email"
                                         className ="form-control"
                                         onChange={e => this.setState({email : e.target.value})} /> 
                          </FormGroup>
                        
                          <FormGroup label="Senha : *" htmFor="inputSenha">
                                 <input  type = "password" 
                                         id = "inputSenha" 
                                         nome="senha"
                                         className ="form-control"
                                         onChange={e => this.setState({senha : e.target.value})} /> 
                          </FormGroup>

                          <FormGroup label="Repita a Senha : *" htmFor="inputRepitaSenha">
                                 <input  type = "password" 
                                         id = "inputRepitaSenha" 
                                         nome="repitaSenha"
                                         className ="form-control"
                                         onChange={e => this.setState({senhaRepeticao : e.target.value})} /> 
                          </FormGroup>

                          <button onClick={this.cadastrar} className="btn btn-success">Salvar</button>
                          <button className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
           </Card>
    
        )
    }
}

export default CadastroUsuario;