import * as React from "react";
import {Form, Input} from "antd";

const FormItem = Form.Item;

export const InputField = ({
                             field, // { name, value, onChange, onBlur }
                             form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                             ...props
                           }) => {
  const errorMsg = touched[field.name] && errors[field.name];
  return (
      <FormItem labelCol={{span: 12, offset: 12}} help={errorMsg} validateStatus={errorMsg ? "error" : 'success'}
                hasFeedback
                required={props.required} label={props.placeholder}>
        <Input {...field} {...props} />
      </FormItem>
  );
};