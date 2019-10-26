import React, { Component } from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';
import {Button, Result} from 'antd';

class NotFound extends Component {
    render() {
        return (
            <div className="page-not-found">
              <Result
                  status="404"
                  title="404"
                  subTitle="Sorry, the page you visited does not exist."
                  extra={ <Link to="/"><Button className="go-back-btn" type="primary" size="large">Go Back</Button></Link>}
              />
            </div>
        );
    }
}

export default NotFound;