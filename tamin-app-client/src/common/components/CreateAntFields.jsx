import React from 'react';
import {DatePicker as antDatePicker, Form, Input, Select, TimePicker} from 'antd';
import DatePicker from 'react-datepicker2';

const {Option} = Select;
const {TextArea, Password} = Input;

const CreateAntField = AntComponent => ({
                                            field,
                                            form,
                                            hasFeedback,
                                            label,
                                            selectOptions,
                                            submitCount,
                                            type,
                                            ...props
                                        }) => {
    const touched = form.touched[field.name];
    const submitted = submitCount > 0;
    const hasError = form.errors[field.name];
    const submittedError = hasError && submitted;
    const touchedError = hasError && touched;
    const onInputChange = ({target: {value}}) =>
        form.setFieldValue(field.name, value);
    const onChange = value => form.setFieldValue(field.name, value);
    const onBlur = () => form.setFieldTouched(field.name, true);
    return (
        <div className="field-container">
            <Form.Item
                labelCol={props.labelCol}
                wrapperCol={props.wrapperCol ||{span: 24}}
                label={label}
                hasFeedback={
                    !!((hasFeedback && submitted) || (hasFeedback && touched))
                }
                help={submittedError || touchedError ? hasError : false}
                validateStatus={submittedError || touchedError ? 'error' : 'success'}
                required={props.required}
            >{
                selectOptions ?
                    <AntComponent
                        {...field}
                        {...props}
                        onBlur={onBlur}
                        onChange={type ? onInputChange : onChange}
                        showSearch={!!selectOptions}
                        optionFilterProp="children"
                    >
                        {selectOptions.map(name => <Option key={name}>{name}</Option>)}

                        {/*// selectOptions.map(({name,value}) => <Option key={value}>{name}</Option>)}*/}
                    </AntComponent> :
                    <AntComponent
                        {...field}
                        {...props}
                        onBlur={onBlur}
                        onChange={type ? onInputChange : onChange}
                    />
            }
            </Form.Item>
        </div>
    );
};

export const AntSelect = CreateAntField(Select);
export const AntDatePicker = CreateAntField(antDatePicker);
export const AntInput = CreateAntField(Input);
export const AntTextArea = CreateAntField(TextArea);
export const AntPassword = CreateAntField(Password);
export const AntTimePicker = CreateAntField(TimePicker);
export const JalaliDatePicker = CreateAntField(DatePicker);
