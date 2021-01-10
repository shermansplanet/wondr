import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import './selectors.css';
import Wondermaker from './wondermaker/wondermaker.js';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
        <Wondermaker/>
    );
  }
}

render(<App />, document.getElementById('root'));
