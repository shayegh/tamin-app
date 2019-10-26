import React, {Component} from 'react';
import {Button, Form, Input} from "antd";
import {Link} from "react-router-dom";
import './Supervision.css';
const FormItem = Form.Item;

class NewSup extends Component {
  render() {
    return (
        <div className="supervision-container">
          <h1 className="page-title">Sign Up</h1>
          <div className="supervision-content">
            <Form onSubmit={this.handleSubmit} className="supervision-form">
              <FormItem
                  label="Full Name"
                  validateStatus={this.state.name.validateStatus}
                  help={this.state.name.errorMsg}>
                <Input
                    size="large"
                    name="name"
                    autoComplete="off"
                    placeholder="Your full name"
                    value={this.state.name.value}
                    onChange={(event) => this.handleInputChange(event, this.validateName)} />
              </FormItem>
              <FormItem label="Username"
                        hasFeedback
                        validateStatus={this.state.username.validateStatus}
                        help={this.state.username.errorMsg}>
                <Input
                    size="large"
                    name="username"
                    autoComplete="off"
                    placeholder="A unique username"
                    value={this.state.username.value}
                    onBlur={this.validateUsernameAvailability}
                    onChange={(event) => this.handleInputChange(event, this.validateUsername)} />
              </FormItem>
              <FormItem
                  label="Email"
                  hasFeedback
                  validateStatus={this.state.email.validateStatus}
                  help={this.state.email.errorMsg}>
                <Input
                    size="large"
                    name="email"
                    type="email"
                    autoComplete="off"
                    placeholder="Your email"
                    value={this.state.email.value}
                    onBlur={this.validateEmailAvailability}
                    onChange={(event) => this.handleInputChange(event, this.validateEmail)} />
              </FormItem>
              <FormItem
                  label="Password"
                  validateStatus={this.state.password.validateStatus}
                  help={this.state.password.errorMsg}>
                <Input
                    size="large"
                    name="password"
                    type="password"
                    autoComplete="off"
                    placeholder="A password between 6 to 20 characters"
                    value={this.state.password.value}
                    onChange={(event) => this.handleInputChange(event, this.validatePassword)} />
              </FormItem>
              <FormItem>
                <Button type="primary"
                        htmlType="submit"
                        size="large"
                        className="signup-form-button"
                        disabled={this.isFormInvalid()}>Sign up</Button>
                Already registed? <Link to="/login">Login now!</Link>
              </FormItem>
            </Form>
          </div>
        </div>
    )
  }
}

export default NewSup;