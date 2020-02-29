import React from 'react';
import {Field as FormikField, Form as FormikForm, Formik} from 'formik';
import {AntInput, AntPassword} from 'common/components/CreateAntFields';
import './Login.css';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import * as yup from 'yup';
import {login} from 'util/api';
import {ACCESS_TOKEN} from '../../constants';
import {toast} from 'react-toastify';

const validationSchema = yup.object().shape({
    usernameOrEmail: yup.string().required('لطفا نام کاربری را وارد نمایید!'),
    password: yup.string().required('لطفا پسورد را وارد نمایید!'),
});

const Login = props => {
    return (
        <Formik
            initialValues={{
                usernameOrEmail: '',
                password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, {setSubmitting}) => {
                const loginRequest = Object.assign({}, values);

                login(loginRequest)
                    .then(response => {
                        // console.log('Login Response :',response);
                        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                        props.onLogin();
                        setSubmitting(false);
                    }).catch(error => {
                    if(error.status === 401) {
                        toast.error( 'نام کاربری یا کلمه عبور اشتباه می باشد، مجددا تلاش نمایید.');
                    } else {
                        toast.error(error.message || 'Sorry! Something went wrong. Please try again!');
                    }
                    setSubmitting(false);
                });
            }}>
            {({
                  isSubmitting
              }) => (
                <div className="login-container">
                    <h1 className="page-title">ورود به سیستم</h1>
                    <FormikForm className="login-form">
                        <FormikField component={AntInput}
                                     prefix={<UserOutlined />}
                                     placeholder="نام کاربری"
                                     name="usernameOrEmail"
                                     type='username'
                        />
                        <FormikField component={AntPassword}
                                     placeholder="کلمه عبور"
                                     prefix={<LockOutlined />}
                                     name="password"
                                     type='pass'
                        />
                        <Button htmlType="submit" type="primary" size="large" className="login-form-button"
                                loading={isSubmitting}
                                disabled={isSubmitting}>ورود</Button>
                    </FormikForm>
                </div>
            )
            }
        </Formik>
    );
};


export default Login;