import React, {Component} from 'react';
import {login} from '../../util/APIUtils';
import './Login.css';
import {Link} from 'react-router-dom';
import {ACCESS_TOKEN} from '../../constants';
import {toast} from 'react-toastify';
import {Button, Form, Icon, Input} from 'antd';

const FormItem = Form.Item;

class Login extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm);
        return (
            <div className="login-container">
                <h1 className="page-title">ورود به سیستم</h1>
                <div className="login-content">
                    <AntWrappedLoginForm onLogin={this.props.onLogin} />
                </div>
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();   
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                .then(response => {
                    console.log('Login Response :',response);
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    this.props.onLogin(response.roles);
                }).catch(error => {
                    if(error.status === 401) {
                        toast.error( 'نام کاربری یا کلمه عبور اشتباه می باشد، مجددا تلاش نمایید.');
                    } else {
                        toast.error(error.message || 'Sorry! Something went wrong. Please try again!');
                    }
                });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('usernameOrEmail', {
                        rules: [{ required: true, message: 'نام کاربری خود را وارد نمایید!' }],
                    })(
                    <Input 
                        prefix={<Icon type="user" />}
                        size="large"
                        name="usernameOrEmail" 
                        placeholder="نام کاربری" />
                    )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'پسورد را وارد نمایید' }],
                })(
                    <Input 
                        prefix={<Icon type="lock" />}
                        size="large"
                        name="password" 
                        type="password" 
                        placeholder="کلمه عبور"  />
                )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">ورود</Button>
                    یا <Link to="/signup">ثبت نام!</Link>
                </FormItem>
            </Form>
        );
    }
}


export default Login;