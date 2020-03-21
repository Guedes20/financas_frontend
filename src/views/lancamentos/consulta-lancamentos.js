import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../compomentes/card';
import FormGroup from '../../compomentes/form-group';
import SelectMenu from '../../compomentes/selectMenu';
import LancamentoTable from './lancamentoTable';
import LancamentoService from '../../app/service/lancamentoServices';
import LocalStorageService from '../../app/service/localstorageService';
import * as mensagens from '../../compomentes/toast'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import AuthService, { USUARIO_LOGADO } from '../../app/service/authService';


class ConsultaLancamentos extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        lancamentos: []
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    buscar = () => {
        if (!this.state.ano) {
            mensagens.mensagemErro('O preenchimento do campo Ano é obrigatorio.')
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem(USUARIO_LOGADO);

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id

        }
        this.service
            .consultar(lancamentoFiltro)
            .then(resposta => {
                const lista = resposta.data; 
                if(lista.length < 1){
                    mensagens.mensagemAlert('Nenhum resultado encontrado.')
                }
                this.setState({ lancamentos: lista })
            }).catch(error => {
                mensagens.mensagemErro(error.response.data);
            })
    }

    editar = (lancamento) => {
       this.props.history.push(`/cadastro-lancamentos/${lancamento.id}`)
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({ showConfirmDialog: true, lancamentoDeletar: lancamento })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog: false })
    }

    deletar = () => {
        this.service.deletar(this.state.lancamentoDeletar.id)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamentoDeletar);
                lancamentos.splice(index, 1);
                this.setState({ lancamentos: lancamentos, showConfirmDialog: false });

                mensagens.mensagemSucesso('Lancamento deletado com sucesso!');
            }).catch(error => {
                mensagens.mensagemErro('Ocorreu um erro ao tentar deletar um lançamento')
            })
    }

    preparaFormularioCadastro = () =>{
          this.props.history.push('/cadastro-lancamentos');
    }

    alterarStatus = (lancamento, status) => {
       this.service.alterarStatus(lancamento.id, status).then(rensponse => {
         const lancamentos = this.state.lancamentos;
         const index = lancamentos.indexOf(lancamento);
         if(index !== -1){
             lancamento['status'] = status;
             lancamentos[index] = lancamento;
             this.setState({lancamento});
         }

        mensagens.mensagemSucesso('Status atualizado com sucesso');
       })

    }

    render() {

        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterTipoLancamento();

        const confirmDialogfooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Deletar" icon="pi pi-times" onClick={this.cancelarDelecao} className="p-button-secondary" />
            </div>
        )


        return (
            <Card title="Consulta Lançamentos" >
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text"
                                    className="form-control"
                                    id="inputAno"
                                    value={this.state.ano}
                                    onChange={e => this.setState({ ano: e.target.value })}
                                    placeholder="Digite o Ano" />

                            </FormGroup>
                            <FormGroup htmlFor="inputDesc" label="Descrição: ">
                                <input type="text"
                                    className="form-control"
                                    id="inputDesc"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({ descricao: e.target.value })}
                                    placeholder="Digite a descrição." />
                            </FormGroup>

                            <FormGroup htmlFor="inputMes" label="Mês: *">
                                <SelectMenu id="inputMes"
                                    className="form-control"
                                    lista={meses}
                                    value={this.state.mes}
                                    onChange={e => this.setState({ mes: e.target.value })}
                                />
                            </FormGroup>

                            <FormGroup htmlFor="inputTipo" label="Tipo Lancamento: *">
                                <SelectMenu id="inputTipo"
                                    className="form-control"
                                    lista={tipos}
                                    value={this.state.tipo}
                                    onChange={e => this.setState({ tipo: e.target.value })}
                                />
                            </FormGroup>
                            <button onClick={this.buscar} type="button" className="btn btn-success"> 
                                    <i className="pi pi-search"></i> Buscar</button>
                            <button onClick={this.preparaFormularioCadastro} type="button" className="btn btn-danger">
                                    <i className="pi pi-plus"></i> Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentoTable 
                                lancamentos={this.state.lancamentos}
                                deleteAction={this.abrirConfirmacao}
                                editAction={this.editar}
                                alterarStatus ={this.alterarStatus}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <Dialog header="Exluir Lançamento"
                        visible={this.state.showConfirmDialog}
                        style={{ width: '50vw' }}
                        modal={true}
                        footer={confirmDialogfooter}
                        onHide={() => this.setState({ showConfirmDialog: false })}>
                        Deseja realmente excluir este Lançamento ?
                                 </Dialog>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos);

