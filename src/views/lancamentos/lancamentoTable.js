import React from 'react';


export default props => {

   const rows = props.lancamentos.map(lancamentos =>{
       return(
           <tr key={lancamentos.id}>
               <td>{lancamentos.descricao}</td>
               <td>{lancamentos.valor}</td>
               <td>{lancamentos.tipo}</td>
               <td>{lancamentos.mes}</td>
               <td>{lancamentos.status}</td>
               <td> </td>
           </tr>
       )
   })    

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}