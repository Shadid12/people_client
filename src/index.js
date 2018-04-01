import React, { Component } from 'react';
import { render } from 'react-dom';

import Home from './Home';

class App extends Component {

    render() {
      return (
        <div>
          <Home />
        </div>
      );
    }
}

render(<App />, document.getElementById('root'));