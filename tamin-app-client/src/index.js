import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import TestForm from "./TestForm";
import App from "./app/App";

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);
// ReactDOM.render(
//     <TestForm/>,
//     document.getElementById('root')
// );
registerServiceWorker();