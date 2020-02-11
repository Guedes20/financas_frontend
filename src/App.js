import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';
import Login from './views/login';
import Cadastro from './views/cadastroUsuario';
import './custom.css';

class App extends React.Component {

  render() {
    return (
      <div>
         <Cadastro></Cadastro>
      </div>
    )
  }
}

export default App;
