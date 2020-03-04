import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../compomentes/card';
import FormGroup from '../../compomentes/form-group';
import SelectMenu from '../../compomentes/selectMenu';
import LancamentoTable from './lancamentoTable';


class ConsultaLancamentos extends React.Component {

    render() {

        const meses = [
            { label: 'Selecione..', value: '' },
            { label: 'Janeiro', value: 1 },
            { label: 'Fevereiro', value: 2 },
            { label: 'Março', value: 3 },
            { label: 'Abril', value: 4 },
            { label: 'Maio', value: 5 },
            { label: 'Junho', value: 6 },
            { label: 'Julho', value: 7 },
            { label: 'Agosto', value: 8 },
            { label: 'Setembro', value: 9 },
            { label: 'Outubro', value: 10 },
            { label: 'Novembro', value: 11 },
            { label: 'Dezembro', value: 12 }
        ]

        const tipos = [
            { label: 'Selecione..', value: '' },
            { label: 'Despesa', value: 'DESPESA' },
            { label: 'Receita', value: 'RECEITA' },
        ]

       const lancamentos = [
           {   descricao:'salario' , valor: 8000 , mes: 1, tipo:'Receita', status:'Efetivado'},
           {  descricao:'Extra' , valor: 5900 , mes: 1, tipo:'Receita', status:'Efetivado'}
       ]

        return (
            <Card title="Consulta Lançamentos" >
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text"
                                    className="form-control"
                                    id="inputAno"
                                    aria-describedby="emailHelp"
                                    placeholder="Digite o Ano" />

                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Mês: *">
                                <SelectMenu id="inputMes" className="form-control" lista={meses} />
                            </FormGroup>

                            <FormGroup htmlFor="inputTipo" label="Tipo Lancamento: *">
                                <SelectMenu id="inputTipo" className="form-control" lista={tipos} />
                            </FormGroup>

                            <button type="button" className="btn btn-success">Buscar</button>
                            <button type="button" className="btn btn-danger">Cadastrar</button>

                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentoTable lancamentos={lancamentos} />
                        </div>
                    </div>
                </div>

            </Card>
        )
    }


}

export default withRouter(ConsultaLancamentos);

