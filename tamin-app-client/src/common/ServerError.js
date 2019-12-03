import React, {Component} from 'react';
import './ServerError.css';
import {Link} from 'react-router-dom';
import {Button, Result} from 'antd';

class ServerError extends Component {
  render() {
    return (
        <div className="server-error-page">
          <Result
              status="500"
              title="500"
              subTitle="Sorry, the server is wrong."
              extra={<Link to="/"><Button className="server-error-go-back-btn" type="primary" size="large">Go
                Back</Button></Link>}
          />
        </div>
    );
  }
}

export default ServerError;