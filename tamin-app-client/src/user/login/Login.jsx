import React from 'react';
import {Field as FormikField, Form as FormikForm, Formik} from 'formik';
import {AntInput, AntPassword} from '../../common/components/CreateAntFields';
import './Login.css';
import {Button, Icon} from 'antd';
import * as yup from 'yup';
import {login} from '../../util/api';
import {ACCESS_TOKEN} from '../../constants';
import {toast} from 'react-toastify';

const validationSchema = yup.object().shape({
    usernameOrEmail: yup.string().required('Prev Password is required'),
    password: yup.string().required('New Password is required'),
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
                                     labelCol={{span: 12, offset: 12}}
                                     prefix={<Icon type="user"/>}
                                     size="large"
                                     placeholder="نام کاربری"
                                     name="usernameOrEmail"
                                     type='username'
                        />
                        <FormikField component={AntPassword}
                                     labelCol={{span: 12, offset: 12}}
                                     placeholder="کلمه عبور"
                                     prefix={<Icon type="lock"/>}
                                     size="large"
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