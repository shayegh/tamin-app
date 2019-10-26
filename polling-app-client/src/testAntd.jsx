import React from "react";
import {Button, Col, Form, Icon, Row, Select} from "antd";
import {Field as FormikField, Form as FormikForm, withFormik} from "formik";
import * as yup from "yup";

import "./index.css";
import {InputField} from "./common/components/InputField";

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
                     handleSubmit
                   }) => {
  return (
      <FormikForm onSubmit={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <FormikField
                name="email"
                placeholder="Email"
                prefix={
                  <Icon type="user" style={{color: "rgba(0,0,0,.25)"}}/>
                }
                required={true}
                component={InputField}
            />
          </Col>
          <Col span={12}>
            <FormikField
                name="username"
                placeholder="Full Name"
                required={true}
                component={InputField}
            />
          </Col>
        </Row>
        <FormItem>
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
        <FormItem>
          <Button htmlType="submit" type="primary" disabled={isSubmitting}>
            Submit
          </Button>
        </FormItem>
      </FormikForm>
  );
};

const MyFormikForm = withFormik({
  mapPropsToValues({username, fruit, email}) {
    return {
      username: username || "",
      fruit: fruit || "",
      email: email || ""
    };
  },
  validationSchema: yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().required('ورود ایمیل اجباری است').email('Enter a valid Email'),
  }),
  handleSubmit(values, {resetForm, setErrors, setSubmitting}) {
    setTimeout(() => {
      console.log("Form values", values);
      // save
      setSubmitting(false);
    }, 2000);
  }
})(InnerForm);

export default function testAntd() {
  return (
      <div className="App">
        <h3>Chose a fruit</h3>
        <MyFormikForm/>
      </div>
  );
}
