import React, { Component } from 'react';
import logo from './logo.svg';
import Counter from './component/counter/Counter';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Counter />
    </div>
    );
  }
}

export default App;