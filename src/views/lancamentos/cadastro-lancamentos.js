import React from 'react';
import Card from '../../compomentes/card';
import FormGroup from '../../compomentes/form-group';
import { withRouter } from 'react-router-dom';
import SelectMenu from '../../compomentes/selectMenu';
import LancamentoService from '../../app/service/lancamentoServices';
import * as mensagens from '../../compomentes/toast';
import LocalStorageService from '../../app/service/localstorageService';
import AuthService, { USUARIO_LOGADO } from '../../app/service/authService';



class CadastroLancamentos extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    componentDidMount() {

        console.log(this.props)
        const params = this.props.match.params;
      //  params.id = 1;

        if (params.id) {
            this.service
                .obterPorId(5)
                .then(response => {
                    this.setState({ ...response.data, atualizando: true })
                }).catch(erros => {
                    mensagens.mensagemErro(erros.response.data);
                })
        }
    }


    atualizar = () => {
        const { descricao, valor, mes, ano, tipo, id, usuario } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, id, usuario };

        this.service.atualizar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos');
                mensagens.mensagemSucesso('Lançamento atualizado com sucesso!');
            }).catch(error => {
                mensagens.mensagemErro(error.response.data);
            })

    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem(USUARIO_LOGADO);

        const { descricao, valor, mes, ano, tipo } = this.state;
        const lancamento = {
            descricao,
            valor,
            mes,
            ano,
            tipo,
            usuario: usuarioLogado.id
        };

        try{
           this.service.validar(lancamento); 
        }catch(erro){
            const mensag = erro.mensagens;
            mensag.forEach(msg =>  mensagens.mensagemErro(msg));
            return false;
        }

        this.service.salvar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos');
                mensagens.mensagemSucesso('Lancamento cadastrado com sucesso!');
            }).catch(error => {
                mensagens.mensagemErro(error.response.data);
            })
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value })
    }

    render() {
        const tipos = this.service.obterTipoLancamento();
        const meses = this.service.obterListaMeses();

        return (

            <Card title={this.state.atualizando ? 'Atualização de Lançamentos' : 'Cadastro de Lançamentos'}   >
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao"
                            label="Descrição: *" >
                            <input id="inputDescricao"
                                type="text"
                                className="form-control"
                                name="descricao"
                                value={this.state.descricao}
                                onChange={this.handleChange} />
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
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *" >
                            <SelectMenu id="inputMes"
                                lista={meses}
                                className="form-control"
                                value={this.state.mes}
                                name="mes"
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *" >
                            <input id="inputValor"
                                type="text"
                                className="form-control"
                                name="valor"
                                value={this.state.valor}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *" >
                            <SelectMenu id="inputTipo"
                                lista={tipos}
                                className="form-control"
                                name="tipo"
                                value={this.state.tipo}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="inputStaus" label="Status: " >
                            <input type="text"
                                className="form-control"
                                name="status"
                                value={this.state.status}
                                disabled />
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    {
                        this.state.atualizando ?
                            (
                                <button type="button" onClick={this.atualizar}
                                    className="btn btn-primary">  
                                    <i className="pi pi-refresh"></i>  Atualizar</button>
                            ) : (
                                <button type="button" onClick={this.submit}
                                    className="btn btn-success">
                                     <i className="pi pi-save"></i>  Salvar</button>
                            )
                    }

                    <button type="button"
                        className="btn btn-danger"
                        onClick={e => this.props.history.push('/consulta-lancamentos')}>
                          <i className="pi pi-times"></i>  Cancelar</button>
                </div>
            </Card>


        )
    }

}

export default withRouter(CadastroLancamentos);