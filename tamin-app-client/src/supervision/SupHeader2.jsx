import React, {Component} from 'react';
import {Field as FormikField, Form as FormikForm, Formik} from "formik";
import {AntInput, AntSelect, AntTextArea, JalaliDatePicker} from '../common/components/CreateAntFields';
import {Button, Col, Form, Row} from 'antd';
import moment from 'moment-jalaali';
import {createHeader, getHeader, updateHeader} from "../util/api";
import {toast} from "react-toastify";
import {brchOptions, SRStatus, unitOptions} from '../constants';
import * as yup from "yup";
import {UserContext} from "../user/UserContext";

const FormItem = Form.Item;

export default class SupHeader2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentHeader: {}
        };
        // console.log('Props', props)
    }

    static contextType = UserContext;

    componentDidMount() {
        let {headerId} = this.props;
        if (headerId !== undefined) {
            console.log('Header ID : ', headerId);
            getHeader(headerId)
                .then(response => {
                    this.setState({currentHeader: response});
                })
        } else {
            let currentHeader = {status: SRStatus.NEW};
            this.setState({currentHeader});
            console.log('No Header ID');
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !nextProps.showDetail
    }

    handelSubmit = (values, {resetForm, setErrors, setSubmitting}) => {
        let {addHeader} = this.props;
        console.log("Form values", values);
        let newValues = {
            ...values,
            surveyDate: values.surveyDate.format('jYYYY/jMM/jDD'),
            surveyCreateDate: values.surveyCreateDate.format('jYYYY/jMM/jDD'),
            preSurveyDate: values.preSurveyDate ? values.preSurveyDate.format('jYYYY/jMM/jDD') : '',
        };
        // save

        let headerId = values.id;
        console.log('Form submit id:', headerId);
        if (headerId === undefined)
            createHeader(newValues)
                .then(response => {
                    toast.success('اطلاعات گزارش با موفقیت ثبت شد');
                    addHeader(response.oid);
                }).catch(error => {
                if (error.status === 401) {
                    toast.error('You have been logged out. Please login create poll.');
                } else {
                    console.log('Error Message :', error);
                    toast.error(error.message || 'Sorry! Something went wrong. Please try again!');
                }
            });
        else
            updateHeader(newValues, headerId)
                .then(response => {
                    toast.success('اطلاعات باموفقیت به روزرسانی شد');
                    addHeader(response.oid);
                }).catch(error => {
                if (error.status === 401) {
                    toast.error('You have been logged out. Please login create poll.');
                } else {
                    console.log('Error Message :', error);
                    toast.error(error.message || 'Sorry! Something went wrong. Please try again!');
                }
            });
        setSubmitting(false);

    };

    validationSchema = yup.object().shape({
        missionNo: yup.number('مقدار شماره حکم باید به صورت عددی وارد شود').required('شماره حکم اجباری می باشد'),
        brchName: yup.string().required('ورود نام شعبه اجباری است'),
        unitName: yup.string().required('ورود نام واحد اجباری است'),
        surveyDate: yup.string().required('فیلد تاریخ بازرسی اجباری است'),
        surveyCreateDate: yup.string().required('فیلد تاریخ ثبت گزارش اجباری است'),
        supervisorName: yup.string().required('فیلد نام ناظر اجباری است'),
        surveySubject: yup.string().required('فیلد موضوع بازدید اجباری است'),
    });


    render() {
        let {currentHeader} = this.state;
        // const userCtx = this.context;
        let st = currentHeader.status;
        let {unitName} = this.context;
        // console.log('current Header:', currentHeader);
        return (
            <Formik
                enableReinitialize={true}
                initialValues={{
                    ...currentHeader,
                    id: currentHeader.id ? currentHeader.id : undefined,
                    // brchName: currentHeader.brchName ? currentHeader.brchName : brchName,
                    unitName: currentHeader.unitName ? currentHeader.unitName : unitName,
                    surveyDate: currentHeader.surveyDate ? moment(currentHeader.surveyDate, 'jYYYY/jMM/jDD') : moment(),
                    preSurveyDate: currentHeader.preSurveyDate ? moment(currentHeader.preSurveyDate, 'jYYYY/jMM/jDD') : moment(),
                    surveyCreateDate: currentHeader.surveyCreateDate ? moment(currentHeader.surveyCreateDate, 'jYYYY/jMM/jDD') : moment()
                }}
                validationSchema={this.validationSchema}
                onSubmit={(values, {resetForm, setErrors, setSubmitting}) => this.handelSubmit(values, {
                    resetForm,
                    setErrors,
                    setSubmitting
                })}
            >
                {({
                      isSubmitting
                  }) => (
                    <FormikForm>
                        <Row gutter={16}>
                            <Col span={6}>
                                <FormikField
                                    component={AntInput}
                                    labelCol={{span: 12, offset: 12}}
                                    label="شماره حکم ماموریت"
                                    name="missionNo"
                                    type='num'
                                    required={true}
                                    hasFeedback
                                />
                            </Col>
                            <Col span={6}>
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
                            <Col span={6}>
                                <FormikField
                                    component={AntSelect}
                                    labelCol={{span: 12, offset: 12}}
                                    label='واحد '
                                    name="unitName"
                                    selectOptions={unitOptions}
                                    tokenSeparators={[","]}
                                    required={true}
                                    hasFeedback
                                    disabled
                                />
                            </Col>
                            <Col span={6}>
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
                                    name="supervisorName"
                                    required={true}
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
                            <Col span={12}>
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
                                    <Button htmlType="submit" type="primary"
                                            loading={isSubmitting}
                                            disabled={isSubmitting || st !== SRStatus.NEW}>
                                        ذخیره
                                    </Button>
                                    {/*<Button onClick={handleReset} type='danger' disabled={!dirty || isSubmitting}*/}
                                    {/*        style={{marginRight: 5}}>*/}
                                    {/*    بازنشانی*/}
                                    {/*</Button>*/}
                                </FormItem>
                            </Col>
                        </Row>
                    </FormikForm>
                )}
            </Formik>
        );
    }

}