import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css';
import 'toastr/build/toastr.css'

import 'toastr/build/toastr.min.js'

import Rotas from './rotas';
import Navbar from '../compomentes/navbar';



class App extends React.Component {

  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          <Rotas />
        </div>
      </>
    )
  }
}


export default App;
