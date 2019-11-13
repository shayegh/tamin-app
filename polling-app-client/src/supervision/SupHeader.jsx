import React from 'react';
import {Field as FormikField, Form as FormikForm, withFormik} from "formik";
import * as yup from "yup";
import {AntInput, AntSelect, AntTextArea, JalaliDatePicker} from '../common/components/CreateAntFields';
import {Button, Col, Form, message, Row} from 'antd';

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
    const selectOptions = ["یک یزد", "دو یزد", "سه یزد"];
    return (
        <FormikForm onSubmit={handleSubmit}>
            <Row gutter={16}>
                <Col span={8}>
                    <FormikField
                        component={AntInput}
                        labelCol={{span: 12, offset: 12}}
                        label="شماره حکم ماموریت"
                        name="missionNO"
                        type='num'
                        required={true}
                        hasFeedback
                    />
                </Col>
                <Col span={8}>
                    <FormikField
                        component={AntSelect}
                        labelCol={{span: 12, offset: 12}}
                        label='شعبه '
                        name="brch"
                        defaultValue={values.brch}
                        selectOptions={selectOptions}
                        tokenSeparators={[","]}
                        required={true}
                        hasFeedback
                    />
                </Col>
                <Col span={8}>
                    <FormikField
                        component={JalaliDatePicker}
                        labelCol={{span: 12, offset: 12}}
                        name="surveyDate"
                        isGregorian={false}
                        className='ant-input'
                        inputJalaaliFormat="jYYYY/jMM/jDD"
                        timePicker={false}
                        placeholder="تاریخ"
                        label=' تاریخ بازدید'
                        required={true}
                        hasFeedback
                    />
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={8}>
                    <FormikField
                        component={JalaliDatePicker}
                        labelCol={{span: 12, offset: 12}}
                        name="preSurveyDate"
                        isGregorian={false}
                        className='ant-input'
                        inputJalaaliFormat="jYYYY/jMM/jDD"
                        timePicker={false}
                        label='تاریخ بازدید قبلی'
                        hasFeedback
                    />
                </Col>
                <Col span={8}>
                    <FormikField
                        component={AntInput}
                        labelCol={{span: 12, offset: 12}}
                        label='کارشناس ناظر '
                        type='text'
                        name="Supervisor"
                        hasFeedback
                    />
                </Col>
                <Col span={8}>
                    <FormikField
                        component={JalaliDatePicker}
                        labelCol={{span: 12, offset: 12}}
                        name="surveyCreateDate"
                        isGregorian={false}
                        className='ant-input'
                        inputJalaaliFormat="jYYYY/jMM/jDD"
                        timePicker={false}
                        label=' تاریخ تنظیم گزارش'
                        required={true}
                        hasFeedback
                    />
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12} >
                    <FormikField
                        component={AntTextArea}
                        labelCol={{span: 12, offset: 12}}
                        label='موضوعات قابل پیگیری از گزارش قبلی'
                        autoSize={{minRows: 2, maxRows: 6}}
                        type='text'
                        name='preSurveyMatters'
                        hasFeedback
                    />
                </Col>
                <Col span={12}>
                    <FormikField
                        component={AntTextArea}
                        labelCol={{span: 12, offset: 12}}
                        label='موضوع بازدید'
                        autoSize={{minRows: 2, maxRows: 6}}
                        type='text'
                        name="surveySubject"
                        required={true}
                        hasFeedback
                    />
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <FormikField
                        component={AntTextArea}
                        labelCol={{span: 12, offset: 12}}
                        label='توصيه های کارشناسی جهت مسئول واحد مورد ارزيابی'
                        autoSize={{minRows: 2, maxRows: 6}}
                        type='text'
                        name='recommendationUnitManager'
                        hasFeedback
                    />
                </Col>
                <Col span={12}>
                    <FormikField
                        component={AntTextArea}
                        labelCol={{span: 12, offset: 12}}
                        label=' توصيه های کارشناسی جهت  رئيس شعبه'
                        autoSize={{minRows: 2, maxRows: 6}}
                        type='text'
                        name='recommendationBrchManager'
                        hasFeedback
                    />
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <FormItem>
                        <Button htmlType="submit" type="primary" disabled={isSubmitting}>
                            ذخیره
                        </Button>
                        <Button onClick={handleReset} type='danger' disabled={!dirty || isSubmitting}
                                style={{marginRight: 5}}>
                            بازنشانی
                        </Button>
                    </FormItem>
                </Col>
            </Row>
        </FormikForm>
    );
};


const SupHeaderForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({currentFruit}) => {
        console.log('Map Props to Value', currentFruit);
        return {
            // username: currentFruit.username || '',
            // fruit: currentFruit.fruit || '',
            // email: currentFruit.email || '',
            // bookingClient: currentFruit.bookingClient || '',
            // date: currentFruit.date ? moment(currentFruit.date,'jYYYY/jMM/jDD'):moment()

        };
    },
    validationSchema: yup.object().shape({
        missionNO: yup.number('مقدار شماره حکم باید به صورت عددی وارد شود').required('شماره حکم اجباری می باشد'),
        brch: yup.string().required('ورود نام شعبه اجباری است'),
        surveyDate: yup.string().required('فیلد تاریخ اجباری است'),
        Supervisor: yup.string().required('فیلد نام ناظر اجباری است'),
    }),
    handleSubmit: (values, {resetForm, setErrors, setSubmitting, props}) => {
        setTimeout(() => {
            console.log("Form values", values);
            // let jdate = values.date.format('jYYYY/jM/jD');
            // props.addFruit({...values, date: jdate});
            // alert(JSON.stringify(props.data, null, 2));
            // save
            setSubmitting(false);
            message.success('اطلاعات با موفقیت ثبت شد');
        }, 200);
    }
})(InnerForm);

export default SupHeaderForm;
