import React from 'react';
import Card from '../../compomentes/card';
import FormGroup from '../../compomentes/form-group';
import { withRouter } from 'react-router-dom';
import SelectMenu from '../../compomentes/selectMenu';
import LancamentoService from '../../app/service/lancamentoServices';
import * as mensagens from '../../compomentes/toast';
import LocalStorageService from '../../app/service/localstorageService';


class CadastroLancamentos extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor:'',
        mes: '',
        ano: '',
        tipo: '',
        status: ''
    }


    constructor() {
        super();
        this.service = new LancamentoService();
    }

    submit = ()=> {
     
       const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');  
       const{descricao, valor, mes, ano, tipo} = this.state;

       const lancamento = {
           descricao, 
           valor, 
           mes, 
           ano, 
           tipo,
           usuario: 1
        };

       this.service.salvar(lancamento)
                   .then(response =>{
                       this.props.history.push('/consulta-lancamentos');
                    mensagens.mensagemSucesso('Lancamento cadastrado com sucesso!');
                   }).catch(error =>{
                       mensagens.mensagemErro(error.response.data);
                   })
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({[name] : value})
    }

    render() {
        const tipos = this.service.obterTipoLancamento();
        const meses = this.service.obterListaMeses();

        return (

            <Card title="Cadastro de Lançamentos" >
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao"
                            label="Descrição: *" >
                            <input id="inputDescricao" 
                                   type="text" 
                                   className="form-control" 
                                   name="descricao" 
                                   value={this.state.descricao}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *" >
                            <input id="inputAno" 
                                   type="text" 
                                   className="form-control" 
                                   name="ano"
                                   value={this.state.ano}
                                   onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *" >
                            <SelectMenu id="inputMes" 
                                        lista={meses} 
                                        className="form-control"
                                        value={this.state.mes} 
                                        name="mes"
                                        onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *" >
                            <input id="inputValor"
                                   type="text"
                                   className="form-control" 
                               name= "valor"
                               value={this.state.valor}
                               onChange ={this.handleChange} 
                               />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *" >
                            <SelectMenu id="inputTipo" 
                                        lista={tipos} 
                                        className="form-control" 
                                        name= "tipo"
                                        value={this.state.tipo}
                                        onChange ={this.handleChange} 
                                        />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="inputStaus" label="Status: " >
                            <input type="text" 
                                   className="form-control" 
                                   name= "status"
                                   value={this.state.status}
                                   disabled />
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <button type="button" onClick={this.submit}
                        className="btn btn-success">Salvar</button>
                    <button type="button"
                        className="btn btn-danger"
                        onClick={e => this.props.history.push('/consulta-lancamentos')}>Cancelar</button>

                </div>

            </Card>


        )
    }

}

export default withRouter(CadastroLancamentos);