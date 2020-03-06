import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../compomentes/card';
import FormGroup from '../../compomentes/form-group';
import SelectMenu from '../../compomentes/selectMenu';
import LancamentoTable from './lancamentoTable';
import LancamentoService from '../../app/service/lancamentoServices';
import LocalStorageService from '../../app/service/localstorageService';
import * as mensagens from '../../compomentes/toast'

class ConsultaLancamentos extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: []
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    buscar = () => {
         if(!this.state.ano){
             mensagens.mensagemErro('O preenchimento do campo Ano é obrigatorio.')
             return false;
         }

      const usuarioLogado = LocalStorageService.obterItem('_usuario_logado') ;
      console.log(usuarioLogado.id);


      const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: 1 
    
        }

        console.log(lancamentoFiltro);

        this.service
            .consultar(lancamentoFiltro)
            .then( resposta =>{
                this.setState({lancamentos : resposta.data})
            }).catch(error =>{
                console.log(error)
            })
    }

    editar = (lacamento) =>{
        console.log('Editando o lacamento', lacamento.id);
    }

    deletar = (lancamento) =>{
        console.log('Deletando o lacamento', lancamento.id);
        this.service
            .deletar(lancamento.id)
            .then(response =>{
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento);
                lancamentos.splice(index,1);
                this.setState(lancamentos); 
              
                mensagens.mensagemSucesso('Lancamento deletado com sucesso!');
            }).catch(error =>{
                mensagens.mensagemErro('Ocorreu um erro ao tentar deletar um lançamento')
            })
    }

    render() {

        const meses = this.service.obterListaMeses();
        const tipos = this.service.ObterTipoLancamento();
        
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

                            <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                            <button type="button" className="btn btn-danger">Cadastrar</button>

                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentoTable lancamentos={this.state.lancamentos}  
                                             deleteAction = {this.deletar}
                                             editAction = {this.editar}
                                             />
                        </div>
                    </div>
                </div>

            </Card>
        )
    }


}

export default withRouter(ConsultaLancamentos);

