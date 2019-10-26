import React, {Component} from 'react';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Button} from "primereact/button";

export default class TestPrime extends Component {
  constructor() {
    super();
    this.state = {count: 0};
  }

  increment = () => {
    this.setState({count: this.state.count + 1});
  };

  render() {
    return (
        <div className="App">
          <div className="App-intro">
            <Button label="Click" icon="pi pi-check" onClick={this.increment} />

            <p>Number of Clicks: {this.state.count}</p>
          </div>
        </div>
    );
  }
}
