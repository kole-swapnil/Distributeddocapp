import React, { Component } from "react";
import Main from './Components/MainComponent';
import {HashRouter} from 'react-router-dom';
class App extends Component {

  render() {
    return (
      <HashRouter>
      <div className="App">
        <Main />
      </div>
      </HashRouter>
    );
  }
}

export default App;
