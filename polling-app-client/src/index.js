import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import TestForm from "./TestForm";

ReactDOM.render(
    <Router>
        <TestForm />
    </Router>,
    document.getElementById('root')
);
// ReactDOM.render(
//     <TestPrime/>,
//     document.getElementById('root')
// );
registerServiceWorker();
