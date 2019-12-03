import React from 'react';
import {Field as FormikField, Form as FormikForm, withFormik} from "formik";
import {Button, Col, Form, Row} from 'antd';
import * as yup from "yup";
import {AntInput, AntPassword, AntSelect} from '../../common/components/CreateAntFields';
import {brchOptions, unitOptions} from '../../constants';
import {checkEmailAvailability, checkUsernameAvailability, signup} from '../../util/APIUtils';
import {toast} from 'react-toastify';

const FormItem = Form.Item;

const InnerForm = ({
                       props,
                       values,
                       errors,
                       touched,
                       isSubmitting,
                       handleSubmit,
                       handleReset,
                       submitCount,
                       dirty
                   }) => {
    return (
        <div className='App'>
            <FormikForm onSubmit={handleSubmit}>
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
                <FormItem>
                    <Button htmlType="submit" type="primary" loading={isSubmitting}
                            disabled={isSubmitting}>
                        ذخیره
                    </Button>
                </FormItem>
            </FormikForm>
        </div>
    )
};

const SignUpForm = withFormik({
    // enableReinitialize: true,
    mapPropsToValues: ({currentDetail}) => {
        console.log('Map Props to Value', currentDetail);
        return {
            // srdSubject: currentDetail.srdSubject || '',
            // srdSubjectCount: currentDetail.srdSubjectCount || 0,
            // srdSubjectErrorCount: currentDetail.srdSubjectErrorCount || 0,
            // srdComment: currentDetail.srdComment || '',

        };
    },
    validationSchema: yup.object().shape({
        name: yup.string().required('فیلد نام اجباری می باشد'),
        username: yup.string().required('فیلد نام کاربری اجباری است').test(
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
        ),
        password: yup.string().min(6, 'طول فیلد پسورد حداقل باید 6 کاراکتر باشد').required('فیلد نام کاربری اجباری است'),
        email: yup.string().email('آدرس وارد شده اشتباه می باشد').required('فیلد ایمیل اجباری است').test(
            'checkDuplUsername', 'ایمیل تکراری است', (value) => {
                return new Promise((resolve, reject) => {
                    checkEmailAvailability(value).then(response => {
                        // exists
                        resolve(response.available);
                    }).catch(() => {
                        toast.error('امکان کنترل نام کاربری نیست')
                    })
                })
            }
        ),

    }),
    handleSubmit: (values, {resetForm, setErrors, setSubmitting, props}) => {

        console.log("Form values", values);
        signup(values)
            .then(response => {
                toast.success("Thank you! You're successfully registered. Please Login to continue!");
                resetForm();
                // this.props.history.push("/login");
            }).catch(error => {
            toast.error(error.message || 'Sorry! Something went wrong. Please try again!');
        });

        setSubmitting(false);

    }
})(InnerForm);

export default SignUpForm;
