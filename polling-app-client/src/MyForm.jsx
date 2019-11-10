import React from 'react';
import {Field as FormikField, Form as FormikForm, withFormik} from "formik";
import * as yup from "yup";
import moment from 'moment-jalaali';
import "./index.css";
import {AntInput, AntSelect, JalaliDatePicker} from "./common/components/CreateAntFields";
import {Button, Col, Form, Icon, Row} from 'antd';

const FormItem = Form.Item;

const InnerForm = ({
                       props,
                       values,
                       errors,
                       touched,
                       setFieldTouched,
                       setFieldValue,
                       isSubmitting,
                       handleSubmit,
                       handleReset,
                       submitCount,
                       dirty
                   }) => {
    const selectOptions = ["Mark", "Bob", "Anthony"];
    // console.log('Form values:', values);
    return (
        <FormikForm onSubmit={handleSubmit}>
            <Row gutter={16}>
                <Col span={12}>
                    <FormikField
                        labelCol={{span: 12, offset: 12}}
                        name="email"
                        type='email'
                        label="ایمیل"
                        prefix={
                            <Icon type="user" style={{color: "rgba(0,0,0,.25)"}}/>
                        }
                        required={true}
                        hasFeedback
                        component={AntInput}
                    />
                </Col>
                <Col span={12}>
                    <FormikField
                        labelCol={{span: 12, offset: 12}}
                        name="username"
                        type='text'
                        placeholder="نام"
                        label='نام'
                        required={true}
                        hasFeedback
                        component={AntInput}
                    />
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <FormikField
                        labelCol={{span: 12, offset: 12}}
                        label='میوه'
                        component={AntSelect}
                        name="bookingClient"
                        defaultValue={values.fruit}
                        selectOptions={selectOptions}
                        submitCount={submitCount}
                        tokenSeparators={[","]}
                        hasFeedback
                    />
                </Col>
                <Col span={12}>
                    <FormikField
                        labelCol={{span: 12, offset: 12}}
                        name="date"
                        isGregorian={false}
                        className='ant-input'
                        inputJalaaliFormat="jYYYY/jMM/jDD"
                        timePicker={false}
                        placeholder="تاریخ"
                        label='تاریخ'
                        required={true}
                        hasFeedback
                        component={JalaliDatePicker}
                    />
                </Col>
            </Row>

            <FormItem>
                <Button htmlType="submit" type="primary" disabled={isSubmitting}>
                    Submit
                </Button>
                <Button onClick={handleReset} type='danger' disabled={!dirty || isSubmitting}>
                    Reset
                </Button>
            </FormItem>
        </FormikForm>
    );
};

const MyFormikForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({currentFruit}) => {
        console.log('Map Props to Value', currentFruit);
        return {
            username: currentFruit.username || "",
            fruit: currentFruit.fruit || "",
            email: currentFruit.email || "",
            bookingClient: currentFruit.bookingClient || "",
            date: currentFruit.date ? moment(currentFruit.date,'jYYYY/jMM/jDD'):moment()

        };
    },
    validationSchema: yup.object().shape({
        username: yup.string().required('نام کاربری اجباری می باشد'),
        email: yup.string().required('ورود ایمیل اجباری است').email('آدرس ایمیل صحیح نیست'),
        date: yup.string().required('فیلد تاریخ اجباری است')
    }),
    handleSubmit: (values, {resetForm, setErrors, setSubmitting, props}) => {
        setTimeout(() => {
            console.log("Form values", values);
            let jdate = values.date.format('jYYYY/jM/jD');
            props.addFruit({...values, date: jdate});
            // alert(JSON.stringify(props.data, null, 2));
            // save
            setSubmitting(false);
        }, 200);
    }
})(InnerForm);

export default MyFormikForm;