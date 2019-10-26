import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import TestAntd from "./testAntd";
import TestMui from "./testMUI";
import TestPrime from "./testPrime";

ReactDOM.render(
    <Router>
        <TestAntd />
    </Router>,
    document.getElementById('root')
);
// ReactDOM.render(
//     <TestPrime/>,
//     document.getElementById('root')
// );
registerServiceWorker();
