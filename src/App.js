import React from 'react';
import './App.css';
import Agencies from './component/Agencies';
import 'semantic-ui-css/semantic.min.css'

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Agencies />
      </div>
    );
  }
}

export default App;
