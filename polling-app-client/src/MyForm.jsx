import React from 'react';
import {Field as FormikField, Form as FormikForm, withFormik} from "formik";
import * as yup from "yup";
import DatePicker from 'react-datepicker2';
import moment from 'moment-jalaali';
import "./index.css";
import {AntInput} from "./common/components/CreateAntFields";
import {Button, Col, Icon, Row, Select,Form} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const InnerForm = ({
                       props,
                       values,
                       errors,
                       touched,
                       setFieldTouched,
                       setFieldValue,
                       isSubmitting,
                       handleSubmit,
                       submitCount
                   }) => {
    return (
        <FormikForm onSubmit={handleSubmit}>
            <Row gutter={16}>
                <Col span={12}>
                    <FormikField
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
                    <FormItem label='میوه' labelCol={{span: 12, offset: 12}}>
                        <FormikField
                            name="fruit"
                            render={({field}) => (
                                <Select
                                    {...field}
                                    onChange={value => setFieldValue("fruit", value)}
                                    onBlur={() => setFieldTouched("fruit", true)}
                                    value={values.fruit}
                                >
                                    <Option key={1} value="Apple">
                                        Apple
                                    </Option>
                                    <Option key={2} value="Orange">
                                        Orange
                                    </Option>
                                    <Option key={3} value="Mango">
                                        Mango
                                    </Option>
                                    <Option key={4} value="Pineapple">
                                        Pineapple
                                    </Option>
                                </Select>
                            )}
                        />
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem label='تاریخ' labelCol={{span: 12, offset: 12}}>
                        <FormikField
                            name='svdate'
                            render={({field}) => (
                                <DatePicker {...field} value={values.svdate} isGregorian={false} className='ant-input'
                                            inputJalaaliFormat="jYYYY/jMM/jDD" timePicker={false}/>
                            )}
                        />
                    </FormItem>
                </Col>
            </Row>
            <FormItem>
                <Button htmlType="submit" type="primary" disabled={isSubmitting}>
                    Submit
                </Button>
            </FormItem>
        </FormikForm>
    );
};

const MyFormikForm = withFormik({
    mapPropsToValues({username, fruit, email, svdate}) {
        return {
            username: username || "",
            fruit: fruit || "",
            email: email || "",
            svdate: moment()
        };
    },
    validationSchema: yup.object().shape({
        username: yup.string().required('Username is required'),
        email: yup.string().required('ورود ایمیل اجباری است').email('Enter a valid Email'),
        svdate: yup.string().required('فیلد تاریخ اجباری است')
    }),
    handleSubmit(values, {resetForm, setErrors, setSubmitting, props}) {
        setTimeout(() => {
            console.log("Form values", values);
            // console.log(values.svdate.format('jYYYY/jM/jD'));
            let jdate = values.svdate.format('jYYYY/jM/jD');
            props.addFruit({...values,date:jdate});
            // alert(JSON.stringify(props.data, null, 2));
            // save
            setSubmitting(false);
        }, 200);
    }
})(InnerForm);

export default MyFormikForm;