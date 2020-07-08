import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './app/App';
import {ConfigProvider} from 'antd';

ReactDOM.render(
    <ConfigProvider direction={'rtl'}>
        <Router>
            <App/>
        </Router>
    </ConfigProvider>,
    document.getElementById('root')
);
// ReactDOM.render(
//     <TestAntd/>,
//     document.getElementById('root')
// );
registerServiceWorker();
