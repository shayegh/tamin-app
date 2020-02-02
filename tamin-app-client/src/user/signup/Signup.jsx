import React, {useEffect, useState} from 'react';
import {Field as FormikField, Form as FormikForm, Formik} from "formik";
import {Button, Col, Row} from 'antd';
import * as yup from "yup";
import {AntInput, AntPassword, AntSelect} from '../../common/components/CreateAntFields';
import {brchOptions, roles, unitOptions} from '../../constants';
import {checkEmailAvailability, checkUsernameAvailability, getUserProfile, signup, updateUser} from '../../util/api';
import {toast} from 'react-toastify';
import {showError} from "../../util/Helpers";

const validationSchema = yup.object().shape({
    newUser: yup.boolean().required(),
    name: yup.string().when("newUser", {
        is: true,
        then: yup.string().required('فیلد نام اجباری می باشد')
    }),
    username: yup.string().when('newUser', {
            is: true,
            then: yup.string().required('فیلد نام کاربری اجباری است').test(
                'checkDuplUsername', 'نام کاربری تکراری است', (value) => {
                    return new Promise((resolve, reject) => {
                        checkUsernameAvailability(value).then(response => {
                            // exists
                            resolve(response.available);
                        }).catch(() => {
                            toast.error('امکان کنترل نام کاربری نیست')
                        })
                    })
                }
            )
        }
    ),
    password: yup.string().when('newUser', {
        is: true,
        then: yup.string().min(6, 'طول فیلد پسورد حداقل باید 6 کاراکتر باشد').required('فیلد نام کاربری اجباری است')
    }),
    email: yup.string().when('newUser', {
        is: true,
        then: yup.string().email('آدرس وارد شده اشتباه می باشد').required('فیلد ایمیل اجباری است').test(
            'checkDuplUsername', 'ایمیل تکراری است', (value) => {
                return new Promise((resolve, reject) => {
                    checkEmailAvailability(value).then(response => {
                        // exists
                        resolve(response.available);
                    }).catch(() => {
                        toast.error('امکان کنترل ایمیل نیست')
                    })
                })
            }
        )
    })
    ,
});

const SignUpForm = (props) => {
    console.log(props.match.params.username);
    let {username} = props.match.params;
    let newUser = true;
    if (username !== undefined)
        newUser = false;
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        if (!newUser)
            getUserProfile(username)
                .then(response => {
                    console.log('Result :', response);
                    setUser(response);
                })
                .catch(error => {
                    showError(error);
                });
        setIsLoading(false);

    }, []);
    console.log('User', user);
    return (
        <div className='App'>
            <Formik
                initialValues={{
                    newUser: newUser,
                    name: user.name || '',
                    username: user.username || '',
                    brchName: user.brchName || '',
                    unitName: user.unitName || '',
                    email: user.email || '',
                    password: ''

                }}
                enableReinitialize={!newUser}
                validationSchema={validationSchema}
                onSubmit={(values, {resetForm, setSubmitting}) => {
                    console.log("Form values", values);
                    setSubmitting(true);
                    if (newUser)
                        signup(values)
                            .then(response => {
                                toast.success("Thank you! You're successfully registered. Please Login to continue!");
                                resetForm();
                                // this.props.history.push("/login");
                            }).catch(error => {
                            showError(error)
                        });
                    else
                        updateUser(values)
                            .then(response => {
                                console.log('UpdateUser response:', response);
                                toast.success("User Updated Successfully");
                            }).catch(error => showError(error));

                    setSubmitting(false);
                }}
            >
                {({
                      isSubmitting,
                      dirty
                  }) => (
                    <FormikForm>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormikField
                                    component={AntInput}
                                    labelCol={{span: 12, offset: 12}}
                                    label="نام"
                                    name="name"
                                    type='text'
                                    required={true}
                                    hasFeedback
                                />
                            </Col>
                            <Col span={12}>
                                <FormikField
                                    component={AntInput}
                                    labelCol={{span: 12, offset: 12}}
                                    label="نام کاربری"
                                    name="username"
                                    type='text'
                                    required={true}
                                    disabled={!newUser}
                                    hasFeedback
                                />
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormikField
                                    component={AntInput}
                                    labelCol={{span: 12, offset: 12}}
                                    label="ایمیل"
                                    name="email"
                                    type='email'
                                    required={true}
                                    disabled={!newUser}
                                    hasFeedback
                                />
                            </Col>
                            <Col span={12}>
                                <FormikField
                                    component={AntPassword}
                                    labelCol={{span: 12, offset: 12}}
                                    label="کلمه عبور"
                                    name="password"
                                    type='password'
                                    required={true}
                                    hasFeedback
                                />
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormikField
                                    component={AntSelect}
                                    labelCol={{span: 12, offset: 12}}
                                    label='شعبه '
                                    name="brchName"
                                    selectOptions={brchOptions}
                                    tokenSeparators={[","]}
                                    required={true}
                                    hasFeedback
                                />
                            </Col>
                            <Col span={12}>
                                <FormikField
                                    component={AntSelect}
                                    labelCol={{span: 12, offset: 12}}
                                    label='واحد '
                                    name="unitName"
                                    selectOptions={unitOptions}
                                    tokenSeparators={[","]}
                                    required={true}
                                    hasFeedback
                                />
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormikField
                                    component={AntSelect}
                                    labelCol={{span: 12, offset: 12}}
                                    label='نقش '
                                    name="role"
                                    selectOptions={roles}
                                    tokenSeparators={[","]}
                                    required={true}
                                    hasFeedback
                                />
                            </Col>
                        </Row>
                        <Button htmlType="submit" type="primary" style={{float: 'left'}} loading={isSubmitting}
                                disabled={!dirty || isSubmitting}>
                            ذخیره
                        </Button>
                    </FormikForm>
                )}
            </Formik>
        </div>
    );
};

export default SignUpForm;